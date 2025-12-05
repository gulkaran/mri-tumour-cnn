"use client";

import type React from "react";

import { useState, useCallback } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CLASSES = ["glioma", "meningioma", "notumor", "pituitary"] as const;
type TumorClass = (typeof CLASSES)[number];

interface PredictionResult {
  predicted_class: TumorClass;
  confidence: number;
  probabilities: Record<TumorClass, number>;
}

const CLASS_INFO: Record<
  TumorClass,
  { name: string; description: string; color: string }
> = {
  glioma: {
    name: "Glioma",
    description:
      "A tumor that occurs in the brain and spinal cord, arising from glial cells.",
    color: "text-red-500",
  },
  meningioma: {
    name: "Meningioma",
    description:
      "A tumor that arises from the meninges, the membranes surrounding the brain and spinal cord.",
    color: "text-orange-500",
  },
  notumor: {
    name: "No Tumor",
    description: "No tumor detected in the MRI scan.",
    color: "text-green-500",
  },
  pituitary: {
    name: "Pituitary",
    description:
      "A tumor that develops in the pituitary gland at the base of the brain.",
    color: "text-yellow-500",
  },
};

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (uploadedFile: File) => {
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setFileName(uploadedFile.name);
        setFile(uploadedFile);
        setResult(null);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const analyzeImage = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = {
            error: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        const errorMessage = errorData.error || "Failed to analyze image";
        const errorDetails = errorData.details || errorData.rawOutput || "";
        console.error("API Error:", errorData);
        throw new Error(
          `${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`
        );
      }

      const data = await response.json();
      const classIndex = data.class_index;

      if (
        typeof classIndex !== "number" ||
        classIndex < 0 ||
        classIndex >= CLASSES.length
      ) {
        throw new Error("Invalid prediction result");
      }

      const predictedClass = CLASSES[classIndex] as TumorClass;
      const confidence = data.confidence || 0;
      const probabilities = data.probabilities || {};

      // Map the probability indices to class names
      const probs: Record<string, number> = {};
      CLASSES.forEach((cls, index) => {
        probs[cls] = probabilities[index] || 0;
      });

      setResult({
        predicted_class: predictedClass,
        confidence,
        probabilities: probs as Record<TumorClass, number>,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to analyze image: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setFileName(null);
    setFile(null);
    setResult(null);
  };

  return (
    <section id="upload" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Upload MRI Scan
            </h2>
            <p className="text-muted-foreground">
              Drag and drop your MRI image or click to browse. Supports JPEG,
              PNG, and DICOM formats.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Upload Area */}
            <Card className="overflow-hidden">
              {!image ? (
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "flex min-h-[400px] cursor-pointer flex-col items-center justify-center border-2 border-dashed p-8 transition-all",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mb-2 text-lg font-medium">
                    Drop your MRI scan here
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              ) : (
                <div className="relative min-h-[400px]">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-2 z-10 rounded-full"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Uploaded MRI scan"
                    className="h-full w-full object-contain p-4"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ImageIcon className="h-4 w-4" />
                      <span className="truncate">{fileName}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Results Area */}
            <Card className="flex min-h-[400px] flex-col p-6">
              {!image ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="mb-2 font-medium">No Image Uploaded</p>
                  <p className="text-sm text-muted-foreground">
                    Upload an MRI scan to receive classification results
                  </p>
                </div>
              ) : isAnalyzing ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                  <p className="mb-2 font-medium">Analyzing MRI Scan...</p>
                  <p className="text-sm text-muted-foreground">
                    Our AI model is processing your image
                  </p>
                </div>
              ) : result ? (
                <div className="flex flex-1 flex-col">
                  <div className="mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Analysis Complete</span>
                  </div>

                  <div className="mb-6 rounded-lg bg-muted/50 p-4">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Predicted Classification
                    </p>
                    <p
                      className={cn(
                        "text-2xl font-bold",
                        CLASS_INFO[result.predicted_class].color
                      )}
                    >
                      {CLASS_INFO[result.predicted_class].name}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {CLASS_INFO[result.predicted_class].description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium">
                      Confidence Scores
                    </p>
                    <div className="space-y-3">
                      {CLASSES.map((cls) => (
                        <div key={cls}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span>{CLASS_INFO[cls].name}</span>
                            <span className="font-mono">
                              {(result.probabilities[cls] * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                cls === result.predicted_class
                                  ? "bg-primary"
                                  : "bg-muted-foreground/30"
                              )}
                              style={{
                                width: `${result.probabilities[cls] * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-auto text-xs text-muted-foreground">
                    ⚠️ This is a demonstration. Always consult medical
                    professionals for diagnosis.
                  </p>
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                  >
                    <Sparkles className="h-4 w-4" />
                    Analyze Image
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Click to run the classification model
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

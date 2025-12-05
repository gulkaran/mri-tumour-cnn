"use client";

import { Upload, Cpu, BarChart3, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Upload MRI Scan",
    description:
      "Drag and drop or click to upload your brain MRI scan image in common formats like JPEG or PNG.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description:
      "Our PyTorch CNN model processes the image through multiple convolutional layers to extract features.",
  },
  {
    icon: BarChart3,
    title: "Classification",
    description:
      "The model outputs probability scores for each class: Glioma, Meningioma, Pituitary, or No Tumor.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our brain tumor classification system uses state-of-the-art deep
              learning to analyze MRI scans and provide interpretable results.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="relative p-6">
                <div className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

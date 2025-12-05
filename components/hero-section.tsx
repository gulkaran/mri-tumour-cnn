"use client";

import { ArrowDown, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>PyTorch-Powered Deep Learning</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            AI-Powered Brain Tumor Classification
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Upload an MRI scan and our deep learning model will classify it into
            one of four categories:
            <span className="text-foreground font-medium"> Glioma</span>,
            <span className="text-foreground font-medium"> Meningioma</span>,
            <span className="text-foreground font-medium"> Pituitary</span>, or
            <span className="text-foreground font-medium"> No Tumor</span>.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 px-8" onClick={scrollToUpload}>
              Start Analysis
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 bg-transparent"
              asChild
            >
              <Link
                href="https://github.com/gulkaran/mri-tumour-cnn"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Github
                <Github />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-8">
          {[
            { value: "95%+", label: "Overall Accuracy" },
            { value: "4", label: "Tumor Classes" },
            { value: "PyTorch", label: "Framework" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

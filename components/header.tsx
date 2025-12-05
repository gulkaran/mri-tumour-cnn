"use client";

import { Brain } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            NeuroVision
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="#upload"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Upload
          </a>
          <a
            href="#benchmarks"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Benchmarks
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

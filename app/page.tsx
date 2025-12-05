import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { UploadSection } from "@/components/upload-section";
import { BenchmarksSection } from "@/components/benchmarks-section";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <UploadSection />
        <BenchmarksSection />
        <HowItWorksSection />
      </main>
    </div>
  );
}

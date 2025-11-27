import { createFileRoute } from "@tanstack/react-router";
import { Architecture } from "@/components/landing/architecture";
import Download from "@/components/landing/download";
import { LandingFaq } from "@/components/landing/faq";
import Features from "@/components/landing/features";
import EchoFooter from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import InterfaceShowcase from "@/components/landing/interface-showcase";
import ModelsShowcase from "@/components/landing/models-showcase";
import Stats from "@/components/landing/stats";
import Waveform from "@/components/landing/waveform";

export const Route = createFileRoute("/")({ component: App });

function ArchitectureSection() {
  return (
    <section className="overflow-hidden bg-background py-20 text-foreground">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-medium text-3xl lg:text-5xl">Built with Rust</h2>
          <p className="text-lg text-muted-foreground">
            Echo is engineered for performance and safety. By leveraging Rust's
            memory safety and speed, we ensure that your transcription happens
            instantly without compromising your system's stability.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Zero Garbage Collection pauses</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Minimal memory footprint</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Native system integration</span>
            </li>
          </ul>
        </div>
        <div className="flex h-[300px] w-full items-center justify-center md:h-[400px]">
          <Architecture className="h-full w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Hero />
      <div id="features">
        <Waveform />
        <InterfaceShowcase />
        <ModelsShowcase />
        <ArchitectureSection />
        <Stats />
        <Features />
      </div>
      <Download />
      <LandingFaq />
      <EchoFooter />
    </div>
  );
}

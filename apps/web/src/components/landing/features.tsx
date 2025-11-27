import { Code, Keyboard, Lock, Mic, Monitor, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background py-20 text-foreground">
      <div className="container mx-auto space-y-6 px-4">
        <div className="relative z-10 space-y-3 text-center">
          <h2 className="font-medium text-3xl lg:text-5xl">Why Echo?</h2>
          <p className="mx-auto max-w-3xl font-light text-muted-foreground text-sm md:text-md">
            Built for privacy, speed, and accessibility. Echo brings the power
            of Whisper to your desktop.
          </p>
        </div>
        <div className="mask-[radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] mx-auto max-w-4xl">
          <div className="grid gap-x-6 rounded-xl border bg-background px-6 pt-3 pb-10 shadow-xl md:grid-cols-2 dark:bg-muted/50">
            <Feature
              description="All processing happens locally on your device. No audio is ever sent to the cloud."
              icon={<Lock className="h-6 w-6" />}
              name="100% Private"
            />
            <Feature
              description="Optimized for Apple Silicon and GPU acceleration on Windows/Linux."
              icon={<Zap className="h-6 w-6" />}
              name="Lightning Fast"
            />
            <Feature
              description="Trigger transcription from anywhere with a simple keyboard shortcut."
              icon={<Keyboard className="h-6 w-6" />}
              name="Global Shortcuts"
            />
            <Feature
              description="Native support for macOS, Windows, and Linux."
              icon={<Monitor className="h-6 w-6" />}
              name="Cross Platform"
            />
            <Feature
              description="Smartly filters out silence to only record when you speak."
              icon={<Mic className="h-6 w-6" />}
              name="Voice Activity Detection"
            />
            <Feature
              description="Fully transparent code. Built with Rust and React."
              icon={<Code className="h-6 w-6" />}
              name="Open Source"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
}) => (
  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-b-none border-b border-dashed p-3 last:border-b-0 hover:rounded-xl hover:bg-secondary">
    <div className="flex size-12 items-center justify-center rounded-lg border border-foreground/5 bg-muted text-foreground">
      {icon}
    </div>
    <div className="space-y-0.5">
      <h3 className="font-medium text-foreground text-sm">{name}</h3>
      <p className="line-clamp-2 text-muted-foreground text-sm">
        {description}
      </p>
    </div>
  </div>
);

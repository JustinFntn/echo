import { Zap, Keyboard, Monitor, Mic, Code, Lock } from "lucide-react";

export default function Features() {
  return (
    <section className="py-20 flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="space-y-6 container mx-auto px-4">
        <div className="relative z-10 space-y-3 text-center">
          <h2 className="text-3xl font-medium lg:text-5xl">Why Echo?</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl font-light text-sm md:text-md">
            Built for privacy, speed, and accessibility. Echo brings the power of Whisper to your desktop.
          </p>
        </div>
        <div className="mx-auto max-w-4xl mask-[radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="bg-background gap-x-6 grid md:grid-cols-2 dark:bg-muted/50 rounded-xl border px-6 pb-10 pt-3 shadow-xl">
            <Feature
              icon={<Lock className="w-6 h-6" />}
              name="100% Private"
              description="All processing happens locally on your device. No audio is ever sent to the cloud."
            />
            <Feature
              icon={<Zap className="w-6 h-6" />}
              name="Lightning Fast"
              description="Optimized for Apple Silicon and GPU acceleration on Windows/Linux."
            />
            <Feature
              icon={<Keyboard className="w-6 h-6" />}
              name="Global Shortcuts"
              description="Trigger transcription from anywhere with a simple keyboard shortcut."
            />
            <Feature
              icon={<Monitor className="w-6 h-6" />}
              name="Cross Platform"
              description="Native support for macOS, Windows, and Linux."
            />
            <Feature
              icon={<Mic className="w-6 h-6" />}
              name="Voice Activity Detection"
              description="Smartly filters out silence to only record when you speak."
            />
            <Feature
              icon={<Code className="w-6 h-6" />}
              name="Open Source"
              description="Fully transparent code. Built with Rust and React."
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
}) => {
  return (
    <div
      className="grid hover:bg-secondary hover:rounded-xl grid-cols-[auto_1fr_auto] items-center rounded-b-none gap-3 border-b border-dashed p-3 last:border-b-0"
    >
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border text-foreground">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

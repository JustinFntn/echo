"use client";

import { motion, useTime, useTransform, type MotionValue } from "motion/react";

function WaveformBar({ index, time }: { index: number; time: MotionValue<number> }) {
    const height = useTransform(time, (t) => {
        const tSec = t / 1000;
        
        // Symmetric envelope
        const dist = Math.abs(index - 19.5);
        const envelope = Math.max(0.15, 1 - Math.pow(dist / 20, 2));
        
        // Coherent sine waves for "moving together" look
        const w1 = Math.sin(tSec * 3 + index * 0.2);
        const w2 = Math.sin(tSec * 4.7 + index * 0.15);
        
        // Combine
        const wave = (w1 + w2 * 0.5) / 1.5;
        
        // Map to 0-1 range
        const norm = (wave + 1) / 2;
        
        // Apply envelope and range
        const value = 10 + (norm * 80 * envelope);
        
        return `${value}%`;
    });

    return (
        <motion.div
            className="w-2 bg-primary rounded-full opacity-80"
            style={{ height }}
        />
    );
}

export default function Waveform() {
  const time = useTime();

  return (
    <section className="py-20 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-medium lg:text-5xl">Instant Transcription</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Just press your shortcut and start speaking. Echo captures your voice instantly and transcribes it locally.
            </p>
        </div>

        <div className="relative w-full max-w-3xl h-64 bg-secondary/30 rounded-xl border flex items-center justify-center overflow-hidden">
            {/* Fake UI Interface */}
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            
            <div className="flex items-center justify-center gap-1 h-32 w-full px-20">
                {Array.from({ length: 40 }).map((_, i) => (
                    <WaveformBar key={i} index={i} time={time} />
                ))}
            </div>

            <div className="absolute bottom-6 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border shadow-sm text-sm font-mono">
                <span className="text-muted-foreground">{">"}</span> Transcribing...
            </div>
        </div>
      </div>
    </section>
  );
}

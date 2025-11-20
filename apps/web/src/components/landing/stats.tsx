import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGithubData } from "@/hooks/use-github-data";

export default function Stats() {
  const { stars } = useGithubData();

  return (
    <section className="py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="grid gap-4 md:col-span-3 lg:grid-cols-3">
            <div className="bg-secondary/50 flex h-60 flex-col justify-between rounded-lg p-6 border border-border">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">
                  Privacy First
                </p>
              </div>
              <div>
                <h3 className="text-6xl font-semibold">100%</h3>
                <p className="text-foreground/80 text-base">
                  Offline & Private
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 flex h-60 flex-col justify-between rounded-lg p-6 border border-border">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">
                  Language Support
                </p>
              </div>
              <div>
                <h3 className="text-6xl font-semibold">100+</h3>
                <p className="text-foreground/80 text-base">
                  Languages Supported
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 flex h-60 flex-col justify-between rounded-lg p-6 border border-border">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">
                  Open Source
                </p>
              </div>
              <div>
                <h3 className="text-6xl font-semibold">MIT</h3>
                <p className="text-foreground/80 text-base">
                  Licensed & Free
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 py-20 text-center">
          <div>
            <h2 className="mb-4 text-3xl font-medium md:text-5xl">
              Built for privacy, loved for speed
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              The speech-to-text tool that respects your data.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button className="mt-4 h-14 px-10 text-lg" asChild>
                <a href="#download">Download Now</a>
            </Button>
            <p className="text-muted-foreground text-xs">
              macOS, Windows, and Linux supported
            </p>
            <a 
                href="https://github.com/damien-schneider/Echo" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
              <span className="text-primary text-md">
                {stars ? `${stars} stars on GitHub` : "Star on GitHub"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

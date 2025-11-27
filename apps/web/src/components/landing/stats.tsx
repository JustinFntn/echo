import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGithubData } from "@/hooks/use-github-data";

export default function Stats() {
  const { stars } = useGithubData();

  return (
    <section className="bg-background py-32 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="grid gap-4 md:col-span-3 lg:grid-cols-3">
            <div className="flex h-60 flex-col justify-between rounded-lg border border-border bg-secondary/50 p-6">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">Privacy First</p>
              </div>
              <div>
                <h3 className="font-semibold text-6xl">100%</h3>
                <p className="text-base text-foreground/80">
                  Offline & Private
                </p>
              </div>
            </div>

            <div className="flex h-60 flex-col justify-between rounded-lg border border-border bg-secondary/50 p-6">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">
                  Language Support
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-6xl">100+</h3>
                <p className="text-base text-foreground/80">
                  Languages Supported
                </p>
              </div>
            </div>

            <div className="flex h-60 flex-col justify-between rounded-lg border border-border bg-secondary/50 p-6">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">Open Source</p>
              </div>
              <div>
                <h3 className="font-semibold text-6xl">MIT</h3>
                <p className="text-base text-foreground/80">Licensed & Free</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 py-20 text-center">
          <div>
            <h2 className="mb-4 font-medium text-3xl md:text-5xl">
              Built for privacy, loved for speed
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              The speech-to-text tool that respects your data.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button asChild className="mt-4 h-14 px-10 text-lg">
              <a href="#download">Download Now</a>
            </Button>
            <p className="text-muted-foreground text-xs">
              macOS, Windows, and Linux supported
            </p>
            <a
              className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-primary"
              href="https://github.com/damien-schneider/Echo"
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                <Star className="h-4 w-4 fill-current text-yellow-500" />
              </div>
              <span className="text-md text-primary">
                {stars ? `${stars} stars on GitHub` : "Star on GitHub"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

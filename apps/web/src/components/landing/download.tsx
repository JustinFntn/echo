"use client";


import { AppleIcon, Monitor, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGithubData } from "@/hooks/use-github-data";

const Download = () => {
  const { downloadLinks } = useGithubData();

  const fallbackUrl = "https://github.com/damien-schneider/Echo/releases/latest";

  return (
    <section id="download" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 w-full text-center text-5xl tracking-tighter font-medium">
          Download Echo
        </h2>
        <div className="bg-secondary grid h-full w-full gap-6 border p-10 md:grid-cols-3 rounded-xl">
          {/* macOS */}
          <div className="">
            <div className="space-y-10">
              <div className="h-[50px] w-[50px] flex items-center justify-center">
                 <AppleIcon size={50} className="text-foreground" />
              </div>
              <h2 className="w-full text-5xl tracking-tighter font-medium">macOS</h2>
              <div className="space-y-2">
                <Button className="mx-auto h-12 w-full max-w-sm" asChild>
                    <a href={downloadLinks.macSilicon || fallbackUrl}>
                        Download for Apple Silicon
                    </a>
                </Button>
                <Button
                  variant="outline"
                  className="mx-auto h-12 w-full max-w-sm"
                  asChild
                >
                    <a href={downloadLinks.macIntel || fallbackUrl}>
                        Download for Intel
                    </a>
                </Button>
              </div>

              <div className="">
                <p className="text-sm text-muted-foreground">Minimum Requirements:</p>
                <p className="text-sm text-muted-foreground">
                  macOS 11.0 (Big Sur) or later.
                </p>
              </div>
            </div>
          </div>

          {/* Windows */}
          <div className="items-start md:flex">
            <Separator
              className="mr-6 hidden md:block h-full"
              orientation="vertical"
            />
            <Separator className="mb-6 block md:hidden" />
            <div className="space-y-10 w-full">
              <div className="h-[50px] w-[50px] flex items-center justify-center">
                <Monitor size={50} className="text-foreground" />
              </div>
              <h2 className="w-full text-5xl tracking-tighter font-medium">Windows</h2>
              <div className="space-y-2">
                <Button className="mx-auto h-12 w-full max-w-sm" asChild>
                    <a href={downloadLinks.windows || fallbackUrl}>
                        Download for x64
                    </a>
                </Button>
              </div>

              <div className="">
                <p className="text-sm text-muted-foreground">Minimum Requirements:</p>
                <p className="text-sm text-muted-foreground">Windows 10 (64-bit)</p>
              </div>
            </div>
          </div>

          {/* Linux */}
          <div className="items-start md:flex">
            <Separator
              className="mr-6 hidden md:block h-full"
              orientation="vertical"
            />
            <Separator className="mb-6 block md:hidden" />
            <div className="space-y-10 w-full">
              <div className="h-[50px] w-[50px] flex items-center justify-center">
                <Terminal size={50} className="text-foreground" />
              </div>
              <h2 className="w-full text-5xl tracking-tighter font-medium">Linux</h2>
              <div className="space-y-2">
                <Button className="mx-auto h-12 w-full max-w-sm" asChild>
                    <a href={downloadLinks.linuxAppImage || fallbackUrl}>
                        Download AppImage
                    </a>
                </Button>
                 <Button
                  variant="outline"
                  className="mx-auto h-12 w-full max-w-sm"
                  asChild
                >
                    <a href={downloadLinks.linuxDeb || fallbackUrl}>
                        Download .deb
                    </a>
                </Button>
              </div>

              <div className="mt-20">
                <p className="text-sm text-muted-foreground">Minimum Requirements:</p>
                <p className="text-sm text-muted-foreground">
                  {
                    "glibc >= 2.28 (e.g., Ubuntu 20, Debian 10)"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-md my-6 w-full text-center text-muted-foreground">
          Looking for other versions?
          <a href="https://github.com/damien-schneider/Echo/releases" className="cursor-pointer font-semibold hover:underline text-primary ml-1">
            View all releases
          </a>
        </p>
      </div>
    </section>
  );
};

export default Download

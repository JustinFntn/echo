"use client";

import { AppleIcon, Monitor, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGithubData } from "@/hooks/use-github-data";

const Download = () => {
  const { downloadLinks } = useGithubData();

  const fallbackUrl =
    "https://github.com/damien-schneider/Echo/releases/latest";

  return (
    <section className="bg-background py-20 text-foreground" id="download">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 w-full text-center font-medium text-5xl tracking-tighter">
          Download Echo
        </h2>
        <div className="grid h-full w-full gap-6 rounded-xl border bg-secondary p-10 md:grid-cols-3">
          {/* macOS */}
          <div className="">
            <div className="space-y-10">
              <div className="flex h-[50px] w-[50px] items-center justify-center">
                <AppleIcon className="text-foreground" size={50} />
              </div>
              <h2 className="w-full font-medium text-5xl tracking-tighter">
                macOS
              </h2>
              <div className="space-y-2">
                <Button asChild className="mx-auto h-12 w-full max-w-sm">
                  <a href={downloadLinks.macSilicon || fallbackUrl}>
                    Download for Apple Silicon
                  </a>
                </Button>
                <Button
                  asChild
                  className="mx-auto h-12 w-full max-w-sm"
                  variant="outline"
                >
                  <a href={downloadLinks.macIntel || fallbackUrl}>
                    Download for Intel
                  </a>
                </Button>
              </div>

              <div className="">
                <p className="text-muted-foreground text-sm">
                  Minimum Requirements:
                </p>
                <p className="text-muted-foreground text-sm">
                  macOS 11.0 (Big Sur) or later.
                </p>
              </div>
            </div>
          </div>

          {/* Windows */}
          <div className="items-start md:flex">
            <Separator
              className="mr-6 hidden h-full md:block"
              orientation="vertical"
            />
            <Separator className="mb-6 block md:hidden" />
            <div className="w-full space-y-10">
              <div className="flex h-[50px] w-[50px] items-center justify-center">
                <Monitor className="text-foreground" size={50} />
              </div>
              <h2 className="w-full font-medium text-5xl tracking-tighter">
                Windows
              </h2>
              <div className="space-y-2">
                <Button asChild className="mx-auto h-12 w-full max-w-sm">
                  <a href={downloadLinks.windows || fallbackUrl}>
                    Download for x64
                  </a>
                </Button>
              </div>

              <div className="">
                <p className="text-muted-foreground text-sm">
                  Minimum Requirements:
                </p>
                <p className="text-muted-foreground text-sm">
                  Windows 10 (64-bit)
                </p>
              </div>
            </div>
          </div>

          {/* Linux */}
          <div className="items-start md:flex">
            <Separator
              className="mr-6 hidden h-full md:block"
              orientation="vertical"
            />
            <Separator className="mb-6 block md:hidden" />
            <div className="w-full space-y-10">
              <div className="flex h-[50px] w-[50px] items-center justify-center">
                <Terminal className="text-foreground" size={50} />
              </div>
              <h2 className="w-full font-medium text-5xl tracking-tighter">
                Linux
              </h2>
              <div className="space-y-2">
                <Button asChild className="mx-auto h-12 w-full max-w-sm">
                  <a href={downloadLinks.linuxAppImage || fallbackUrl}>
                    Download AppImage
                  </a>
                </Button>
                <Button
                  asChild
                  className="mx-auto h-12 w-full max-w-sm"
                  variant="outline"
                >
                  <a href={downloadLinks.linuxDeb || fallbackUrl}>
                    Download .deb
                  </a>
                </Button>
              </div>

              <div className="mt-20">
                <p className="text-muted-foreground text-sm">
                  Minimum Requirements:
                </p>
                <p className="text-muted-foreground text-sm">
                  {"glibc >= 2.28 (e.g., Ubuntu 20, Debian 10)"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="my-6 w-full text-center text-md text-muted-foreground">
          Looking for other versions?
          <a
            className="ml-1 cursor-pointer font-semibold text-primary hover:underline"
            href="https://github.com/damien-schneider/Echo/releases"
          >
            View all releases
          </a>
        </p>
      </div>
    </section>
  );
};

export default Download;

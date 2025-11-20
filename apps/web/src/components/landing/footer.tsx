import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import EchoLogo from "@/components/icons/echo-logo"

interface FooterProps {
  logo?: React.ReactNode
  brandName: string
  showBrandName?: boolean
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: string
    license?: string
  }
}

export function Footer({
  logo,
  brandName,
  showBrandName = true,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24 bg-background text-foreground border-t">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            {showBrandName && <span className="font-bold text-xl">{brandName}</span>}
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function EchoFooter() {
    return (
        <Footer
            brandName="Echo"
            showBrandName={false}
            logo={<EchoLogo variant="full" className="h-8 w-auto text-foreground" />}
            socialLinks={[
                {
                    icon: <Github className="h-5 w-5" />,
                    href: "https://github.com/damien-schneider/Echo",
                    label: "GitHub",
                },
            ]}
            mainLinks={[
                { href: "/faq", label: "FAQ" },
                { href: "/roadmap", label: "Roadmap" },
                { href: "/contributing", label: "Contributing" },
                { href: "#download", label: "Download" },
                { href: "https://github.com/damien-schneider/Echo", label: "Documentation" },
            ]}
            legalLinks={[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/license", label: "License" },
            ]}
            copyright={{
                text: "© 2025 Echo. All rights reserved.",
                license: "MIT License",
            }}
        />
    )
}

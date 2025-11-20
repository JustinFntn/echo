import { createFileRoute } from '@tanstack/react-router'
import EchoFooter from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { H1, H2, P, List, InlineCode } from "@/components/ui/typography"

export const Route = createFileRoute('/contributing')({
  component: ContributingPage,
})

function ContributingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24">
      <div className="container mx-auto px-4 max-w-3xl pb-20">
        <H1>Contributing to Echo</H1>
        <P>
          Thank you for your interest in contributing to Echo! We welcome contributions from the community to help make Echo better for everyone.
        </P>

        <H2 className="mt-10">How to Contribute</H2>
        <P>
          There are many ways you can contribute to Echo:
        </P>
        <List>
          <li>Reporting bugs and issues</li>
          <li>Suggesting new features</li>
          <li>Improving documentation</li>
          <li>Submitting pull requests with code changes</li>
        </List>

        <H2 className="mt-10">Getting Started</H2>
        <P>
          To get started with development, please visit our GitHub repository and read the <InlineCode>CONTRIBUTING.md</InlineCode> file (if available) or the <InlineCode>README.md</InlineCode> for setup instructions.
        </P>

        <div className="mt-8">
          <Button asChild size="lg" className="gap-2">
            <a href="https://github.com/damien-schneider/Echo" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              Visit GitHub Repository
            </a>
          </Button>
        </div>
      </div>
      <EchoFooter />
    </div>
  )
}

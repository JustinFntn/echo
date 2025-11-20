import { createFileRoute } from '@tanstack/react-router'
import EchoFooter from '@/components/landing/footer'
import { Construction } from 'lucide-react'
import { H1, Lead, P } from "@/components/ui/typography"

export const Route = createFileRoute('/roadmap')({
  component: RoadmapPage,
})

function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pt-24 flex flex-col">
      <div className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center text-center pb-20">
        <div className="bg-secondary/50 p-6 rounded-full mb-6">
            <Construction className="h-16 w-16 text-primary" />
        </div>
        <H1 className="mb-4">Roadmap</H1>
        <Lead className="max-w-md mx-auto mb-8">
          We are working hard to bring you the best offline speech-to-text experience. Our roadmap will be published here soon.
        </Lead>
        <P className="text-muted-foreground">
            In the meantime, check out our <a href="https://github.com/damien-schneider/Echo/issues" className="text-primary hover:underline">GitHub Issues</a> to see what we're working on.
        </P>
      </div>
      <EchoFooter />
    </div>
  )
}

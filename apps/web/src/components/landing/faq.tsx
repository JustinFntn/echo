import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "motion/react"

const faqs = [
  {
    question: "Is Echo really offline?",
    answer:
      "Yes! Echo uses the Whisper model running locally on your device. No audio data is ever sent to the cloud.",
  },
  {
    question: "Which languages does Echo support?",
    answer:
      "Echo supports over 100 languages including English, Spanish, French, German, Chinese, Japanese, and many more.",
  },
  {
    question: "Does it work on all operating systems?",
    answer:
      "Echo is available for macOS (Apple Silicon & Intel), Windows, and Linux.",
  },
  {
    question: "Is it free?",
    answer:
      "Echo is open-source software. You can download and use it for free.",
  },
]

export function LandingFaq() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 w-full text-center text-4xl tracking-tighter font-medium"
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

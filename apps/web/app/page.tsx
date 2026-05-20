import { Background } from "@/components/landing/background"
import { Preview } from "@/components/landing/preview"
import { CTA } from "@/components/landing/ctx"
import { Features } from "@/components/landing/feature"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { Navbar } from "@/components/landing/navbar"
import { Why } from "@/components/landing/why"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Navbar />
      <Hero />
      <Features />
      <Preview />
      <Why />
      <CTA />
      <Footer />
    </main>
  )
}

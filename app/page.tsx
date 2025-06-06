import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getRandomQuote } from "@/app/actions/quotes"
import EnhancedThemeCustomizer from "@/components/enhanced-theme-customizer"
import DarkModeToggle from "@/components/dark-mode-toggle"

export default async function LandingPage() {
  // Get a random inspirational quote from our local collection
  const quote = await getRandomQuote("inspirational")

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 to-slate-900/90 dark:from-slate-900/90 dark:to-black z-10" />
        <Image
          src="/images/background.png"
          alt="Huzurlu manzara"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 flex flex-col items-center justify-center flex-grow px-4 py-16 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="/images/background.png"
                alt="LetGoNote Logo"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">LetGoNote</h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed">
            Bazen sadece içini dökmen gerekir. Yaz, bırak ve kendine bir nefes ver.
          </p>

          {quote && (
            <div className="mt-8 mb-10 bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
              <blockquote className="text-lg md:text-xl italic text-white/90">"{quote.content}"</blockquote>
              <footer className="mt-4 text-right text-white/70">— {quote.author || "Anonim"}</footer>
            </div>
          )}

          <div className="mt-8 md:mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/emotion">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/breathing">
              <Button
                size="lg"
                variant="secondary"
                className="bg-indigo-600/80 text-white border-indigo-400 hover:bg-indigo-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Nefes Egzersizi
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/journal">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Günlüğüm
              </Button>
            </Link>

            <Link href="/motivation">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Motivasyon
              </Button>
            </Link>

            <Link href="/stats">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                İstatistikler
              </Button>
            </Link>

            <Link href="/quotes">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Alıntılar
              </Button>
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-4">
            <Link href="/reminders">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Hatırlatıcılar
              </Button>
            </Link>

            <Link href="/sound">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Rahatlatıcı Sesler
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full py-6 text-center text-slate-300 text-sm">
        <p>Bu platform yazdıklarınızı kaydetmez. Burada olan, burada kalır.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/quotes" className="text-indigo-300 hover:text-indigo-200 underline inline-block">
            İlham Verici Alıntılar
          </Link>
          <Link href="/sound" className="text-indigo-300 hover:text-indigo-200 underline inline-block">
            Rahatlatıcı Sesler
          </Link>
        </div>
      </footer>

      {/* Theme customizer */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <EnhancedThemeCustomizer />
      </div>

      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
    </main>
  )
}

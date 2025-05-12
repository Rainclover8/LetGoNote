import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 to-slate-900/90 z-10" />
        <Image
          src="/public/placeholder-logo.jpg"
          alt="Huzurlu orman manzarası"
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
            <Image src="placeholder-logo.jpg" alt="LetGoNote Logo" width={120} height={120} className="animate-float" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">LetGoNote</h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed">
            Bazen sadece içini dökmen gerekir. Yaz, bırak ve kendine bir nefes ver.
          </p>

          <div className="mt-8 md:mt-12">
            <Link href="/emotion">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full py-6 text-center text-slate-300 text-sm">
        <p>Bu platform yazdıklarınızı kaydetmez. Burada olan, burada kalır.</p>
      </footer>
    </main>
  )
}

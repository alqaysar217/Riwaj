
'use client';

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, ShoppingBag, Store, ChevronLeft } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

const SLIDES = [
  {
    title: "كنوز اليمن بين يديك",
    description: "اكتشف أجود أنواع البن والعسل والحرف اليدوية من قلب اليمن الأصيل.",
    image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl,
    icon: Sparkles
  },
  {
    title: "ادعم الأسر المنتجة",
    description: "منصة رواج تربطك مباشرة بصناع الجمال والحرفيين في جميع أنحاء البلاد.",
    image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl,
    icon: ShoppingBag
  },
  {
    title: "ابدأ تجارتك الخاصة",
    description: "هل أنت حرفي أو صاحب مشروع؟ انضم إلينا وافتح متجرك الإلكتروني الآن.",
    image: PlaceHolderImages.find(i => i.id === "store-banner")?.imageUrl,
    icon: Store
  }
]

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Animated Background Image */}
      <div className="relative h-[55vh] w-full transition-all duration-1000 ease-in-out">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image 
              src={slide.image || ""} 
              alt="" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 px-8 pb-12 flex flex-col justify-between relative z-10 -mt-20">
        <div className="space-y-6">
          <div className="flex gap-2">
            {SLIDES.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/20"
                )}
              />
            ))}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-headline font-bold text-primary leading-tight">
              {SLIDES[currentSlide].title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {SLIDES[currentSlide].description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20 gap-2">
            <Link href="/auth/register">
              ابدأ الآن <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="flex-1 h-12 rounded-2xl border-primary/20 text-primary font-bold">
              <Link href="/auth/login">تسجيل الدخول</Link>
            </Button>
            <Button variant="ghost" asChild className="flex-1 h-12 rounded-2xl text-muted-foreground font-bold">
              <Link href="/">تخطي</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Logo Overlay */}
      <div className="absolute top-8 right-8 z-20">
        <span className="text-3xl font-headline font-bold text-white drop-shadow-lg">رواج</span>
      </div>
    </div>
  )
}

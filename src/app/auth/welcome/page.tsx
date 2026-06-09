
'use client';

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingBag, Store, ChevronLeft } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export default function WelcomePage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const SLIDES = [
    {
      title: "كنوز اليمن بين يديك",
      description: "اكتشف أجود أنواع البن والعسل والحرف اليدوية من قلب اليمن الأصيل، حيث تلتقي الجودة بالهوية.",
      image: PlaceHolderImages.find(i => i.id === "onboarding-1")?.imageUrl || "/Onboarding-1.png",
      icon: Sparkles
    },
    {
      title: "ادعم الأسر المنتجة",
      description: "رواج هو حلقة الوصل بينك وبين صناع الجمال والحرفيين المبدعين في جميع أنحاء البلاد.",
      image: PlaceHolderImages.find(i => i.id === "onboarding-2")?.imageUrl || "/Onboarding-2.png",
      icon: ShoppingBag
    },
    {
      title: "ابدأ تجارتك الخاصة",
      description: "حوّل شغفك إلى مشروع رابح. انضم إلى مئات التجار والأسر المنتجة وافتح متجرك الإلكتروني اليوم.",
      image: PlaceHolderImages.find(i => i.id === "onboarding-3")?.imageUrl || "/Onboarding-3.png",
      icon: Store
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [SLIDES.length])

  const handleStart = () => {
    localStorage.setItem('hasSeenWelcome', 'true')
    router.push('/auth/register')
  }

  const handleLogin = () => {
    localStorage.setItem('hasSeenWelcome', 'true')
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Images Layer */}
      <div className="relative h-[60vh] w-full">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <Image 
              src={slide.image} 
              alt="" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
        ))}
        
        {/* Logo Overlay */}
        <div className="absolute top-12 right-8 z-30">
          <span className="text-4xl font-headline font-bold text-white drop-shadow-2xl">رواج</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-8 pb-10 flex flex-col justify-between relative z-10 -mt-16">
        <div className="space-y-8">
          <div className="flex gap-2.5">
            {SLIDES.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700",
                  index === currentSlide ? "w-10 bg-primary shadow-lg shadow-primary/20" : "w-2 bg-primary/20"
                )}
              />
            ))}
          </div>

          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3">
               {(() => {
                 const Icon = SLIDES[currentSlide].icon;
                 return <Icon className="w-6 h-6 text-secondary" />
               })()}
               <h1 className="text-3xl font-headline font-bold text-primary leading-tight">
                {SLIDES[currentSlide].title}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[300px]">
              {SLIDES[currentSlide].description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button onClick={handleStart} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 gap-2">
            ابدأ الآن <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleLogin} className="flex-1 h-12 rounded-2xl border-primary/20 text-primary font-bold hover:bg-primary/5">
              تسجيل الدخول
            </Button>
            <Button variant="ghost" onClick={handleStart} className="flex-1 h-12 rounded-2xl text-muted-foreground font-bold">
              تخطي
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

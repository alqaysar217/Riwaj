
'use client';

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Coffee, Droplets, Wind, Palette, Shirt, Zap, Star, LayoutGrid, Utensils, Gem, Gift, ShoppingBag } from "lucide-react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const CATEGORIES = [
  { name: "الكل", icon: LayoutGrid, key: "all" },
  { name: "البن اليمني", icon: Coffee, key: "بن" },
  { name: "العسل الطبيعي", icon: Droplets, key: "عسل" },
  { name: "العطور والبخور", icon: Wind, key: "بخور" },
  { name: "المشغولات اليدوية", icon: Palette, key: "حرف" },
  { name: "الأزياء التقليدية", icon: Shirt, key: "ملابس" },
  { name: "الضيافة الشعبية", icon: Utensils, key: "أطعمة" },
]

const FEATURED_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر - درجة أولى", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن", image: "/products-1.png" },
  { id: "2", title: "عسل سدر ملكي - عصيمي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل", image: "/products-2.png" },
  { id: "3", title: "مبخرة صنعانية تقليدية", price: 3500, rating: 4.7, reviews: 45, storeName: "تراث اليمن", category: "حرف", image: "/products-3.png" },
  { id: "4", title: "بخور عدني خاص", price: 2800, rating: 4.8, reviews: 67, storeName: "بخور الملكة", category: "بخور", image: "/products-4.png" },
  { id: "5", title: "جنبية صيفاني قديمة", price: 25000, rating: 4.9, reviews: 12, storeName: "فضيات صنعاء", category: "حرف", image: "/products-5.png" },
  { id: "6", title: "ثوب يمني مطرز", price: 8500, rating: 4.6, reviews: 34, storeName: "أزياء سبأ", category: "ملابس", image: "/products-6.png" },
]

const HERO_SLIDES = [
  { image: "/Onboarding-1.png" },
  { image: "/Onboarding-2.png" },
  { image: "/Onboarding-3.png" },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = activeCategory === "all" 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div className="pb-20 md:pb-0">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-6">
          <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {HERO_SLIDES.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[180px] md:h-[420px] overflow-hidden rounded-xl shadow-2xl border-4 border-white bg-muted group">
                    <Image 
                      src={slide.image}
                      alt="رواج"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="right-4 left-auto bg-white/20 border-none text-white hover:bg-white/40" />
              <CarouselNext className="left-4 right-auto bg-white/20 border-none text-white hover:bg-white/40" />
            </div>
          </Carousel>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-headline font-bold text-primary">تصفح الفئات</h2>
            <Link href="/categories" className="text-primary text-xs font-medium flex items-center gap-1">
              عرض الكل <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all shadow-sm shrink-0 group font-bold text-xs",
                  activeCategory === cat.key 
                    ? "bg-primary text-white border-primary shadow-md" 
                    : "bg-white text-foreground border-border hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center transition-colors",
                  activeCategory === cat.key ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                )}>
                  <cat.icon className="w-3 h-3" />
                </div>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Filtered Products Section */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" /> 
                  {activeCategory === "all" ? "وصلنا حديثاً" : `منتجات ${CATEGORIES.find(c => c.key === activeCategory)?.name}`}
                </h2>
                <p className="text-muted-foreground text-xs">أحدث المنتجات من الأسر المنتجة والحرفيين</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/5 text-xs">
                <Link href="/categories">تصفح المزيد</Link>
              </Button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 opacity-40">
                <LayoutGrid className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-bold">لا توجد منتجات حالياً في هذا القسم</p>
              </div>
            )}
          </div>
        </section>

        {/* Best Selling Section */}
        {activeCategory === "all" && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-headline font-bold mb-6 text-primary flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary fill-secondary" /> الأكثر مبيعاً
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                {[...FEATURED_PRODUCTS].reverse().slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

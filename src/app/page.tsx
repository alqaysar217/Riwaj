
'use client';

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Coffee, Droplets, Wind, Palette, Shirt, Zap, Star } from "lucide-react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const CATEGORIES = [
  { name: "بن يمني", icon: Coffee },
  { name: "عسل سدر", icon: Droplets },
  { name: "بخور", icon: Wind },
  { name: "حرف يدوية", icon: Palette },
  { name: "ملابس", icon: Shirt },
]

const FEATURED_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر - درجة أولى", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
  { id: "2", title: "عسل سدر ملكي - عصيمي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
  { id: "3", title: "مبخرة صنعانية تقليدية", price: 3500, rating: 4.7, reviews: 45, storeName: "تراث اليمن", category: "حرف", image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl || "" },
  { id: "4", title: "بخور عدني خاص", price: 2800, rating: 4.8, reviews: 67, storeName: "بخور الملكة", category: "بخور", image: PlaceHolderImages.find(i => i.id === "product-incense")?.imageUrl || "" },
]

const HERO_SLIDES = [
  {
    image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "",
  },
  {
    image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "",
  },
  {
    image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl || "",
  },
]

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <Header />
      
      <main>
        {/* Hero Section with Carousel - Now with Autoplay */}
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
                  <div className="relative h-[160px] md:h-[350px] overflow-hidden rounded-3xl shadow-md">
                    <Image 
                      src={slide.image}
                      alt="رواج"
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
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

        {/* Categories Section - Unified Design */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-headline font-bold text-primary">تصفح الفئات</h2>
            <Link href="/categories" className="text-primary text-xs font-medium flex items-center gap-1">
              عرض الكل <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat, i) => (
              <Link 
                key={i} 
                href={`/categories/${cat.name}`} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border hover:border-primary hover:bg-primary/5 transition-all shadow-sm shrink-0 group"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <cat.icon className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" /> وصلنا حديثاً
                </h2>
                <p className="text-muted-foreground text-xs">أحدث المنتجات من الأسر المنتجة والحرفيين</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/5 text-xs">
                <Link href="/categories">عرض المزيد</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Selling Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-headline font-bold mb-6 text-primary flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary fill-secondary" /> الأكثر مبيعاً
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {FEATURED_PRODUCTS.slice().reverse().map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

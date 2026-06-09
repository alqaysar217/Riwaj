
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShieldCheck, ArrowLeft, ShoppingBag, LayoutGrid, Coffee, Droplets, Palette, Shirt, Wind } from "lucide-react"
import { cn } from "@/lib/utils"

const STORES = [
  { 
    id: "1", 
    name: "محامص الجبال", 
    category: "البن والقهوة", 
    rating: 4.8, 
    location: "صنعاء", 
    products: 45, 
    verified: true, 
    avatar: "/logo-stores-1.png",
    banner: "/logo-stores-ditales-1.png"
  },
  { 
    id: "2", 
    name: "عسل الوادي", 
    category: "العسل الطبيعي", 
    rating: 4.9, 
    location: "دوعن", 
    products: 12, 
    verified: true, 
    avatar: "/logo-stores-2.png",
    banner: "/logo-stores-ditales-2.png"
  },
  { 
    id: "3", 
    name: "تراث حضرموت", 
    category: "الحرف اليدوية", 
    rating: 4.6, 
    location: "تريم", 
    products: 89, 
    verified: false, 
    avatar: "/logo-stores-3.png",
    banner: "/logo-stores-ditales-3.png"
  },
  { 
    id: "4", 
    name: "بخور عدني", 
    category: "البخور والعطور", 
    rating: 4.7, 
    location: "عدن", 
    products: 34, 
    verified: true, 
    avatar: "/logo-stores-4.png",
    banner: "/logo-stores-ditales-4.png"
  },
  { 
    id: "5", 
    name: "منتجات مأرب", 
    category: "مأكولات شعبية", 
    rating: 4.5, 
    location: "مأرب", 
    products: 22, 
    verified: true, 
    avatar: "/logo-stores-5.png",
    banner: "/logo-stores-ditales-5.png"
  },
  { 
    id: "6", 
    name: "منسوجات المكلا", 
    category: "ملابس تقليدية", 
    rating: 4.8, 
    location: "المكلا", 
    products: 18, 
    verified: true, 
    avatar: "/logo-stores-6.png",
    banner: "/logo-stores-ditales-6.png"
  },
]

const STORE_CATEGORIES = [
  { name: "الكل", icon: LayoutGrid },
  { name: "البن", icon: Coffee },
  { name: "العسل", icon: Droplets },
  { name: "الحرف", icon: Palette },
  { name: "الملابس", icon: Shirt },
  { name: "العطور", icon: Wind },
]

export default function StoresDirectoryPage() {
  const [activeCategory, setActiveCategory] = useState("الكل")

  const filteredStores = STORES.filter(store => {
    if (activeCategory === "الكل") return true
    if (activeCategory === "البن") return store.category.includes("البن")
    if (activeCategory === "العسل") return store.category.includes("العسل")
    if (activeCategory === "الحرف") return store.category.includes("الحرف")
    if (activeCategory === "الملابس") return store.category.includes("ملابس")
    if (activeCategory === "العطور") return store.category.includes("البخور") || store.category.includes("العطور")
    return true
  })

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-headline font-bold text-primary mb-1">متاجر الحرفيين</h1>
          <p className="text-muted-foreground text-xs">اكتشف أفضل المتاجر والأسر المنتجة في اليمن</p>
        </div>

        {/* Horizontal Filters - Unified Design */}
        <div className="flex overflow-x-auto pb-6 gap-2 no-scrollbar -mx-4 px-4">
          {STORE_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all shrink-0 font-bold text-xs",
                activeCategory === cat.name 
                ? "bg-primary text-white border-primary shadow-md scale-105" 
                : "bg-white text-muted-foreground border-border hover:border-primary/30"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center",
                activeCategory === cat.name ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
              )}>
                <cat.icon className="w-3 h-3" />
              </div>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <Link key={store.id} href={`/stores/${store.id}`}>
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white rounded-2xl">
                  <CardContent className="p-0">
                    <div className="relative h-24 bg-muted">
                      <Image 
                        src={store.banner} 
                        alt="" 
                        fill 
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <div className="p-4 relative">
                      <div className="absolute -top-10 right-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
                          <Image src={store.avatar} alt={store.name} fill className="object-cover" />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-bold text-base group-hover:text-primary transition-colors">{store.name}</h3>
                            {store.verified && <ShieldCheck className="w-4 h-4 text-green-600" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3" /> {store.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg text-secondary font-bold text-[10px]">
                          <Star className="w-3 h-3 fill-secondary" />
                          {store.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4 py-3 border-t border-muted">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                            <MapPin className="w-3 h-3" />
                          </div>
                          <span className="text-[11px] font-bold">{store.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mr-auto">
                          <span className="text-[11px] text-muted-foreground">
                            <span className="text-primary font-bold">{store.products}</span> منتج
                          </span>
                          <ArrowLeft className="w-3 h-3 text-muted-foreground group-hover:translate-x-[-4px] transition-transform" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center opacity-40">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
              <p className="font-bold">لا توجد متاجر في هذا القسم حالياً</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

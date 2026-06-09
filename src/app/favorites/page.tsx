
"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProductCard } from "@/components/product/product-card"
import { Search, X, ShoppingBag, Store, Star, MapPin, ShieldCheck, ChevronLeft, Heart, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const FAVORITE_PRODUCTS = [
  {
    id: "1",
    title: "بن خولاني مطري فاخر",
    price: 5500,
    rating: 4.9,
    reviews: 142,
    category: "البن اليمني",
    storeName: "محامص الجبال",
    image: "/products-1.png"
  },
  {
    id: "2",
    title: "عسل سدر ملكي",
    price: 12000,
    rating: 5.0,
    reviews: 89,
    category: "العسل الطبيعي",
    storeName: "رحيق الوادي",
    image: "/products-2.png"
  },
]

const FAVORITE_STORES = [
  { id: "1", name: "محامص الجبال", category: "البن اليمني", rating: 4.8, location: "صنعاء", verified: true, avatar: "/logo-stores-1.png" },
]

export default function FavoritesPage() {
  const [searchInput, setSearchInput] = useState("")

  const filteredProducts = useMemo(() => {
    return FAVORITE_PRODUCTS.filter(product => 
      product.title.toLowerCase().includes(searchInput.toLowerCase()) || 
      product.storeName.toLowerCase().includes(searchInput.toLowerCase())
    )
  }, [searchInput])

  const filteredStores = useMemo(() => {
    return FAVORITE_STORES.filter(store => 
      store.name.toLowerCase().includes(searchInput.toLowerCase()) || 
      store.category.toLowerCase().includes(searchInput.toLowerCase())
    )
  }, [searchInput])

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/profile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary">المفضلة</h1>
              <p className="text-muted-foreground text-xs">قائمة المنتجات والمتاجر التي أعجبتك</p>
            </div>
          </div>

          {/* Search Area */}
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <Input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث في مفضلتك..." 
                className="h-14 pr-12 pl-12 rounded-2xl bg-muted/40 border-none text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-sm"
              />
              {searchInput && (
                <button 
                  onClick={() => setSearchInput("")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Tabs Area */}
          <Tabs defaultValue="products" className="w-full" dir="rtl">
            <TabsList className="bg-primary/5 p-1.5 rounded-2xl h-14 border border-primary/10 shadow-inner w-full mb-8">
              <TabsTrigger 
                value="products" 
                className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-xs gap-2 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" /> المنتجات ({filteredProducts.length})
              </TabsTrigger>
              <TabsTrigger 
                value="stores" 
                className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-xs gap-2 transition-all duration-300"
              >
                <Store className="w-4 h-4" /> المتاجر ({filteredStores.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-muted/10 rounded-3xl border border-dashed">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold text-primary">لا توجد منتجات في المفضلة</h3>
                  <p className="text-muted-foreground text-xs">أضف بعض المنتجات التي تعجبك لتجدها هنا</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="stores">
              <div className="space-y-4">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <Link key={store.id} href={`/stores/${store.id}`} className="block">
                      <div className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-4 hover:border-primary/20 transition-all group">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border">
                          <Image src={store.avatar} alt={store.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{store.name}</h3>
                            {store.verified && <ShieldCheck className="w-3.5 h-3.5 text-green-600" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {store.location}
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-secondary font-bold text-[10px]">
                              <Star className="w-3 h-3 fill-secondary" />
                              {store.rating}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{store.category}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-24 bg-muted/10 rounded-3xl border border-dashed">
                    <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-primary">لا توجد متاجر في المفضلة</h3>
                    <p className="text-muted-foreground text-xs">تابع متاجرك المفضلة لتصل لمنتجاتهم بسرعة</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Search, SlidersHorizontal, X, ShoppingBag, Store, Star, MapPin, ShieldCheck, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

const MOCK_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
  { id: "2", title: "عسل سدر ملكي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
  { id: "3", title: "مبخرة صنعانية تقليدية", price: 3500, rating: 4.7, reviews: 45, storeName: "تراث اليمن", category: "حرف", image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl || "" },
]

const MOCK_STORES = [
  { id: "1", name: "محامص الجبال", category: "البن والقهوة", rating: 4.8, location: "صنعاء", verified: true, avatar: "https://picsum.photos/seed/store1/100/100" },
  { id: "2", name: "عسل الوادي", category: "العسل الطبيعي", rating: 4.9, location: "دوعن", verified: true, avatar: "https://picsum.photos/seed/store2/100/100" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get("q") || ""
  
  const [searchInput, setSearchInput] = useState(queryParam)
  const [priceRange, setPriceRange] = useState([0, 25000])

  useEffect(() => {
    setSearchInput(queryParam)
  }, [queryParam])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Enhanced Search Input Area */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <Input 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="ابحث عن المنتجات أو المتاجر..." 
              className="h-14 pr-12 pl-12 rounded-2xl bg-muted/40 border-none text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-sm"
            />
            {searchInput && (
              <button 
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </form>
        </div>

        {/* Search Scope Tabs & Filter Button */}
        <Tabs defaultValue="products" className="w-full" dir="rtl">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted/30 p-1 rounded-xl h-12">
              <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 font-bold text-xs gap-2">
                <ShoppingBag className="w-3.5 h-3.5" /> المنتجات
              </TabsTrigger>
              <TabsTrigger value="stores" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 font-bold text-xs gap-2">
                <Store className="w-3.5 h-3.5" /> المتاجر
              </TabsTrigger>
            </TabsList>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary/20 text-primary font-bold shadow-sm h-11 px-4 hover:bg-primary/5">
                  <SlidersHorizontal className="w-4 h-4" /> تصفية
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-[32px] h-[85vh] p-6 border-none shadow-2xl">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-xl font-headline font-bold text-primary text-center">خيارات التصفية</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-8 overflow-y-auto max-h-[calc(85vh-200px)] no-scrollbar py-2">
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm border-r-4 border-secondary pr-3 leading-none">الفئات</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["البن اليمني", "عسل طبيعي", "بخور وعطور", "حرف يدوية", "ملابس تقليدية", "مأكولات"].map((cat) => (
                        <div key={cat} className="flex items-center space-x-2 space-x-reverse bg-muted/30 p-3 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                          <Checkbox id={cat} />
                          <Label htmlFor={cat} className="text-xs font-bold cursor-pointer pr-2 flex-1">{cat}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <h3 className="font-bold text-sm border-r-4 border-secondary pr-3 leading-none">نطاق السعر</h3>
                      <p className="text-xs text-primary font-bold">{priceRange[0]} - {priceRange[1]} ر.ي</p>
                    </div>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 25000]} 
                        max={50000} 
                        step={1000} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="py-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-sm border-r-4 border-secondary pr-3 leading-none">ترتيب حسب</h3>
                    <div className="flex flex-wrap gap-2">
                      {["الأحدث", "الأكثر مبيعاً", "السعر: من الأقل", "السعر: من الأعلى"].map((sort) => (
                        <Button key={sort} variant="outline" size="sm" className="rounded-full text-[10px] font-bold h-9 px-4 border-muted-foreground/20 hover:border-primary hover:text-primary">
                          {sort}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex gap-3 bg-white pt-4">
                  <SheetClose asChild>
                    <Button variant="ghost" className="flex-1 rounded-2xl h-12 font-bold text-muted-foreground">إعادة تعيين</Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="flex-[2] rounded-2xl h-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">تطبيق الفلاتر</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <TabsContent value="products">
            {MOCK_PRODUCTS.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {MOCK_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-bold">لا توجد نتائج للمنتجات</h3>
                <p className="text-muted-foreground text-sm">جرب كلمات بحث مختلفة</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stores">
            <div className="space-y-4">
              {MOCK_STORES.length > 0 ? (
                MOCK_STORES.map((store) => (
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
                <div className="text-center py-20">
                  <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold">لا توجد متاجر مطابقة</h3>
                  <p className="text-muted-foreground text-sm">جرب البحث بكلمة أخرى</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  )
}


"use client"

import { useState, useEffect, useMemo } from "react"
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
import { cn } from "@/lib/utils"

const ALL_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن يمني", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
  { id: "2", title: "عسل سدر ملكي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل طبيعي", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
  { id: "3", title: "مبخرة صنعانية تقليدية", price: 3500, rating: 4.7, reviews: 45, storeName: "تراث اليمن", category: "حرف يدوية", image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl || "" },
  { id: "4", title: "بخور عدني خاص", price: 2800, rating: 4.8, reviews: 67, storeName: "بخور الملكة", category: "بخور وعطور", image: PlaceHolderImages.find(i => i.id === "product-incense")?.imageUrl || "" },
  { id: "5", title: "قشر قهوة مطري", price: 1800, rating: 4.5, reviews: 30, storeName: "محامص الجبال", category: "بن يمني", image: PlaceHolderImages.find(i => i.id === "product-qishr")?.imageUrl || "" },
]

const ALL_STORES = [
  { id: "1", name: "محامص الجبال", category: "بن يمني", rating: 4.8, location: "صنعاء", verified: true, avatar: "https://picsum.photos/seed/store1/100/100" },
  { id: "2", name: "عسل الوادي", category: "عسل طبيعي", rating: 4.9, location: "دوعن", verified: true, avatar: "https://picsum.photos/seed/store2/100/100" },
  { id: "3", name: "تراث اليمن", category: "حرف يدوية", rating: 4.6, location: "حضرموت", verified: false, avatar: "https://picsum.photos/seed/store3/100/100" },
]

const CATEGORIES = ["بن يمني", "عسل طبيعي", "بخور وعطور", "حرف يدوية", "ملابس تقليدية", "مأكولات"]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get("q") || ""
  
  const [searchInput, setSearchInput] = useState(queryParam)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("الأحدث")

  useEffect(() => {
    setSearchInput(queryParam)
  }, [queryParam])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
  }

  // Filter Logic for Products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.title.includes(searchInput) || product.storeName.includes(searchInput)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    }).sort((a, b) => {
      if (sortBy === "السعر: من الأقل") return a.price - b.price
      if (sortBy === "السعر: من الأعلى") return b.price - a.price
      return 0
    })
  }, [searchInput, selectedCategories, priceRange, sortBy])

  // Filter Logic for Stores
  const filteredStores = useMemo(() => {
    return ALL_STORES.filter(store => {
      const matchesSearch = store.name.includes(searchInput) || store.category.includes(searchInput)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(store.category)
      return matchesSearch && matchesCategory
    })
  }, [searchInput, selectedCategories])

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Input Area */}
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
            <TabsList className="bg-primary/5 p-1.5 rounded-2xl h-14 border border-primary/10 shadow-inner">
              <TabsTrigger 
                value="products" 
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg px-6 font-bold text-xs gap-2 transition-all duration-300"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> المنتجات
              </TabsTrigger>
              <TabsTrigger 
                value="stores" 
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg px-6 font-bold text-xs gap-2 transition-all duration-300"
              >
                <Store className="w-3.5 h-3.5" /> المتاجر
              </TabsTrigger>
            </TabsList>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-xl gap-2 border-primary/20 text-primary font-bold shadow-sm h-11 px-4 hover:bg-primary/5">
                  <SlidersHorizontal className="w-4 h-4" /> تصفية
                  {(selectedCategories.length > 0) && (
                    <span className="w-4 h-4 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-[40px] h-[85vh] p-6 border-none shadow-2xl [&>button]:left-6 [&>button]:right-auto">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-xl font-headline font-bold text-primary text-center">خيارات التصفية</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-8 overflow-y-auto max-h-[calc(85vh-200px)] no-scrollbar py-2">
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm border-r-4 border-secondary pr-3 leading-none">الفئات</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => (
                        <div 
                          key={cat} 
                          onClick={() => toggleCategory(cat)}
                          className={cn(
                            "flex items-center space-x-2 space-x-reverse p-3 rounded-xl cursor-pointer transition-all border",
                            selectedCategories.includes(cat) 
                              ? "bg-primary/10 border-primary text-primary" 
                              : "bg-muted/30 border-transparent hover:border-primary/20"
                          )}
                        >
                          <Checkbox id={cat} checked={selectedCategories.includes(cat)} />
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
                        defaultValue={[0, 50000]} 
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
                        <Button 
                          key={sort} 
                          variant={sortBy === sort ? "default" : "outline"}
                          onClick={() => setSortBy(sort)}
                          size="sm" 
                          className="rounded-full text-[10px] font-bold h-9 px-4 transition-all"
                        >
                          {sort}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-6 right-6 flex gap-3 bg-white pt-4">
                  <Button 
                    variant="ghost" 
                    className="flex-1 rounded-2xl h-12 font-bold text-muted-foreground"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, 50000])
                      setSortBy("الأحدث")
                    }}
                  >
                    إعادة تعيين
                  </Button>
                  <SheetClose asChild>
                    <Button className="flex-[2] rounded-2xl h-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">تطبيق الفلاتر</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <TabsContent value="products">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-muted/10 rounded-3xl border border-dashed">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-primary">لا توجد نتائج للمنتجات</h3>
                <p className="text-muted-foreground text-xs">جرب كلمات بحث أخرى أو تغيير الفلاتر</p>
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
                  <h3 className="text-lg font-bold text-primary">لا توجد متاجر مطابقة</h3>
                  <p className="text-muted-foreground text-xs">جرب البحث بكلمة أخرى أو تغيير الفئات</p>
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

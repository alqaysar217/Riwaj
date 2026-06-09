
"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProductCard } from "@/components/product/product-card"
import { Search, SlidersHorizontal, X, ShoppingBag, Store, Star, MapPin, ShieldCheck, ChevronLeft, Loader2 } from "lucide-react"
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
  {
    id: "3",
    title: "مبخرة نحاسية تراثية",
    price: 4500,
    rating: 4.7,
    reviews: 65,
    category: "العطور والبخور",
    storeName: "عبق التراث",
    image: "/products-3.png"
  },
  {
    id: "4",
    title: "خنجر يمني (جنبية)",
    price: 25000,
    rating: 4.8,
    reviews: 42,
    category: "المشغولات اليدوية",
    storeName: "سيوف الحرفيين",
    image: "/products-4.png"
  },
  {
    id: "5",
    title: "فستان مطرز يدوياً",
    price: 18000,
    rating: 4.6,
    reviews: 35,
    category: "الأزياء التقليدية",
    storeName: "حياكة الأجداد",
    image: "/products-5.png"
  },
  {
    id: "6",
    title: "سلة خوص ملونة",
    price: 3200,
    rating: 4.5,
    reviews: 78,
    category: "المشغولات اليدوية",
    storeName: "أنامل تهامة",
    image: "/products-6.png"
  },
  {
    id: "7",
    title: "عقد فضة وعقيق",
    price: 9500,
    rating: 4.9,
    reviews: 55,
    category: "المجوهرات والحلي",
    storeName: "صائغ العقيق",
    image: "/products-7.png"
  },
  {
    id: "8",
    title: "بخور عدني فاخر",
    price: 6000,
    rating: 4.8,
    reviews: 112,
    category: "العطور والبخور",
    storeName: "خبير البخور",
    image: "/products-8.png"
  },
  {
    id: "9",
    title: "حقيبة جلد طبيعي",
    price: 15000,
    rating: 4.7,
    reviews: 48,
    category: "الجلديات والإكسسوارات",
    storeName: "دباغة الجلود",
    image: "/products-9.png"
  },
  {
    id: "10",
    title: "فخار صنعاني أصيل",
    price: 2500,
    rating: 4.5,
    reviews: 92,
    category: "المشغولات اليدوية",
    storeName: "بيت الفخار",
    image: "/products-10.png"
  }
];

const ALL_STORES = [
  { id: "1", name: "محامص الجبال", category: "البن والقهوة", rating: 4.8, location: "صنعاء", verified: true, avatar: "/logo-stores-1.png" },
  { id: "2", name: "رحيق الوادي", category: "العسل الطبيعي", rating: 4.9, location: "حضرموت", verified: true, avatar: "/logo-stores-2.png" },
  { id: "3", name: "عبق التراث", category: "العطور والبخور", rating: 4.7, location: "صنعاء", verified: true, avatar: "/logo-stores-3.png" },
  { id: "4", name: "سيوف الحرفيين", category: "المشغولات اليدوية", rating: 4.9, location: "صعدة", verified: true, avatar: "/logo-stores-4.png" },
  { id: "5", name: "حياكة الأجداد", category: "الأزياء التقليدية", rating: 4.6, location: "تعز", verified: true, avatar: "/logo-stores-5.png" },
  { id: "6", name: "أنامل تهامة", category: "المشغولات اليدوية", rating: 4.5, location: "الحديدة", verified: false, avatar: "/logo-stores-6.png" },
  { id: "7", name: "صائغ العقيق", category: "المجوهرات والحلي", rating: 4.9, location: "صنعاء", verified: true, avatar: "/logo-stores-7.png" },
  { id: "8", name: "خبير البخور", category: "العطور والبخور", rating: 4.8, location: "عدن", verified: true, avatar: "/logo-stores-8.png" },
]

const CATEGORIES = ["البن اليمني", "العسل الطبيعي", "العطور والبخور", "المشغولات اليدوية", "الأزياء التقليدية", "المجوهرات والحلي"]

function SearchContent() {
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

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchInput.toLowerCase()) || product.storeName.toLowerCase().includes(searchInput.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    }).sort((a, b) => {
      if (sortBy === "السعر: من الأقل") return a.price - b.price
      if (sortBy === "السعر: من الأعلى") return b.price - a.price
      return 0
    })
  }, [searchInput, selectedCategories, priceRange, sortBy])

  const filteredStores = useMemo(() => {
    return ALL_STORES.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchInput.toLowerCase()) || store.category.toLowerCase().includes(searchInput.toLowerCase())
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
    <main className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <Input 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ابحث عن المنتجات أو المتاجر..." 
            className="h-14 pr-12 pl-12 rounded-xl bg-muted/40 border-none text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-sm"
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

      <Tabs defaultValue="products" className="w-full" dir="rtl">
        <div className="flex items-center gap-3 mb-8">
          <TabsList className="bg-primary/5 p-1 rounded-xl h-12 border border-primary/10 shadow-inner flex-1">
            <TabsTrigger 
              value="products" 
              className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-xs gap-2 transition-all duration-300"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> المنتجات
            </TabsTrigger>
            <TabsTrigger 
              value="stores" 
              className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-bold text-xs gap-2 transition-all duration-300"
            >
              <Store className="w-3.5 h-3.5" /> المتاجر
            </TabsTrigger>
          </TabsList>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl shrink-0 border-primary/20 text-primary font-bold shadow-sm h-12 w-12 hover:bg-primary/5 relative">
                <SlidersHorizontal className="w-5 h-5" />
                {(selectedCategories.length > 0) && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center border-2 border-white">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] h-[85vh] p-6 border-none shadow-2xl [&>button]:left-6 [&>button]:right-auto">
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
                  className="flex-1 rounded-xl h-12 font-bold text-muted-foreground"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 50000])
                    setSortBy("الأحدث")
                  }}
                >
                  إعادة تعيين
                </Button>
                <SheetClose asChild>
                  <Button className="flex-[2] rounded-xl h-12 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">تطبيق الفلاتر</Button>
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
            <div className="text-center py-24 bg-muted/10 rounded-xl border border-dashed">
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
                  <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4 hover:border-primary/20 transition-all group">
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
              <div className="text-center py-24 bg-muted/10 rounded-xl border border-dashed">
                <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-primary">لا توجد متاجر مطابقة</h3>
                <p className="text-muted-foreground text-xs">جرب البحث بكلمة أخرى أو تغيير الفئات</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="pb-24">
      <Header />
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-bold text-muted-foreground">جاري تحميل نتائج البحث...</p>
        </div>
      }>
        <SearchContent />
      </Suspense>
      <BottomNav />
    </div>
  )
}

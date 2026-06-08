
"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Search, SlidersHorizontal, X } from "lucide-react"
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

const MOCK_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
  { id: "2", title: "عسل سدر ملكي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
  { id: "3", title: "مبخرة صنعانية تقليدية", price: 3500, rating: 4.7, reviews: 45, storeName: "تراث اليمن", category: "حرف", image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl || "" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [priceRange, setPriceRange] = useState([0, 25000])

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">
              {query ? `نتائج البحث عن: ${query}` : "البحث في رواج"}
            </h1>
            <p className="text-muted-foreground text-xs">تم العثور على {MOCK_PRODUCTS.length} منتج</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/20 text-primary font-bold shadow-sm hover:bg-primary/5">
                <SlidersHorizontal className="w-4 h-4" /> تصفية
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] h-[85vh] p-6 border-none shadow-2xl">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-xl font-headline font-bold text-primary text-center">خيارات التصفية</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-8 overflow-y-auto max-h-[calc(85vh-200px)] no-scrollbar py-2">
                {/* Categories */}
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

                {/* Price Range */}
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

                {/* Sort By */}
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

        {MOCK_PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <h3 className="text-lg font-bold">لا توجد نتائج</h3>
            <p className="text-muted-foreground text-sm">جرب كلمات بحث مختلفة مثل "بن" أو "عسل"</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

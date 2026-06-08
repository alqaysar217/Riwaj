
"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_PRODUCTS = [
  { id: "1", title: "بن خولاني فاخر", price: 4500, rating: 4.9, reviews: 124, storeName: "متجر خولان", category: "بن", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
  { id: "2", title: "عسل سدر ملكي", price: 12000, rating: 5.0, reviews: 89, storeName: "عسل الوادي", category: "عسل", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">
              {query ? `نتائج البحث عن: ${query}` : "البحث في رواج"}
            </h1>
            <p className="text-muted-foreground text-sm">تم العثور على {MOCK_PRODUCTS.length} منتج</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/20 text-primary">
            <SlidersHorizontal className="w-4 h-4" /> تصفية
          </Button>
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

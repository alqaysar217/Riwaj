import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Coffee, Droplets, Wind, Palette, Shirt, Utensils, Gem, ShoppingBag, ChevronLeft } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const CATEGORIES = [
  { id: "1", name: "البن اليمني", icon: Coffee, count: 124, image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl },
  { id: "2", name: "عسل طبيعي", icon: Droplets, count: 56, image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl },
  { id: "3", name: "بخور وعطور", icon: Wind, count: 89, image: PlaceHolderImages.find(i => i.id === "product-incense")?.imageUrl },
  { id: "4", name: "حرف يدوية", icon: Palette, count: 142, image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl },
  { id: "5", name: "ملابس تقليدية", icon: Shirt, count: 73, image: "https://picsum.photos/seed/clothes-cat/400/500" },
  { id: "6", name: "مأكولات بيتية", icon: Utensils, count: 45, image: "https://picsum.photos/seed/food-cat/400/500" },
  { id: "7", name: "فضيات وهدايا", icon: Gem, count: 32, image: "https://picsum.photos/seed/silver-cat/400/500" },
  { id: "8", name: "أخرى", icon: ShoppingBag, count: 21, image: "https://picsum.photos/seed/other-cat/400/500" },
]

export default function CategoriesPage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">الفئات</h1>
          <p className="text-muted-foreground text-sm">تصفح المنتجات اليمنية حسب التصنيف</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/search?q=${encodeURIComponent(cat.name)}`} 
              className="group relative block aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
              {/* Category Image */}
              <Image 
                src={cat.image || ""} 
                alt={cat.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-white text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <cat.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-lg mb-1 leading-tight">{cat.name}</h3>
                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                   <p className="text-[10px] font-medium">{cat.count} منتج</p>
                   <ChevronLeft className="w-3 h-3 translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

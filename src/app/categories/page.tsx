
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Coffee, Droplets, Wind, Palette, Shirt, Utensils, Gem, Gift, ShoppingBag, ChevronLeft, LayoutGrid } from "lucide-react"

const CATEGORIES = [
  { id: "1", name: "البن اليمني", icon: Coffee, count: 124, image: "/categories-1.png" },
  { id: "2", name: "العسل الطبيعي", icon: Droplets, count: 85, image: "/categories-2.png" },
  { id: "3", name: "العطور والبخور", icon: Wind, count: 42, image: "/categories-3.png" },
  { id: "4", name: "المشغولات اليدوية", icon: Palette, count: 56, image: "/categories-4.png" },
  { id: "5", name: "الأزياء التقليدية", icon: Shirt, count: 38, image: "/categories-5.png" },
  { id: "6", name: "الضيافة الشعبية", icon: Utensils, count: 92, image: "/categories-6.png" },
  { id: "7", name: "المجوهرات والحلي", icon: Gem, count: 67, image: "/categories-7.png" },
  { id: "8", name: "الهدايا الفاخرة", icon: Gift, count: 29, image: "/categories-8.png" },
  { id: "9", name: "الجلديات والإكسسوارات", icon: ShoppingBag, count: 45, image: "/categories-9.png" },
  { id: "10", name: "أخرى", icon: LayoutGrid, count: 12, image: "/logo.png" },
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
              className="group relative block aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
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

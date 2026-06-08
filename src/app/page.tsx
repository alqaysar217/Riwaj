import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Coffee, Droplets, Wind, Palette, Shirt, Zap, Star } from "lucide-react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

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

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[400px] overflow-hidden">
          <Image 
            src={PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || ""}
            alt="Yemeni Heritage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-20 text-white">
            <h1 className="text-2xl md:text-5xl font-headline font-bold mb-3 max-w-md">أصالة اليمن في كل منتج</h1>
            <p className="text-xs md:text-lg mb-6 max-w-sm opacity-90 leading-relaxed">اكتشف كنوز اليمن من البن الفاخر والعسل الملكي والحرف اليدوية الأصيلة.</p>
            <div className="flex gap-2">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none px-6 font-bold text-sm md:text-base">تسوق الآن</Button>
            </div>
          </div>
        </section>

        {/* Small Horizontal Categories (Filter Style) */}
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
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary hover:bg-primary/5 transition-all shadow-sm shrink-0 group"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <cat.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-bold whitespace-nowrap">{cat.name}</span>
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

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const CATEGORIES = [
  { name: "بن يمني", icon: "☕", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl },
  { name: "عسل سدر", icon: "🍯", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl },
  { name: "بخور", icon: "💨", image: PlaceHolderImages.find(i => i.id === "product-incense")?.imageUrl },
  { name: "حرف يدوية", icon: "🏺", image: PlaceHolderImages.find(i => i.id === "cat-handicrafts")?.imageUrl },
  { name: "ملابس", icon: "👗", image: "https://picsum.photos/seed/clothes/400/400" },
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
        <section className="relative h-[250px] md:h-[450px] overflow-hidden">
          <Image 
            src={PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || ""}
            alt="Yemeni Heritage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-20 text-white">
            <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4 max-w-md">أصالة اليمن في كل منتج</h1>
            <p className="text-sm md:text-lg mb-6 max-w-sm opacity-90 leading-relaxed">اكتشف كنوز اليمن من البن الفاخر والعسل الملكي والحرف اليدوية الأصيلة.</p>
            <div className="flex gap-3">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none px-8 font-bold">تسوق الآن</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black hidden sm:flex">عن رواج</Button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold">تسوق حسب الفئة</h2>
            <Link href="/categories" className="text-primary text-sm font-medium flex items-center gap-1">
              عرض الكل <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={i} href={`/categories/${cat.name}`} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <Image 
                  src={cat.image || ""} 
                  alt={cat.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="font-bold text-sm">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-headline font-bold text-primary">وصلنا حديثاً</h2>
                <p className="text-muted-foreground text-sm">أحدث المنتجات من الأسر المنتجة والحرفيين</p>
              </div>
              <Button variant="ghost" className="text-primary hover:bg-primary/5">عرض المزيد</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="flex-1 z-10 text-center md:text-right">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">قصة نجاح</span>
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4 text-primary">تمكين الأسر المنتجة اليمنية</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                رواج ليس مجرد سوق، بل هو جسر يربط بين المبدعين في القرى والمدن اليمنية وبين العالم. نضمن لك الجودة ونضمن لهم عائداً عادلاً.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">اكتشف المتاجر</Button>
            </div>
            <div className="flex-1 relative w-full aspect-video md:aspect-auto h-[250px] rounded-2xl overflow-hidden z-10">
              <Image 
                src={PlaceHolderImages.find(i => i.id === "store-banner")?.imageUrl || ""}
                alt="Productive Families"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Best Selling Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-headline font-bold mb-8 text-primary">الأكثر مبيعاً</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
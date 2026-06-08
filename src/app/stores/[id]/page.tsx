
"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product/product-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  MessageCircle, 
  Share2, 
  Calendar,
  Info,
  Sparkles
} from "lucide-react"

export default function StoreProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  // Mock data for the store
  const store = {
    id: id,
    name: "محامص الجبال",
    category: "البن والقهوة",
    rating: 4.8,
    reviews: 245,
    location: "صنعاء، حي حدة",
    joinedDate: "يناير 2023",
    verified: true,
    avatar: "https://picsum.photos/seed/store1/200/200",
    banner: "https://picsum.photos/seed/b1/1200/400",
    description: "نحن في محامص الجبال نفخر بتقديم أجود أنواع البن اليمني الأصيل، نعتني بكل حبة بن من المزرعة وحتى محمصة القهوة لنضمن لكم نكهة لا تنسى تجسد تراث اليمن العريق.",
    aiNarrative: "يتميز هذا المتجر بالتزامه بتقاليد زراعة البن في جبال خولان، حيث يتم التجفيف طبيعياً تحت أشعة الشمس، مما يمنح محاصيله نكهة فاكهية فريدة تعكس جودة التربة اليمنية."
  }

  const STORE_PRODUCTS = [
    { id: "1", title: "بن خولاني فاخر", price: 4500, rating: 4.9, reviews: 124, storeName: store.name, category: "بن", image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "" },
    { id: "2", title: "قشر قهوة يمني", price: 1500, rating: 4.7, reviews: 56, storeName: store.name, category: "بن", image: PlaceHolderImages.find(i => i.id === "product-qishr")?.imageUrl || "" },
    { id: "3", title: "عسل سدر مطري", price: 15000, rating: 5.0, reviews: 32, storeName: store.name, category: "عسل", image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl || "" },
    { id: "4", title: "خلطة بن عربي", price: 3800, rating: 4.8, reviews: 89, storeName: store.name, category: "بن", image: "https://picsum.photos/seed/mix/400/400" },
  ]

  return (
    <div className="pb-24">
      <Header />
      
      <main>
        {/* Store Header / Banner */}
        <div className="relative h-48 md:h-64 bg-muted">
          <Image src={store.banner} alt="" fill className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full shadow-md bg-white/20 backdrop-blur-md text-white border-none">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Store Profile Info */}
        <div className="container mx-auto px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-border/50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex gap-4 items-start md:items-end">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white shrink-0">
                  <Image src={store.avatar} alt={store.name} fill className="object-cover" />
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-headline font-bold text-primary">{store.name}</h1>
                    {store.verified && <ShieldCheck className="w-5 h-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
                    <ShoppingBag className="w-3 h-3 text-primary" /> {store.category}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-lg text-secondary font-bold text-[10px]">
                      <Star className="w-3 h-3 fill-secondary" />
                      {store.rating} ({store.reviews} تقييم)
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-medium">
                      <MapPin className="w-3 h-3" /> {store.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 md:flex-none bg-primary hover:bg-primary/90 rounded-full h-11 px-6 font-bold shadow-lg shadow-primary/20">
                  متابعة المتجر
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none rounded-full h-11 px-6 font-bold border-primary/20 text-primary gap-2">
                  <MessageCircle className="w-4 h-4" /> مراسلة
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Tabs Content */}
        <div className="container mx-auto px-4 mt-8">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto mb-8 gap-8">
              <TabsTrigger 
                value="products" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 h-auto font-bold text-base"
              >
                المنتجات ({STORE_PRODUCTS.length})
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-4 h-auto font-bold text-base"
              >
                حول المتجر
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {STORE_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="text-lg font-headline font-bold text-primary mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-secondary" /> نبذة عن المتجر
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {store.description}
                    </p>
                  </div>
                  
                  {/* AI Generated Cultural Context */}
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <h3 className="text-lg font-headline font-bold text-primary mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-secondary" /> القصة وراء المتجر
                    </h3>
                    <p className="text-primary/80 italic leading-relaxed">
                      {store.aiNarrative}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider">معلومات إضافية</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">تاريخ الانضمام</p>
                        <p className="text-sm font-bold">{store.joinedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">إجمالي المبيعات</p>
                        <p className="text-sm font-bold">1,240+ طلب ناجح</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20">
                    <p className="text-xs font-bold text-secondary mb-1">ضمان رواج</p>
                    <p className="text-[10px] text-muted-foreground">جميع منتجات هذا المتجر تخضع لسياسة حماية المشتري وضمان الأصالة.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

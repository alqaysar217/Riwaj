import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShieldCheck, ArrowLeft } from "lucide-react"

const STORES = [
  { id: "1", name: "محامص الجبال", category: "البن والقهوة", rating: 4.8, location: "صعدة", products: 45, verified: true, avatar: "https://picsum.photos/seed/store1/100/100" },
  { id: "2", name: "عسل الوادي", category: "العسل الطبيعي", rating: 4.9, location: "دوعن، حضرموت", products: 12, verified: true, avatar: "https://picsum.photos/seed/store2/100/100" },
  { id: "3", name: "تراث صنعاء", category: "الحرف اليدوية", rating: 4.6, location: "صنعاء القديمة", products: 89, verified: false, avatar: "https://picsum.photos/seed/store3/100/100" },
  { id: "4", name: "بخور عدني", category: "البخور والعطور", rating: 4.7, location: "عدن", products: 34, verified: true, avatar: "https://picsum.photos/seed/store4/100/100" },
  { id: "5", name: "مشغولات فضية", category: "الإكسسوارات", rating: 4.5, location: "صنعاء", products: 22, verified: true, avatar: "https://picsum.photos/seed/store5/100/100" },
]

export default function StoresDirectoryPage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">متاجر الحرفيين</h1>
            <p className="text-muted-foreground">اكتشف أفضل المتاجر والأسر المنتجة في اليمن</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge className="bg-primary text-white cursor-pointer px-4">الكل</Badge>
            <Badge variant="outline" className="cursor-pointer px-4 whitespace-nowrap">البن والقهوة</Badge>
            <Badge variant="outline" className="cursor-pointer px-4 whitespace-nowrap">العسل</Badge>
            <Badge variant="outline" className="cursor-pointer px-4 whitespace-nowrap">الحرف</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORES.map((store) => (
            <Link key={store.id} href={`/stores/${store.id}`}>
              <Card className="hover:shadow-md transition-all group overflow-hidden border-none shadow-sm">
                <CardContent className="p-0">
                  <div className="h-24 bg-gradient-to-l from-primary/10 to-secondary/10 relative">
                    <div className="absolute -bottom-6 right-6">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-sm">
                        <Image src={store.avatar} alt={store.name} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-8">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{store.name}</h3>
                          {store.verified && <ShieldCheck className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{store.category}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded text-secondary font-bold text-xs">
                        <Star className="w-3 h-3 fill-secondary" />
                        {store.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {store.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-primary">{store.products}</span> منتج
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex -space-x-2 space-x-reverse overflow-hidden">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="inline-block h-8 w-8 rounded-full border-2 border-white bg-muted relative">
                            <Image src={`https://picsum.photos/seed/p${store.id}${i}/50/50`} alt="" fill className="object-cover rounded-full" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center mr-auto">
                        شاهد المنتجات <ArrowLeft className="w-3 h-3 mr-1" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
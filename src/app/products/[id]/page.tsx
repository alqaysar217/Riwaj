
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShieldCheck, Truck, MessageCircle, Heart, Share2, Sparkles } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Mock data for the product
  const product = {
    id: id,
    title: "بن خولاني مطري فاخر - تحميص متوسط",
    price: 5500,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 142,
    category: "البن اليمني",
    store: {
      name: "محامص الجبال",
      rating: 4.8,
      location: "صعدة، اليمن",
      verified: true
    },
    narrative: {
      title: "رحلة من جبال خولان إلى فنجانك",
      body: "من أعلى قمم الجبال في صعدة، حيث تعانق الغيوم أشجار البن العتيقة، نأتيكم بهذا البن الخولاني المطري. تم انتقاء كل حبة يدوياً وتجفيفها تحت أشعة الشمس الذهبية للحفاظ على نكهتها الغنية التي تجمع بين عبق التراب اليمني وحلاوة الفواكه المجففة.",
      culturalHighlight: "زراعة البن في خولان تعود لمئات السنين، حيث تتوارث العائلات تقنيات العناية بالأشجار عبر الأجيال."
    },
    specs: [
      { label: "المنطقة", value: "خولان، صعدة" },
      { label: "نوع التحميص", value: "متوسط" },
      { label: "الوزن", value: "500 جرام" },
      { label: "المعالجة", value: "تجفيف طبيعي" }
    ],
    images: [
      PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || "",
      PlaceHolderImages.find(i => i.id === "product-qishr")?.imageUrl || "",
    ]
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-white">
              <Image 
                src={product.images[0]} 
                alt={product.title} 
                fill 
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                  <Heart className="w-5 h-5 text-destructive" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-md">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-primary/20 cursor-pointer shrink-0">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary/20">{product.category}</Badge>
                {product.store.verified && (
                  <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 gap-1">
                    <ShieldCheck className="w-3 h-3" /> توثيق أصالة
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-headline font-bold text-primary">{product.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-muted-foreground text-sm">({product.reviews} تقييم)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/stores/1" className="text-primary text-sm font-medium hover:underline">
                  {product.store.name}
                </Link>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-2xl">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-primary">{product.price} ر.ي</span>
                <span className="text-muted-foreground line-through text-lg">{product.originalPrice} ر.ي</span>
                <Badge className="bg-secondary text-white mr-auto">خصم 15%</Badge>
              </div>
              
              <div className="flex gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 text-lg">أضف إلى السلة</Button>
                <Button className="bg-secondary hover:bg-secondary/90 text-white h-12 px-8 text-lg font-bold">شراء الآن</Button>
              </div>
            </div>

            {/* Cultural Narrative - GenAI Powered */}
            <div className="bg-white border border-secondary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12" />
              <h3 className="text-xl font-headline font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" /> {product.narrative.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed italic">
                {product.narrative.body}
              </p>
              <div className="mt-4 pt-4 border-t border-dashed border-secondary/20">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">لمحة ثقافية</p>
                <p className="text-sm text-primary/80">{product.narrative.culturalHighlight}</p>
              </div>
            </div>

            {/* Delivery/Store Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-xl p-4 flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold">توصيل سريع</p>
                  <p className="text-xs text-muted-foreground">خلال 3-5 أيام عمل</p>
                </div>
              </div>
              <div className="border rounded-xl p-4 flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold">دردشة فورية</p>
                  <p className="text-xs text-muted-foreground">تواصل مباشر مع التاجر</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-bold mb-4">المواصفات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-muted">
                    <span className="text-muted-foreground text-sm">{spec.label}</span>
                    <span className="font-medium text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

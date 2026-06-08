
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Heart, 
  Share2, 
  Sparkles,
  Store,
  ChevronLeft,
  Clock,
  ArrowRight
} from "lucide-react"
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
      id: "1",
      name: "محامص الجبال",
      rating: 4.8,
      location: "صعدة، اليمن",
      verified: true
    },
    narrative: {
      title: "قصة من قلب جبال خولان",
      body: "من أعالي قمم الجبال التي تعانق السحاب في صعدة، نأتيكم بهذا البن الخولاني الأصيل. تم انتقاء كل حبة يدوياً بعناية فائقة، وتجفيفها طبيعياً تحت أشعة الشمس الذهبية للحفاظ على نكهتها الغنية التي تجمع بين عبق الأرض وحلاوة الفواكه المجففة.",
      culturalHighlight: "زراعة البن في خولان هي إرث يتناقله الأجيال، حيث تعامل كل شجرة كجزء من أفراد العائلة."
    },
    specs: [
      { label: "المنطقة", value: "خولان، صعدة" },
      { label: "نوع التحميص", value: "متوسط" },
      { label: "الوزن", value: "500 جرام" },
      { label: "المعالجة", value: "تجفيف طبيعي" }
    ],
    image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || ""
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back Link - Mobile Friendly */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary p-0">
            <Link href="/categories" className="flex items-center gap-1 font-bold text-xs">
              <ArrowRight className="w-4 h-4 ml-1" /> العودة للتسوق
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Image Section - Even smaller and more compact */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative aspect-square w-full max-w-[280px] md:max-w-xs rounded-3xl overflow-hidden border bg-white shadow-sm mx-auto lg:mx-0">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm border-none w-7 h-7">
                  <Heart className="w-3.5 h-3.5 text-destructive" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm border-none w-7 h-7">
                  <Share2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3">
                <Badge className="bg-primary/90 backdrop-blur-sm text-white px-2 py-0.5 font-bold text-[9px]">
                  {product.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Details Info Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {product.store.verified && (
                  <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 gap-1 text-[10px] font-bold py-0.5">
                    <ShieldCheck className="w-3 h-3" /> منتج أصلي موثق
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-headline font-bold text-primary leading-tight">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-bold text-sm">{product.rating}</span>
                  <span className="text-muted-foreground text-xs">({product.reviews} تقييم)</span>
                </div>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <Link href={`/stores/${product.store.id}`} className="flex items-center gap-1.5 text-primary hover:underline group">
                  <div className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-sm">{product.store.name}</span>
                  <ChevronLeft className="w-3 h-3 group-hover:translate-x-[-2px] transition-transform" />
                </Link>
              </div>
            </div>

            <Separator />

            {/* Price and Actions Card */}
            <div className="bg-white border p-6 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-bold">السعر الحالي</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{product.price} ر.ي</span>
                    <span className="text-muted-foreground line-through text-sm font-medium">{product.originalPrice} ر.ي</span>
                  </div>
                </div>
                <Badge className="bg-secondary text-white px-3 py-1 font-bold">توفير 15%</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                  أضف إلى السلة
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/5 h-12 rounded-2xl text-lg font-bold">
                  شراء الآن
                </Button>
              </div>
              
              <div className="flex justify-around py-2 border-t border-dashed gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">توصيل سريع</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">ضمان الجودة</span>
                </div>
              </div>
            </div>

            {/* Cultural Narrative Section */}
            <div className="bg-accent/30 rounded-3xl p-6 border border-accent relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mt-12" />
              <h3 className="text-lg font-headline font-bold text-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" /> {product.narrative.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed italic text-sm">
                {product.narrative.body}
              </p>
              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-0.5">لمحة ثقافية</p>
                    <p className="text-xs text-primary/80 font-medium leading-normal">{product.narrative.culturalHighlight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-primary border-r-4 border-secondary pr-3 leading-none">المواصفات الفنية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-muted hover:border-primary/20 transition-colors">
                    <span className="text-muted-foreground text-[10px] font-bold">{spec.label}</span>
                    <span className="font-bold text-[10px] text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Store */}
            <Button variant="ghost" className="w-full h-11 rounded-xl text-primary font-bold gap-2 hover:bg-primary/5 text-sm">
              <MessageCircle className="w-5 h-5" /> تواصل مع التاجر للاستفسار
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

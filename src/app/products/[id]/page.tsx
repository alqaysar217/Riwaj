
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

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const PRODUCTS = [
    {
      id: "1",
      title: "بن خولاني مطري فاخر",
      price: 5500,
      originalPrice: 6500,
      rating: 4.9,
      reviews: 142,
      category: "البن اليمني",
      store: { id: "1", name: "محامص الجبال", rating: 4.8, location: "صعدة، اليمن", verified: true },
      narrative: {
        title: "إرث الجبال العالية",
        body: "بن خولاني أصيل، قطفناه بعناية من أعالي قمم صعدة ليعطيك نكهة غنية تعكس عبق الأرض وجمال التقاليد.",
        culturalHighlight: "زراعة البن في خولان موروث متوارث منذ مئات السنين."
      },
      specs: [{ label: "المنطقة", value: "خولان، صعدة" }, { label: "نوع التحميص", value: "متوسط" }, { label: "الوزن", value: "500 جرام" }],
      image: "/products-1.png"
    },
    {
      id: "2",
      title: "عسل سدر ملكي",
      price: 12000,
      originalPrice: 15000,
      rating: 5.0,
      reviews: 89,
      category: "العسل الطبيعي",
      store: { id: "2", name: "رحيق الوادي", rating: 4.9, location: "حضرموت، اليمن", verified: true },
      narrative: {
        title: "ذهب حضرموت السائل",
        body: "عسل سدر طبيعي من أشجار السدر المعمرة في وديان حضرموت، يمتاز بقوامه الكثيف وطعمه الفريد وفوائده العظيمة.",
        culturalHighlight: "يُعد عسل السدر اليمني الأجود عالمياً بفضل تنوع المراعي."
      },
      specs: [{ label: "المصدر", value: "وديان حضرموت" }, { label: "النوع", value: "سدر ملكي" }, { label: "الوزن", value: "1 كيلو" }],
      image: "/products-2.png"
    },
    {
      id: "3",
      title: "مبخرة نحاسية تراثية",
      price: 4500,
      originalPrice: 5500,
      rating: 4.7,
      reviews: 65,
      category: "العطور والبخور",
      store: { id: "4", name: "عبق التراث", rating: 4.7, location: "صنعاء، اليمن", verified: true },
      narrative: {
        title: "فخامة الأصالة",
        body: "مبخرة نحاسية مصنوعة يدوياً بنقوش إسلامية دقيقة، تضيف لمسة من الفخامة والعراقة لأي ركن في منزلك.",
        culturalHighlight: "فن نقش النحاس في صنعاء القديمة مهنة يتوارثها الحرفيون."
      },
      specs: [{ label: "المادة", value: "نحاس نقي" }, { label: "التصميم", value: "نقوش صنعانية" }, { label: "الاستخدام", value: "بخور/ديكور" }],
      image: "/products-3.png"
    },
    {
      id: "4",
      title: "خنجر يمني (جنبية)",
      price: 25000,
      originalPrice: 30000,
      rating: 4.8,
      reviews: 42,
      category: "المشغولات اليدوية",
      store: { id: "6", name: "صائغ العقيق", rating: 4.9, location: "صنعاء، اليمن", verified: true },
      narrative: {
        title: "رمز الرجولة والشموخ",
        body: "جنبية يمنية أصلية بمقبض من قرن وحيد القرن الطبيعي، ونصل فولاذي حاد، قطعة فنية تجمع التاريخ والقوة.",
        culturalHighlight: "الجنبية هي رمز الهوية الوطنية وزينة الرجل اليمني."
      },
      specs: [{ label: "المقبض", value: "صيفاني طبيعي" }, { label: "المنشأ", value: "اليمن" }, { label: "الحالة", value: "جديد" }],
      image: "/products-4.png"
    },
    {
      id: "5",
      title: "فستان مطرز يدوياً",
      price: 18000,
      originalPrice: 22000,
      rating: 4.6,
      reviews: 35,
      category: "الأزياء التقليدية",
      store: { id: "7", name: "هدايا وتحف", rating: 4.4, location: "عدن، اليمن", verified: true },
      narrative: {
        title: "أناقة الحاضر بروح الماضي",
        body: "فستان نسائي بتطريز يدوي دقيق يعكس دقة الحرفيين اليمنيين، مصمم ليمنحكِ إطلالة ملكية في المناسبات.",
        culturalHighlight: "التطريز اليمني يعتمد على خيوط الحرير والألوان الزاهية."
      },
      specs: [{ label: "الخامة", value: "حرير وقطن" }, { label: "نوع التطريز", value: "يدوي" }, { label: "المقاس", value: "متعدد" }],
      image: "/products-5.png"
    },
    {
      id: "6",
      title: "سلة خوص ملونة",
      price: 3200,
      originalPrice: 4000,
      rating: 4.5,
      reviews: 78,
      category: "المشغولات اليدوية",
      store: { id: "7", name: "هدايا وتحف", rating: 4.4, location: "عدن، اليمن", verified: true },
      narrative: {
        title: "فن الحياكة الطبيعية",
        body: "سلة خوص مصنوعة من سعف النخيل الطبيعي، ملونة بأصباغ مستخلصة من الطبيعة، مثالية للتنظيم والديكور.",
        culturalHighlight: "تعتبر صناعة الخوص من أعرق الحرف في المناطق الساحلية."
      },
      specs: [{ label: "المادة", value: "سعف نخيل" }, { label: "الوزن", value: "500 جرام" }, { label: "المتانة", value: "عالية" }],
      image: "/products-6.png"
    },
    {
      id: "7",
      title: "عقد فضة وعقيق",
      price: 9500,
      originalPrice: 11000,
      rating: 4.9,
      reviews: 55,
      category: "المجوهرات والحلي",
      store: { id: "6", name: "صائغ العقيق", rating: 4.9, location: "صنعاء، اليمن", verified: true },
      narrative: {
        title: "بريق العقيق اليماني",
        body: "عقد من الفضة الخالصة مرصع بالعقيق اليماني الكبدي الأصلي، يجمع بين بريق الفضة وجمال الحجر التاريخي.",
        culturalHighlight: "العقيق اليماني هو الحجر الأكثر شهرة في التاريخ الإسلامي."
      },
      specs: [{ label: "المعدن", value: "فضة عيار 925" }, { label: "الحجر", value: "عقيق يماني" }, { label: "الوزن", value: "80 جرام" }],
      image: "/products-7.png"
    },
    {
      id: "8",
      title: "بخور عدني فاخر",
      price: 6000,
      originalPrice: 7500,
      rating: 4.8,
      reviews: 112,
      category: "العطور والبخور",
      store: { id: "8", name: "خبير البخور", rating: 4.8, location: "عدن، اليمن", verified: true },
      narrative: {
        title: "رائحة الحب والذكريات",
        body: "خلطة بخور عدني أصلية، مكونة من أجود أنواع العود والعطور الشرقية التي تدوم طويلاً وتملأ المكان بالسكينة.",
        culturalHighlight: "البخور جزء لا يتجزأ من طقوس الضيافة اليمنية."
      },
      specs: [{ label: "الوزن", value: "250 جرام" }, { label: "النوع", value: "عدني" }, { label: "الثبات", value: "عالي" }],
      image: "/products-8.png"
    },
    {
      id: "9",
      title: "حقيبة جلد طبيعي",
      price: 15000,
      originalPrice: 18000,
      rating: 4.7,
      reviews: 48,
      category: "الجلديات والإكسسوارات",
      store: { id: "7", name: "هدايا وتحف", rating: 4.4, location: "عدن، اليمن", verified: true },
      narrative: {
        title: "متانة تعيش طويلاً",
        body: "حقيبة نسائية من الجلد الطبيعي المعالج يدوياً، بتصميم يجمع بين الحداثة والتراث اليمني.",
        culturalHighlight: "اشتهرت اليمن قديماً بصناعة الجلود ودباغتها."
      },
      specs: [{ label: "المادة", value: "جلد بقر طبيعي" }, { label: "اللون", value: "بني" }, { label: "الاستخدام", value: "يومي" }],
      image: "/products-9.png"
    },
    {
      id: "10",
      title: "فخار صنعاني أصيل",
      price: 2500,
      originalPrice: 3000,
      rating: 4.5,
      reviews: 92,
      category: "المشغولات اليدوية",
      store: { id: "3", name: "بيت الفخار", rating: 4.5, location: "صنعاء، اليمن", verified: true },
      narrative: {
        title: "نتاج الطين والماء",
        body: "أواني فخارية مصنوعة يدوياً على القرص الدوار، تستخدم لحفظ الماء وتبريده بشكل طبيعي وصحي.",
        culturalHighlight: "الفخار الصنعاني يعكس علاقة الإنسان اليمني بالأرض."
      },
      specs: [{ label: "المادة", value: "طين طبيعي" }, { label: "الاستخدام", value: "حفظ الماء" }, { label: "المنشأ", value: "صنعاء" }],
      image: "/products-10.png"
    }
  ];

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  return (
    <div className="pb-24 bg-background min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary p-0">
            <Link href="/" className="flex items-center gap-1 font-bold text-xs">
              <ArrowRight className="w-4 h-4 ml-1" /> العودة للتسوق
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative aspect-square w-full max-w-[320px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-white mx-auto lg:mx-0 group">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm border-none w-9 h-9">
                  <Heart className="w-4.5 h-4.5 text-destructive" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm border-none w-9 h-9">
                  <Share2 className="w-4.5 h-4.5" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 font-bold text-xs rounded-xl">
                  {product.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {product.store.verified && (
                  <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 gap-1.5 text-[10px] font-bold py-1 px-3 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> منتج أصلي موثق
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-headline font-bold text-primary leading-tight">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-bold text-sm">{product.rating}</span>
                  <span className="text-muted-foreground text-xs">({product.reviews} تقييم)</span>
                </div>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <Link href={`/stores/${product.store.id}`} className="flex items-center gap-2 text-primary hover:underline group">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                    <Store className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">{product.store.name}</span>
                  <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
                </Link>
              </div>
            </div>

            <Separator />

            {/* Price and Actions */}
            <div className="bg-white border-2 border-primary/5 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wider">السعر الحالي</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">{product.price.toLocaleString()} ر.ي</span>
                    <span className="text-muted-foreground line-through text-lg font-medium">{product.originalPrice.toLocaleString()} ر.ي</span>
                  </div>
                </div>
                <Badge className="bg-secondary text-white px-4 py-1.5 font-bold rounded-xl text-sm shadow-lg shadow-secondary/20">توفير 15%</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
                  أضف إلى السلة
                </Button>
                <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/5 h-14 rounded-2xl text-lg font-bold transition-all active:scale-95">
                  شراء الآن
                </Button>
              </div>
              
              <div className="flex justify-around py-4 border-t border-dashed gap-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-bold text-muted-foreground">توصيل سريع</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-bold text-muted-foreground">ضمان الجودة</span>
                </div>
              </div>
            </div>

            {/* AI Narrative Section */}
            <div className="bg-accent/40 rounded-[2.5rem] p-8 border border-accent relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-xl font-headline font-bold text-primary mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-secondary animate-pulse" /> {product.narrative.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">
                "{product.narrative.body}"
              </p>
              <div className="mt-6 pt-6 border-t border-primary/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">لمحة ثقافية</p>
                    <p className="text-sm text-primary/80 font-medium leading-relaxed">{product.narrative.culturalHighlight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-primary border-r-4 border-secondary pr-4 leading-none">المواصفات الفنية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-muted hover:border-primary/20 transition-all shadow-sm group">
                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{spec.label}</span>
                    <span className="font-bold text-sm text-primary group-hover:text-secondary transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Store */}
            <Button variant="ghost" className="w-full h-14 rounded-2xl text-primary font-bold gap-3 hover:bg-primary/5 text-base border border-dashed border-primary/20 mt-4">
              <MessageCircle className="w-6 h-6" /> تواصل مع التاجر للاستفسار عبر واتساب
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

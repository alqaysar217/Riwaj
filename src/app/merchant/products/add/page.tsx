'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowRight, 
  Camera, 
  Sparkles, 
  Loader2, 
  Plus, 
  X, 
  Tag, 
  Info,
  Save,
  Trash2,
  Type,
  LayoutGrid,
  DollarSign,
  Package,
  FileText,
  BadgeCheck,
  ChevronLeft,
  Upload,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { generateProductNarrative } from "@/ai/flows/generate-product-narrative"
import { suggestProductTags } from "@/ai/flows/suggest-product-tags"
import { cn } from "@/lib/utils"

export default function AddProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    tags: [] as string[],
    narrative: ""
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAIAssist = async () => {
    if (!formData.name || !image) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى كتابة اسم المنتج وإضافة صورة أولاً لاستخدام ذكاء رواج.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      const tagsResult = await suggestProductTags({
        productDescription: formData.name,
        productImage: image
      })

      const narrativeResult = await generateProductNarrative({
        productName: formData.name,
        productDescription: formData.description || formData.name,
        category: formData.category || (tagsResult.suggestedCategories[0] === 'Other' ? 'بن' : tagsResult.suggestedCategories[0]),
        photoDataUri: image
      })

      setFormData({
        ...formData,
        category: tagsResult.suggestedCategories[0] || formData.category,
        tags: tagsResult.suggestedTags.slice(0, 5),
        narrative: narrativeResult.narrativeBody,
        description: narrativeResult.narrativeBody
      })

      toast({ title: "تم توليد بيانات المنتج بنبض رواج!" })
    } catch (error) {
      toast({ title: "خطأ في مساعد الذكاء الاصطناعي", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast({ title: "يرجى إكمال البيانات الأساسية", variant: "destructive" })
      return
    }
    toast({ title: "تمت إضافة المنتج بنجاح إلى متجرك!" })
    router.push('/merchant/products')
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 pb-28 max-w-6xl">
      {/* Header with Background Accent */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 p-8 rounded-[35px] border border-white/20 backdrop-blur-sm shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="flex items-center gap-5 relative z-10">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="w-12 h-12 rounded-2xl bg-white border shadow-sm text-primary shrink-0 hover:bg-primary/5 transition-all">
            <ArrowRight className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">إضافة منتج جديد</h1>
            <p className="text-muted-foreground text-sm font-medium flex items-center gap-2 mt-1">
               <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
               حول منتجاتك إلى قصص نجاح تجذب العملاء
            </p>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
           <Button variant="ghost" onClick={() => router.push('/merchant/products')} className="rounded-2xl h-14 px-8 font-bold text-muted-foreground hover:bg-destructive/5 hover:text-destructive">إلغاء</Button>
           <Button onClick={handleSave} className="rounded-2xl h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-3 px-10 font-bold transition-all hover:scale-[1.02] active:scale-95">
              <Save className="w-5 h-5" /> نشر المنتج الآن
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Media & AI */}
        <div className="lg:col-span-4 space-y-8">
          {/* Image Upload Area */}
          <div className="space-y-4">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] pr-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" /> صُورة المنتج
            </Label>
            <div 
              className={cn(
                "relative aspect-square rounded-[45px] border-4 border-dashed transition-all duration-500 overflow-hidden shadow-sm group cursor-pointer",
                image ? "border-primary/20 bg-white" : "border-muted-foreground/10 bg-muted/5 hover:border-primary/40 hover:bg-primary/5"
              )}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <Button variant="secondary" size="sm" className="rounded-2xl gap-2 font-bold shadow-xl border-none h-11 px-6">
                      <Upload className="w-4 h-4" /> تغيير الصورة
                    </Button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center text-primary shadow-lg group-hover:rotate-6 transition-transform duration-500">
                    <Plus className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-primary">اضغط لإضافة صور</p>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed font-medium">ارفع صوراً واضحة وعالية الجودة لزيادة ثقة المشترين بمنتجك</p>
                  </div>
                </div>
              )}
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          {/* AI Assistance Card */}
          <Card className="border-none shadow-2xl shadow-secondary/5 rounded-[45px] bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-primary">ذكاء رواج للتاجر</h3>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">مساعدك الشخصي</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                وفر وقتك وجهدك! أضف صورة واسماً للمنتج، وسيقوم "ذكاء رواج" بكتابة وصف سردي جذاب واقتراح الكلمات الدلالية المناسبة لك فوراً.
              </p>
              
              <Button 
                onClick={handleAIAssist}
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-white" />}
                توليد البيانات تلقائياً
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Form Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Info Card */}
          <Card className="border-none shadow-xl shadow-black/[0.02] rounded-[45px] overflow-hidden bg-white">
            <CardHeader className="bg-muted/10 border-b p-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-secondary border border-black/[0.02]">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">المعلومات الأساسية</CardTitle>
                  <CardDescription className="font-medium text-muted-foreground/70">أدخل تفاصيل المنتج بدقة لضمان سهولة وصول العملاء إليه</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-8">
                {/* Product Name */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-3 flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" /> اسم المنتج التجاري
                  </Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثلاً: بن خولاني فاخر - درجة أولى" 
                    className="h-16 rounded-2xl bg-muted/20 border-none px-8 font-bold text-lg focus-visible:ring-2 focus-visible:ring-primary/20 placeholder:text-muted-foreground/40" 
                  />
                </div>

                {/* Category & Price Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground pr-3 flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-primary" /> الفئة الأساسية
                    </Label>
                    <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                      <SelectTrigger className="h-16 rounded-2xl bg-muted/20 border-none px-8 font-bold focus-visible:ring-2 focus-visible:ring-primary/20">
                        <SelectValue placeholder="اختر الفئة المناسبة" />
                      </SelectTrigger>
                      <SelectContent className="rounded-3xl border-none shadow-2xl p-2">
                        <SelectItem value="بن" className="rounded-xl py-3 px-4 font-bold">البن والقهوة اليمنية</SelectItem>
                        <SelectItem value="عسل" className="rounded-xl py-3 px-4 font-bold">العسل الطبيعي</SelectItem>
                        <SelectItem value="حرف" className="rounded-xl py-3 px-4 font-bold">الحرف اليدوية والفضيات</SelectItem>
                        <SelectItem value="بخور" className="rounded-xl py-3 px-4 font-bold">البخور والعطور العدنية</SelectItem>
                        <SelectItem value="ملابس" className="rounded-xl py-3 px-4 font-bold">الملابس التقليدية</SelectItem>
                        <SelectItem value="أطعمة" className="rounded-xl py-3 px-4 font-bold">مأكولات بيتية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground pr-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" /> السعر (ر.ي)
                    </Label>
                    <div className="relative group">
                      <Input 
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="0.00" 
                        className="h-16 rounded-2xl bg-muted/20 border-none px-8 text-left font-bold pr-16 focus-visible:ring-2 focus-visible:ring-primary/20" 
                        dir="ltr"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-primary opacity-60 group-focus-within:opacity-100 transition-opacity">ر.ي</div>
                    </div>
                  </div>
                </div>

                {/* Stock Quantity */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" /> كمية المخزون المتاحة
                  </Label>
                  <Input 
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    placeholder="كم حبة متوفرة لديك حالياً؟" 
                    className="h-16 rounded-2xl bg-muted/20 border-none px-8 font-bold focus-visible:ring-2 focus-visible:ring-primary/20" 
                  />
                </div>

                {/* Description Textarea */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pr-3">
                    <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> وصف المنتج (القصة)
                    </Label>
                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-primary/5">اختياري</Badge>
                  </div>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="اكتب تفاصيل المنتج، مميزاته، وكيفية استخدامه بأسلوب يسحر العميل ويبرز جودة حرفتك..." 
                    className="rounded-[35px] bg-muted/20 border-none p-8 min-h-[220px] resize-none text-right leading-relaxed font-medium focus-visible:ring-2 focus-visible:ring-primary/20 shadow-inner" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card className="border-none shadow-xl shadow-black/[0.02] rounded-[45px] overflow-hidden bg-white">
            <CardHeader className="bg-muted/10 border-b p-10">
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary border border-black/[0.02]">
                    <Tag className="w-5 h-5" />
                 </div>
                 الكلمات الدلالية (Tags)
              </CardTitle>
              <CardDescription className="font-medium text-muted-foreground/70 pr-14">أضف كلمات مفتاحية تساعد العملاء في الوصول لمنتجك بسهولة</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="flex flex-wrap gap-3">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="h-12 px-6 rounded-2xl gap-3 text-sm font-bold border-none bg-primary/5 text-primary hover:bg-primary/10 transition-all hover:scale-105">
                    {tag}
                    <X className="w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity" onClick={() => setFormData({...formData, tags: formData.tags.filter((_, idx) => idx !== i)})} />
                  </Badge>
                ))}
                <div className="relative">
                  <Input 
                    placeholder="أضف تاغ جديد..." 
                    className="h-12 w-40 rounded-2xl border-2 border-dashed border-primary/20 bg-transparent text-sm font-bold text-primary focus-visible:ring-0 focus-visible:border-primary px-5"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && !formData.tags.includes(val)) {
                          setFormData({ ...formData, tags: [...formData.tags, val] });
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div className="bg-green-50/50 p-5 rounded-[25px] flex items-start gap-4 border border-green-100/50">
                 <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-green-600 shrink-0">
                    <BadgeCheck className="w-5 h-5" />
                 </div>
                 <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                   الكلمات الدلالية القوية تساعد عملائك في العثور على منتجاتك بسهولة وسرعة داخل محرك بحث "رواج" المتقدم.
                 </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons with High Impact */}
          <div className="flex flex-col sm:flex-row gap-5 pt-6 pb-12">
            <Button onClick={handleSave} className="flex-[3] h-20 rounded-[30px] bg-primary hover:bg-primary/90 text-2xl font-headline font-bold shadow-2xl shadow-primary/30 gap-4 group transition-all hover:scale-[1.02] active:scale-95">
              <Save className="w-7 h-7 group-hover:scale-110 transition-transform" /> حفظ ونشر المنتج في السوق
            </Button>
            <Button variant="ghost" onClick={() => router.push('/merchant/products')} className="flex-1 h-20 rounded-[30px] font-bold text-muted-foreground gap-3 hover:bg-destructive/5 hover:text-destructive transition-all text-lg">
              <Trash2 className="w-6 h-6" /> تجاهل المسودة
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


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
  BadgeCheck
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
  CardContent 
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { generateProductNarrative } from "@/ai/flows/generate-product-narrative"
import { suggestProductTags } from "@/ai/flows/suggest-product-tags"

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
    <div className="container mx-auto px-4 py-6 space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white border shadow-sm text-primary shrink-0 hover:bg-primary/5">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">إضافة منتج جديد</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">حول منتجاتك إلى قصص نجاح</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Media & AI Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-primary" /> صُور المنتج
            </Label>
            <div 
              className="relative aspect-square rounded-[40px] border-2 border-dashed border-primary/20 bg-white flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden hover:border-primary/40 transition-all shadow-sm"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button variant="secondary" size="sm" className="rounded-full gap-2 font-bold">
                      <Camera className="w-4 h-4" /> تغيير الصورة
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-primary/5 rounded-[30px] flex items-center justify-center text-primary shadow-inner">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div className="text-center px-6">
                    <p className="text-sm font-bold text-primary">اضغط لإضافة صور</p>
                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">ارفع صوراً واضحة لزيادة ثقة المشترين بمنتجك</p>
                  </div>
                </>
              )}
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 p-6 rounded-[32px] border border-secondary/20 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-secondary" />
              </div>
              <h3 className="font-bold text-sm text-primary">ذكاء رواج للتاجر</h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              وفر وقتك! أضف صورة واسماً للمنتج، وسنقوم بكتابة وصف جذاب واقتراح التصنيفات المناسبة لك فوراً.
            </p>
            <Button 
              onClick={handleAIAssist}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-2xl gap-2 shadow-lg shadow-primary/20"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              توليد البيانات تلقائياً
            </Button>
          </div>
        </div>

        {/* Form Details Section */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Info className="w-5 h-5 text-secondary" /> المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-primary" /> اسم المنتج التجاري
                  </Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثلاً: بن خولاني فاخر - درجة أولى" 
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5 text-primary" /> الفئة الأساسية
                    </Label>
                    <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold">
                        <SelectValue placeholder="اختر الفئة المناسبة" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl">
                        <SelectItem value="بن">البن والقهوة اليمنية</SelectItem>
                        <SelectItem value="عسل">العسل الطبيعي</SelectItem>
                        <SelectItem value="حرف">الحرف اليدوية والفضيات</SelectItem>
                        <SelectItem value="بخور">البخور والعطور العدنية</SelectItem>
                        <SelectItem value="ملابس">الملابس التقليدية</SelectItem>
                        <SelectItem value="أطعمة">مأكولات بيتية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-primary" /> السعر (ر.ي)
                    </Label>
                    <div className="relative group">
                      <Input 
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="0.00" 
                        className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-left font-bold pr-14" 
                        dir="ltr"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-primary group-focus-within:text-secondary">ر.ي</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-primary" /> كمية المخزون المتاحة
                  </Label>
                  <Input 
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    placeholder="كم حبة متوفرة لديك حالياً؟" 
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-right font-bold" 
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center pr-1">
                    <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-primary" /> وصف المنتج (القصة)
                    </Label>
                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary font-bold">اختياري</Badge>
                  </div>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="اكتب تفاصيل المنتج، مميزاته، وكيفية استخدامه لإقناع العميل..." 
                    className="rounded-[30px] bg-muted/20 border-none p-6 min-h-[160px] resize-none text-right leading-relaxed" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Tag className="w-5 h-5 text-secondary" /> الكلمات الدلالية (التصنيف الذكي)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-2.5">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="h-10 px-5 rounded-2xl gap-2 text-xs font-bold border-none bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                    {tag}
                    <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setFormData({...formData, tags: formData.tags.filter((_, idx) => idx !== i)})} />
                  </Badge>
                ))}
                <div className="relative">
                  <Input 
                    placeholder="أضف تاغ..." 
                    className="h-10 w-32 rounded-2xl border-2 border-dashed border-primary/20 bg-transparent text-xs font-bold text-primary focus-visible:ring-0 focus-visible:border-primary px-4"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
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
              <p className="text-[10px] text-muted-foreground mt-4 italic flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-green-600" /> الكلمات الدلالية تساعد العملاء في العثور على منتجاتك في محرك البحث.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex-[2] h-16 rounded-[24px] bg-primary hover:bg-primary/90 text-xl font-bold shadow-xl shadow-primary/20 gap-3 group">
              <Save className="w-6 h-6 group-hover:scale-110 transition-transform" /> حفظ ونشر المنتج
            </Button>
            <Button variant="ghost" onClick={() => router.push('/merchant/products')} className="flex-1 h-16 rounded-[24px] font-bold text-muted-foreground gap-2 hover:bg-destructive/5 hover:text-destructive transition-colors">
              <Trash2 className="w-5 h-5" /> إلغاء
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

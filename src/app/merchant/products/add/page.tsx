
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
  Trash2
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
        description: "يرجى كتابة اسم المنتج وإضافة صورة أولاً لاستخدام الذكاء الاصطناعي.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      // 1. Suggest Tags & Category
      const tagsResult = await suggestProductTags({
        productDescription: formData.name,
        productImage: image
      })

      // 2. Generate Narrative
      const narrativeResult = await generateProductNarrative({
        productName: formData.name,
        productDescription: formData.description || formData.name,
        category: formData.category || tagsResult.suggestedCategories[0],
        photoDataUri: image
      })

      setFormData({
        ...formData,
        category: tagsResult.suggestedCategories[0] || formData.category,
        tags: tagsResult.suggestedTags,
        narrative: narrativeResult.narrativeBody,
        description: narrativeResult.narrativeBody // Use narrative as main description too
      })

      toast({ title: "تم توليد بيانات المنتج بذكاء رواج!" })
    } catch (error) {
      toast({ title: "خطأ في مساعد الذكاء الاصطناعي", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    toast({ title: "تمت إضافة المنتج بنجاح!" })
    router.push('/merchant/products')
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white border shadow-sm text-primary shrink-0">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-headline font-bold text-primary">إضافة منتج جديد</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        {/* Media Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">صورة المنتج</Label>
            <div 
              className="relative aspect-square rounded-[32px] border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" className="rounded-full gap-2">
                      <Camera className="w-4 h-4" /> تغيير الصورة
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-primary">اضغط لإضافة صورة</p>
                    <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG حتى 5MB</p>
                  </div>
                </>
              )}
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="bg-secondary/10 p-5 rounded-3xl border border-secondary/20 space-y-3">
            <h3 className="font-bold text-xs text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" /> مساعد الذكاء الاصطناعي
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              أضف صورة واسماً للمنتج، وسيقوم ذكاء رواج بكتابة وصف جذاب واقتراح التصنيفات المناسبة لك فوراً.
            </p>
            <Button 
              onClick={handleAIAssist}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-2xl gap-2 shadow-sm"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              توليد البيانات تلقائياً
            </Button>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Info className="w-4 h-4 text-secondary" /> المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1">اسم المنتج</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="مثلاً: بن خولاني فاخر - درجة أولى" 
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1">الفئة</Label>
                    <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none px-6">
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="بن">البن والقهوة</SelectItem>
                        <SelectItem value="عسل">العسل الطبيعي</SelectItem>
                        <SelectItem value="حرف">الحرف اليدوية</SelectItem>
                        <SelectItem value="بخور">بخور وعطور</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1">السعر (ر.ي)</Label>
                    <Input 
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00" 
                      className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-left" 
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1">كمية المخزون المتاحة</Label>
                  <Input 
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    placeholder="مثلاً: 50" 
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-left" 
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1">وصف المنتج</Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="اكتب تفاصيل المنتج، مميزاته، وكيفية استخدامه..." 
                    className="rounded-2xl bg-muted/20 border-none p-6 min-h-[120px] resize-none" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Tag className="w-4 h-4 text-secondary" /> التصنيفات والكلمات الدلالية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="h-9 px-4 rounded-full gap-2 text-xs font-bold border-none bg-primary/5 text-primary">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setFormData({...formData, tags: formData.tags.filter((_, idx) => idx !== i)})} />
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-9 rounded-full border-2 border-dashed border-primary/20 text-primary gap-1 px-4 font-bold">
                  <Plus className="w-4 h-4" /> إضافة تاغ
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20 gap-2">
              <Save className="w-5 h-5" /> حفظ ونشر المنتج
            </Button>
            <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold text-muted-foreground gap-2">
              <Trash2 className="w-5 h-5" /> تجاهل
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client';

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowRight, 
  Camera, 
  Sparkles, 
  Loader2, 
  Save, 
  Trash2,
  Type,
  LayoutGrid,
  DollarSign,
  Package,
  FileText,
  BadgeCheck,
  Tag,
  X,
  Info,
  History
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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [image, setImage] = useState<string | null>("https://picsum.photos/seed/p1/600/600")
  
  const [formData, setFormData] = useState({
    name: "بن خولاني فاخر - درجة أولى",
    category: "بن",
    price: "4500",
    stock: "45",
    description: "أجود أنواع البن اليمني من جبال خولان، تم انتقاء الحبات يدوياً وتحميصها بعناية فائقة لتصلكم بنكهتها الأصيلة.",
    tags: ["بن خولاني", "قهوة يمنية", "درجة أولى", "محمص"],
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
    if (!formData.name || !image) return;
    setIsGenerating(true)
    try {
      const tagsResult = await suggestProductTags({
        productDescription: formData.name,
        productImage: image
      })
      const narrativeResult = await generateProductNarrative({
        productName: formData.name,
        productDescription: formData.description || formData.name,
        category: formData.category,
        photoDataUri: image
      })
      setFormData({
        ...formData,
        tags: [...new Set([...formData.tags, ...tagsResult.suggestedTags])].slice(0, 8),
        description: narrativeResult.narrativeBody
      })
      toast({ title: "تم تحديث وصف المنتج بلمسة ذكاء!" })
    } catch (error) {
      toast({ title: "فشل مساعد الذكاء الاصطناعي", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUpdate = () => {
    toast({ title: "تم تحديث بيانات المنتج بنجاح" })
    router.push('/merchant/products')
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white border shadow-sm text-primary shrink-0 hover:bg-primary/5">
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">تعديل المنتج #{id}</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <History className="w-3 h-3" /> آخر تحديث: قبل 3 أيام
            </p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl border-destructive/20 text-destructive font-bold gap-2 hover:bg-destructive/5 hidden md:flex">
          <Trash2 className="w-4 h-4" /> حذف المنتج
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-primary" /> صُورة المنتج الحالية
            </Label>
            <div 
              className="relative aspect-square rounded-[40px] border-2 border-primary/10 bg-white flex flex-col items-center justify-center group cursor-pointer overflow-hidden shadow-sm"
              onClick={() => document.getElementById('image-edit')?.click()}
            >
              {image && <img src={image} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Button variant="secondary" size="sm" className="rounded-full gap-2 font-bold shadow-lg">
                  <Camera className="w-4 h-4" /> استبدال الصورة
                </Button>
              </div>
              <input id="image-edit" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-[32px] border border-primary/10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-secondary" />
              <h3 className="font-bold text-sm text-primary">تحسين الوصف بالذكاء</h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              هل تريد صياغة جديدة وأكثر جذباً لهذا المنتج؟ اترك المهمة لذكاء رواج.
            </p>
            <Button 
              onClick={handleAIAssist}
              disabled={isGenerating}
              variant="outline"
              className="w-full border-primary/20 text-primary font-bold h-12 rounded-2xl gap-2 hover:bg-primary/5 transition-all"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              تحديث الوصف تلقائياً
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Info className="w-5 h-5 text-secondary" /> البيانات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-primary" /> اسم المنتج
                  </Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5 text-primary" /> التصنيف
                    </Label>
                    <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl">
                        <SelectItem value="بن">البن والقهوة اليمنية</SelectItem>
                        <SelectItem value="عسل">العسل الطبيعي</SelectItem>
                        <SelectItem value="حرف">الحرف اليدوية والفضيات</SelectItem>
                        <SelectItem value="بخور">البخور والعطور العدنية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-primary" /> السعر الحالي
                    </Label>
                    <div className="relative group">
                      <Input 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-left font-bold pr-14" 
                        dir="ltr"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-primary">ر.ي</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-primary" /> كمية المخزون المتاحة
                  </Label>
                  <Input 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 text-right font-bold" 
                  />
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-primary" /> وصف المنتج
                  </Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="rounded-[30px] bg-muted/20 border-none p-6 min-h-[160px] resize-none text-right leading-relaxed font-medium" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <Tag className="w-5 h-5 text-secondary" /> الكلمات الدلالية
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-2.5">
                {formData.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="h-10 px-5 rounded-2xl gap-2 text-xs font-bold border-none bg-primary/5 text-primary">
                    {tag}
                    <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setFormData({...formData, tags: formData.tags.filter((_, idx) => idx !== i)})} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleUpdate} className="flex-[2] h-16 rounded-[24px] bg-primary hover:bg-primary/90 text-xl font-bold shadow-xl shadow-primary/20 gap-3">
              <Save className="w-6 h-6" /> حفظ التعديلات
            </Button>
            <Button variant="ghost" onClick={() => router.push('/merchant/products')} className="flex-1 h-16 rounded-[24px] font-bold text-muted-foreground gap-2">
              إلغاء التغييرات
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

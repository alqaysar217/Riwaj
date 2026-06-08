
'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Store, 
  MapPin, 
  ShoppingBag, 
  Camera, 
  ChevronLeft, 
  Sparkles, 
  Loader2, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon,
  Upload,
  Check
} from "lucide-react"
import { generateStoreDescription } from "@/ai/flows/generate-store-description"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function MerchantOnboarding() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [docType, setDocType] = useState<'id' | 'passport'>('id')
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    offerings: "",
    description: ""
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleGenerateDescription = async () => {
    if (!formData.type || !formData.location || !formData.offerings) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى تعبئة نوع النشاط والموقع والمنتجات أولاً.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateStoreDescription({
        businessType: formData.type,
        location: formData.location,
        keyOfferings: formData.offerings
      })
      setFormData({ ...formData, description: result.description })
      toast({ title: "تم توليد الوصف بنجاح بنبض رواج!" })
    } catch (error) {
      toast({ title: "خطأ في توليد الوصف", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFinish = () => {
    toast({ title: "تم إرسال بياناتك للمراجعة بنجاح" })
    router.push('/merchant/dashboard')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-headline font-bold text-primary">توثيق المتجر</h1>
            <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">خطوة {step} من 3</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step/3)*100}%` }} />
          </div>
        </div>

        {/* Step 1: Basic Store Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-primary" /> اسم المتجر
                </Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="مثلاً: محامص الجبال" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-primary" /> نوع النشاط التجاري
                </Label>
                <Input 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  placeholder="مثلاً: محمصة بن، منحل عسل، حرف يدوية" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> الموقع الرئيسي
                </Label>
                <Input 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="مثلاً: صنعاء، حضرموت، عدن" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" /> أهم المنتجات
                </Label>
                <Input 
                  value={formData.offerings}
                  onChange={(e) => setFormData({...formData, offerings: e.target.value})}
                  placeholder="بن مطري، عسل سدر، بخور عدني..." 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                />
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold gap-2 shadow-lg shadow-primary/20">
              التالي <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 2: Identity Verification (New) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" /> توثيق الهوية
              </h2>
              <p className="text-xs text-muted-foreground">نحتاج لتوثيق هويتك لضمان أمان المعاملات في رواج</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setDocType('id')}
                className={cn(
                  "p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2",
                  docType === 'id' ? "border-primary bg-primary/5" : "border-muted"
                )}
              >
                <FileText className={cn("w-6 h-6", docType === 'id' ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs font-bold">بطاقة شخصية</span>
              </div>
              <div 
                onClick={() => setDocType('passport')}
                className={cn(
                  "p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2",
                  docType === 'passport' ? "border-primary bg-primary/5" : "border-muted"
                )}
              >
                <ImageIcon className={cn("w-6 h-6", docType === 'passport' ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs font-bold">جواز سفر</span>
              </div>
            </div>

            <div className="space-y-4">
              {docType === 'id' ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground">صورة البطاقة (الوجه الأمامي)</Label>
                    <div className="h-32 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-[10px] font-bold text-muted-foreground">اضغط لرفع الصورة</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground">صورة البطاقة (الوجه الخلفي)</Label>
                    <div className="h-32 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-[10px] font-bold text-muted-foreground">اضغط لرفع الصورة</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">صورة صفحة البيانات في الجواز</Label>
                  <div className="h-48 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-[10px] font-bold text-muted-foreground">اضغط لرفع صورة واضحة</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="ghost" onClick={() => setStep(1)} className="flex-1 h-12 rounded-2xl font-bold">السابق</Button>
              <Button onClick={() => setStep(3)} className="flex-[2] h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">حفظ ومتابعة</Button>
            </div>
          </div>
        )}

        {/* Step 3: Description & Branding */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
              <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-dashed border-primary/20 flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-lg border-4 border-white overflow-hidden">
                    <Camera className="w-8 h-8 opacity-20" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-primary">شعار المتجر أو صورة شخصية</p>
                  <p className="text-[10px] text-muted-foreground">سيظهر هذا في بروفايل المتجر</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center pr-1">
                  <Label className="text-xs font-bold text-muted-foreground">قصة المتجر (الوصف)</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="text-[10px] font-bold text-primary h-7 gap-1 hover:bg-primary/5"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    ذكاء رواج
                  </Button>
                </div>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="أخبر العملاء عن قصتك وجودة منتجاتك..." 
                  className="rounded-2xl bg-muted/30 border-none p-6 min-h-[150px] resize-none" 
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(2)} className="flex-1 h-12 rounded-2xl font-bold">السابق</Button>
              <Button onClick={handleFinish} className="flex-[2] h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20 gap-2">
                إطلاق المتجر <Check className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

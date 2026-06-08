
'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, MapPin, ShoppingBag, Camera, ChevronLeft, Sparkles, Loader2 } from "lucide-react"
import { generateStoreDescription } from "@/ai/flows/generate-store-description"
import { useToast } from "@/hooks/use-toast"

export default function MerchantOnboarding() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
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
    router.push('/merchant/dashboard')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-headline font-bold text-primary">إنشاء متجرك</h1>
            <span className="text-xs font-bold text-muted-foreground">خطوة {step} من 2</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step/2)*100}%` }} />
          </div>
        </div>

        {step === 1 ? (
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
            </div>
            <Button onClick={() => setStep(2)} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold gap-2 shadow-lg shadow-primary/20">
              التالي <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" /> أهم المنتجات التي ستقدمها
                </Label>
                <Input 
                  value={formData.offerings}
                  onChange={(e) => setFormData({...formData, offerings: e.target.value})}
                  placeholder="بن مطري، عسل سدر، بخور عدني..." 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pr-1">
                  <Label className="text-xs font-bold text-muted-foreground">نبذة عن المتجر</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="text-[10px] font-bold text-primary h-7 gap-1 hover:bg-primary/5"
                  >
                    {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    توليد وصف بالذكاء الاصطناعي
                  </Button>
                </div>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="أخبر العملاء عن قصتك وجودة منتجاتك..." 
                  className="rounded-2xl bg-muted/30 border-none p-6 min-h-[150px] resize-none" 
                />
              </div>

              <div className="bg-primary/5 p-4 rounded-2xl border border-dashed border-primary/20 flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-bold text-primary">أضف شعار المتجر (اختياري)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(1)} className="flex-1 h-12 rounded-2xl font-bold">السابق</Button>
              <Button onClick={handleFinish} className="flex-[2] h-12 rounded-2xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">إطلاق المتجر</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

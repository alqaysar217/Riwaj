
'use client';

import { useState } from "react"
import { 
  Store, 
  Camera, 
  Upload, 
  MapPin, 
  ShoppingBag, 
  MessageCircle, 
  Globe, 
  Instagram, 
  Facebook,
  Save,
  CheckCircle2,
  Trash2,
  Twitter,
  Link as LinkIcon,
  Phone,
  Mail,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function MerchantStoreProfile() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "محامص الجبال",
    category: "البن والقهوة",
    location: "صنعاء، حي حدة",
    description: "نحن في محامص الجبال نفخر بتقديم أجود أنواع البن اليمني الأصيل، نعتني بكل حبة بن من المزرعة وحتى محمصة القهوة لنضمن لكم نكهة لا تنسى تجسد تراث اليمن العريق.",
    phone: "775258830",
    email: "store@jibal.com",
    website: "www.jibal-coffee.ye",
    instagram: "@jibal_coffee",
    facebook: "jibal.coffee.yemen"
  })

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-24 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">بروفايل المتجر</h1>
          <p className="text-muted-foreground text-sm mt-1">تحكم في هوية متجرك البصرية وكيف يراك العملاء في رواج</p>
        </div>
        <Button onClick={() => toast({ title: "تم الحفظ بنجاح!" })} className="rounded-2xl h-14 bg-primary hover:bg-primary/90 gap-2 px-10 shadow-lg shadow-primary/20 text-lg font-bold">
          <Save className="w-5 h-5" /> حفظ التغييرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Media & Branding Section */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-xl rounded-[40px] overflow-hidden bg-white">
            <div className="relative h-44 bg-muted group">
               <Image src="/logo-stores-ditales-1.png" alt="Banner" fill className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                  <Button variant="secondary" size="sm" className="rounded-full gap-2 font-bold shadow-xl">
                    <Camera className="w-4 h-4" /> تغيير الغلاف
                  </Button>
               </div>
            </div>
            <CardContent className="relative pt-16 pb-10 px-8 text-center">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                <div className="relative w-28 h-28 rounded-[35px] overflow-hidden border-4 border-white shadow-2xl bg-white group rotate-3 hover:rotate-0 transition-transform duration-500">
                   <Image src="/logo-stores-1.png" alt="Avatar" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 text-white" />
                   </div>
                </div>
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-1">{formData.name}</h3>
              <div className="flex items-center justify-center gap-1.5 text-secondary font-bold mb-6">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-[0.2em]">{formData.category}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                 <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground">الموقع</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground">إنستقرام</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground">فيسبوك</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[35px] bg-gradient-to-br from-primary to-primary/90 text-white p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-5">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <CheckCircle2 className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-none">متجر موثق</h4>
                    <p className="text-[10px] text-white/70 mt-1 uppercase tracking-widest font-bold">Verified Gold Store</p>
                  </div>
               </div>
               <p className="text-white/80 text-xs leading-relaxed">أنت الآن ضمن قائمة المتاجر الأكثر موثوقية في اليمن. يحصل عملاؤك على ضمان استرجاع الأموال تلقائياً عند الشراء منك.</p>
               <Button variant="secondary" className="w-full rounded-xl h-12 font-bold text-xs bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10">
                  عرض تفاصيل التوثيق
               </Button>
            </div>
          </Card>
        </div>

        {/* Form Fields Section */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
            <CardHeader className="bg-muted/20 border-b p-8">
              <CardTitle className="text-xl font-headline font-bold text-primary flex items-center gap-3">
                <Store className="w-6 h-6 text-secondary" /> المعلومات العامة والقصة
              </CardTitle>
              <CardDescription className="text-xs">اكتب قصة متجرك بأسلوب يجذب العملاء ويبرز جودة منتجاتك</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-primary" /> اسم المتجر الرسمي
                  </Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold text-lg focus-visible:ring-primary/20" 
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" /> المقر الرئيسي
                  </Label>
                  <Input 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/20 border-none px-6 font-bold focus-visible:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-primary" /> قصة المتجر (عنا)
                </Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="rounded-[35px] bg-muted/20 border-none p-8 min-h-[180px] resize-none text-right leading-relaxed font-medium focus-visible:ring-primary/20 shadow-inner" 
                />
                <p className="text-[10px] text-muted-foreground mr-4 italic">هذا النص سيظهر في صفحة "حول المتجر" للعملاء.</p>
              </div>

              <Separator className="bg-muted" />

              <div className="space-y-6">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-secondary" /> بيانات التواصل والروابط
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary" /> رقم الواتساب (للعملاء)
                    </Label>
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 rounded-xl bg-muted/20 border-none px-5 font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-primary" /> البريد الإلكتروني العام
                    </Label>
                    <Input 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 rounded-xl bg-muted/20 border-none px-5 font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Instagram className="w-3.5 h-3.5 text-primary" /> حساب الإنستقرام
                    </Label>
                    <Input 
                      value={formData.instagram} 
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      placeholder="@username"
                      className="h-12 rounded-xl bg-muted/20 border-none px-5 font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5 text-primary" /> الموقع الإلكتروني
                    </Label>
                    <Input 
                      value={formData.website} 
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="www.yourstore.com"
                      className="h-12 rounded-xl bg-muted/20 border-none px-5 font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 items-center">
             <Button onClick={() => toast({ title: "تم الحفظ بنجاح!" })} className="flex-[3] h-16 rounded-[25px] bg-primary hover:bg-primary/90 text-white font-bold text-xl gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-100">
                <Save className="w-6 h-6" /> حفظ ونشر كافة التعديلات
             </Button>
             <Button variant="ghost" className="flex-1 h-16 rounded-[25px] font-bold text-destructive hover:bg-destructive/5 px-8 gap-2 border border-transparent hover:border-destructive/20 transition-all">
                <Trash2 className="w-5 h-5" /> حذف المتجر
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


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
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function MerchantStoreProfile() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "محامص الجبال",
    category: "البن والقهوة",
    location: "صنعاء، حي حدة",
    description: "نحن في محامص الجبال نفخر بتقديم أجود أنواع البن اليمني الأصيل، نعتني بكل حبة بن من المزرعة وحتى محمصة القهوة لنضمن لكم نكهة لا تنسى تجسد تراث اليمن العريق.",
    phone: "775258830",
    email: "store@jibal.com"
  })

  const handleSave = () => {
    toast({
      title: "تم الحفظ!",
      description: "تم تحديث بيانات المتجر بنجاح.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">بروفايل المتجر</h1>
          <p className="text-muted-foreground text-sm mt-1">تحكم في مظهر متجرك أمام العملاء</p>
        </div>
        <Button onClick={handleSave} className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20">
          <Save className="w-5 h-5" /> حفظ التغييرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Media & Branding Section */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <div className="relative h-40 bg-muted group">
               <Image src="https://picsum.photos/seed/b1/600/300" alt="Banner" fill className="object-cover opacity-80" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="secondary" size="sm" className="rounded-full gap-2">
                    <Camera className="w-4 h-4" /> تغيير الغلاف
                  </Button>
               </div>
            </div>
            <CardContent className="relative pt-12 pb-8 px-6 text-center">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-white group">
                   <Image src="https://picsum.photos/seed/s1/200/200" alt="Avatar" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-5 h-5 text-white" />
                   </div>
                </div>
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-1">{formData.name}</h3>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{formData.category}</p>
              
              <div className="mt-6 flex justify-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer border border-primary/10 shadow-sm">
                    <Globe className="w-4 h-4" />
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer border border-primary/10 shadow-sm">
                    <Instagram className="w-4 h-4" />
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer border border-primary/10 shadow-sm">
                    <Facebook className="w-4 h-4" />
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[32px] bg-primary text-white p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  <h4 className="font-bold">متجر موثق بالكامل</h4>
               </div>
               <p className="text-white/70 text-xs leading-relaxed">تم التحقق من هويتك وبياناتك التجارية. أنت الآن ضمن قائمة التجار الموثوقين في رواج.</p>
               <Button variant="secondary" className="w-full rounded-xl h-12 font-bold text-xs bg-white/10 border-white/20 text-white hover:bg-white/20">
                  عرض الوثائق المقدمة
               </Button>
            </div>
          </Card>
        </div>

        {/* Form Fields Section */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                <Store className="w-5 h-5 text-secondary" /> المعلومات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">اسم المتجر</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">الموقع الرئيسي</Label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="h-14 rounded-2xl bg-muted/30 border-none pr-11 font-bold" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground mr-1">عن المتجر (القصة)</Label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="rounded-[32px] bg-muted/30 border-none p-6 min-h-[150px] resize-none text-right leading-relaxed" 
                />
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">رقم الهاتف للتواصل</Label>
                  <Input 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold text-left" 
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">البريد الإلكتروني</Label>
                  <Input 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold text-left" 
                    dir="ltr"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
             <Button onClick={handleSave} className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg gap-2 shadow-lg shadow-primary/20">
                <Save className="w-5 h-5" /> حفظ كافة التعديلات
             </Button>
             <Button variant="ghost" className="h-14 rounded-2xl font-bold text-destructive hover:bg-destructive/5 px-8">
                <Trash2 className="w-5 h-5" /> حذف المتجر
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

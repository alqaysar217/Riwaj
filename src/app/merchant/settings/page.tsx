'use client';

import { useState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Save, 
  Trash2,
  ChevronLeft,
  Settings,
  Eye,
  EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function MerchantSettings() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "أحمد علي محمد",
    email: "ahmed.merchant@riwaj.ye",
    phone: "775258830",
  })

  const handleSave = () => {
    toast({
      title: "تم تحديث الإعدادات",
      description: "تم حفظ التغييرات في حسابك بنجاح.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">إعدادات الحساب</h1>
          <p className="text-muted-foreground text-sm mt-1">إدارة بياناتك الشخصية وأمان حساب التاجر</p>
        </div>
        <Button onClick={handleSave} className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20 font-bold">
          <Save className="w-5 h-5" /> حفظ كافة الإعدادات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Info Card */}
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                <User className="w-5 h-5 text-secondary" /> البيانات الأساسية
              </CardTitle>
              <CardDescription>هذه البيانات خاصة بك كصاحب متجر</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">الاسم الكامل</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-14 rounded-2xl bg-muted/30 border-none pr-11 font-bold text-left" 
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-foreground mr-1">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input 
                    value={formData.email} 
                    disabled
                    className="h-14 rounded-2xl bg-muted/20 border-none pr-11 font-bold text-left opacity-60 cursor-not-allowed" 
                    dir="ltr"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground pr-1 italic">تواصل مع الإدارة لتغيير البريد الإلكتروني المسجل</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                <Lock className="w-5 h-5 text-secondary" /> كلمة المرور والأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground mr-1">كلمة المرور الحالية</Label>
                  <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-muted/30 border-none px-6" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground mr-1">كلمة المرور الجديدة</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        className="h-14 rounded-2xl bg-muted/30 border-none px-6" 
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground mr-1">تأكيد كلمة المرور</Label>
                    <Input type="password" className="h-14 rounded-2xl bg-muted/30 border-none px-6" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl border-primary/20 text-primary font-bold">تحديث كلمة المرور</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Notifications Preferences */}
          <Card className="border-none shadow-sm rounded-[32px] p-8 space-y-6">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Bell className="w-5 h-5 text-secondary" /> التنبيهات
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">طلبات جديدة</p>
                  <p className="text-[10px] text-muted-foreground">تنبيه عند وصول طلب جديد</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">رسائل العملاء</p>
                  <p className="text-[10px] text-muted-foreground">تنبيه عند استلام رسالة دردشة</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold">تحديثات النظام</p>
                  <p className="text-[10px] text-muted-foreground">أخبار ومميزات منصة رواج</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Account Status Card */}
          <Card className="border-none shadow-sm rounded-[32px] bg-primary text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-secondary" />
                <h4 className="font-bold">حالة الحساب</h4>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] text-white/70 uppercase font-bold tracking-widest mb-1">نوع الحساب</p>
                <p className="font-bold text-lg">تاجر موثق (Premium)</p>
              </div>
              <p className="text-[10px] text-white/60 leading-relaxed">أنت الآن تستمتع بكافة مميزات رواج للتجار. ينتهي الاشتراك في 24 ديسمبر 2024.</p>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-none shadow-sm rounded-[32px] border-destructive/20 p-8 space-y-4">
            <h3 className="font-bold text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> منطقة الخطر
            </h3>
            <p className="text-[10px] text-muted-foreground leading-relaxed">عند حذف حساب التاجر سيتم إيقاف متجرك وكافة منتجاتك بشكل نهائي من المنصة.</p>
            <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/5 font-bold h-12 rounded-xl text-xs">
              طلب إغلاق الحساب نهائياً
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

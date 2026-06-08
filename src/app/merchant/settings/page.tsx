
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
  EyeOff,
  BadgeCheck,
  Smartphone,
  ShieldCheck,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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
      description: "تم حفظ كافة التغييرات في حسابك بنجاح.",
    })
  }

  return (
    <div className="min-h-full bg-muted/40 p-6 md:p-10 space-y-10 pb-28">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/50 p-8 rounded-[35px] border border-white/20 backdrop-blur-sm shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Settings className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-headline font-bold text-primary">إعدادات الحساب</h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pr-1">إدارة بياناتك الشخصية وخصوصية حسابك كتاجر في رواج</p>
        </div>
        <Button onClick={handleSave} className="rounded-2xl h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-3 px-10 font-bold transition-all hover:scale-[1.02] active:scale-95">
          <Save className="w-5 h-5" /> حفظ كافة الإعدادات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Info Card */}
          <Card className="border-none shadow-xl shadow-black/[0.03] rounded-[40px] overflow-hidden bg-white">
            <CardHeader className="bg-muted/20 border-b p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[18px] bg-white shadow-sm flex items-center justify-center text-secondary border border-black/[0.02]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">البيانات الأساسية</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground/70">المعلومات الشخصية التي تظهر في فواتيرك ومستنداتك</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                    الاسم الكامل للتاجر
                  </Label>
                  <div className="relative group">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-14 rounded-2xl bg-muted/20 border-none pr-12 font-bold focus-visible:ring-2 focus-visible:ring-primary/20" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                    رقم الهاتف الموثق
                  </Label>
                  <div className="relative group">
                    <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-14 rounded-2xl bg-muted/20 border-none pr-12 font-bold text-left focus-visible:ring-2 focus-visible:ring-primary/20" 
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground pr-2">البريد الإلكتروني المسجل</Label>
                <div className="relative group opacity-80">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <Input 
                    value={formData.email} 
                    disabled
                    className="h-14 rounded-2xl bg-muted/10 border border-black/[0.05] pr-12 font-bold text-left cursor-not-allowed" 
                    dir="ltr"
                  />
                </div>
                <div className="flex items-center gap-2 pr-2">
                   <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
                   <p className="text-[11px] text-muted-foreground italic font-medium">البريد الإلكتروني مرتبط بحسابك الأساسي ولا يمكن تغييره يدوياً.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-none shadow-xl shadow-black/[0.03] rounded-[40px] overflow-hidden bg-white">
            <CardHeader className="bg-muted/20 border-b p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[18px] bg-white shadow-sm flex items-center justify-center text-secondary border border-black/[0.02]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">كلمة المرور والأمان</CardTitle>
                  <CardDescription className="font-bold text-muted-foreground/70">قم بتحديث كلمة المرور بانتظام لحماية متجرك وأموالك</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2">كلمة المرور الحالية</Label>
                  <div className="relative group">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-muted/20 border-none pr-12 focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground pr-2">كلمة المرور الجديدة</Label>
                    <div className="relative group">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="h-14 rounded-2xl bg-muted/20 border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/20" 
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-muted-foreground pr-2">تأكيد كلمة المرور</Label>
                    <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-muted/20 border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/20" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-[18px] h-12 border-primary/20 text-primary font-bold px-8 hover:bg-primary/5 transition-all">
                تحديث كلمة المرور
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Notifications Preferences */}
          <Card className="border-none shadow-xl shadow-black/[0.03] rounded-[40px] p-10 space-y-8 bg-white">
            <h3 className="font-bold text-primary flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                 <Bell className="w-5 h-5" />
              </div>
              تفضيلات التنبيهات
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">طلبات جديدة</p>
                  <p className="text-[11px] text-muted-foreground font-medium">تنبيه فوري عند وصول طلب جديد</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-muted/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">رسائل العملاء</p>
                  <p className="text-[11px] text-muted-foreground font-medium">تنبيه عند استلام رسالة دردشة</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-muted/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">تقارير المبيعات</p>
                  <p className="text-[11px] text-muted-foreground font-medium">ملخص أسبوعي لأداء متجرك</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Account Status Card */}
          <Card className="border-none shadow-2xl shadow-primary/10 rounded-[45px] bg-gradient-to-br from-primary via-primary to-[#0D5F59] text-white p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-1000 group-hover:scale-150" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full -ml-12 -mb-12 blur-2xl" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:rotate-6 transition-transform">
                  <Shield className="w-7 h-7 text-secondary" />
                </div>
                <h4 className="font-headline font-bold text-xl">حالة الحساب</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 p-5 rounded-[25px] border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] text-white/70 uppercase font-bold tracking-[0.15em] mb-1.5">نوع العضوية</p>
                  <div className="flex items-center justify-between">
                     <p className="font-bold text-xl">تاجر موثق (ذهبي)</p>
                     <BadgeCheck className="w-6 h-6 text-secondary fill-secondary/20" />
                  </div>
                </div>
                
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                  أنت تستمتع بكافة مميزات رواج للتجار. ينتهي اشتراكك الحالي في <span className="text-white font-bold">24 ديسمبر 2024</span>.
                </p>
                
                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-2xl h-14 shadow-xl">
                   تجديد الاشتراك
                </Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-none shadow-xl shadow-black/[0.03] rounded-[40px] bg-red-50/30 border border-red-100/50 p-10 space-y-6">
            <h3 className="font-bold text-red-600 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                 <AlertTriangle className="w-5 h-5" />
              </div>
              منطقة الخطر
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              عند طلب إغلاق الحساب، سيتم إخفاء متجرك ومنتجاتك من المنصة نهائياً. يرجى الحذر، هذا الإجراء لا يمكن التراجع عنه بسهولة.
            </p>
            <Button variant="ghost" className="w-full text-red-600 hover:bg-red-100/50 font-bold h-14 rounded-2xl text-xs gap-2 border border-red-100">
              <Trash2 className="w-4 h-4" /> طلب إغلاق الحساب نهائياً
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

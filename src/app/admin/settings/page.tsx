
'use client';

import { useState } from "react"
import { 
  Settings, 
  Save, 
  Globe, 
  ShieldCheck, 
  DollarSign, 
  Mail, 
  Bell, 
  Database, 
  Lock, 
  Smartphone,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  RefreshCcw,
  Percent
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات النظام بنجاح وتطبيقها فوراً.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">إعدادات النظام</h1>
          <p className="text-muted-foreground text-sm font-medium">التحكم المركزي في هوية وسياسات منصة رواج</p>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/10 text-base font-bold transition-all"
        >
          {isSaving ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6" dir="rtl">
        <TabsList className="bg-white p-1 rounded-xl h-14 border shadow-sm w-full md:w-auto flex overflow-x-auto no-scrollbar justify-start">
          <TabsTrigger value="general" className="rounded-lg px-6 font-bold text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Globe className="w-4 h-4" /> الإعدادات العامة
          </TabsTrigger>
          <TabsTrigger value="financial" className="rounded-lg px-6 font-bold text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <DollarSign className="w-4 h-4" /> الإعدادات المالية
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6 font-bold text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <ShieldCheck className="w-4 h-4" /> الأمان والخصوصية
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg px-6 font-bold text-xs gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Bell className="w-4 h-4" /> التنبيهات والبريد
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-none shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-base font-bold text-primary">بيانات المنصة</CardTitle>
                <CardDescription>المعلومات التي تظهر للمستخدمين ومحركات البحث</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">اسم المتجر / المنصة</Label>
                  <Input defaultValue="رواج - سوق المنتجات اليمنية" className="h-12 rounded-lg bg-muted/20 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">وصف المنصة (SEO)</Label>
                  <Textarea 
                    defaultValue="رواج هي المنصة الأولى المتخصصة في تسويق وبيع المنتجات اليمنية الأصيلة من بن وعسل وحرف يدوية."
                    className="rounded-lg bg-muted/20 border-none min-h-[100px] resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground">البريد الإلكتروني للدعم</Label>
                    <Input defaultValue="support@riwaj.ye" className="h-12 rounded-lg bg-muted/20 border-none font-bold" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground">رقم الهاتف الرسمي</Label>
                    <Input defaultValue="+967 775258830" className="h-12 rounded-lg bg-muted/20 border-none font-bold" dir="ltr" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-base font-bold text-primary">حالة النظام</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-bold">وضع الصيانة</p>
                    <p className="text-[10px] text-muted-foreground">إغلاق الموقع مؤقتاً للتحديثات</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-bold">تسجيل التجار الجدد</p>
                    <p className="text-[10px] text-muted-foreground">السماح بإنشاء حسابات تجار</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-bold">المراجعة اليدوية للمنتجات</p>
                    <p className="text-[10px] text-muted-foreground">تحقق من كل منتج قبل نشره</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-6">
          <Card className="border-none shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-base font-bold text-primary">السياسات المالية والعمولات</CardTitle>
              <CardDescription>تحديد نسب الأرباح وحدود السحب</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-primary" /> عمولة المبيعات (%)
                  </Label>
                  <Input type="number" defaultValue="10" className="h-12 rounded-lg bg-muted/20 border-none font-bold" />
                  <p className="text-[10px] text-muted-foreground italic">يتم خصمها تلقائياً من كل عملية بيع.</p>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-primary" /> الحد الأدنى للسحب (ر.ي)
                  </Label>
                  <Input type="number" defaultValue="50000" className="h-12 rounded-lg bg-muted/20 border-none font-bold" />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <RefreshCcw className="w-3.5 h-3.5 text-primary" /> رسوم شحن موحدة (ر.ي)
                  </Label>
                  <Input type="number" defaultValue="1000" className="h-12 rounded-lg bg-muted/20 border-none font-bold" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-base font-bold text-primary">حماية البيانات</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground">مفتاح تشفير API</Label>
                  <div className="relative">
                    <Input value="sk_live_51P72X..." readOnly className="h-12 rounded-lg bg-muted/20 border-none font-mono text-xs pl-20" dir="ltr" />
                    <Button variant="ghost" className="absolute left-1 top-1.5 h-10 rounded-md text-[10px] font-bold">تغيير</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-dashed rounded-lg border-primary/20">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary flex items-center gap-2">
                      <Database className="w-4 h-4" /> النسخ الاحتياطي التلقائي
                    </p>
                    <p className="text-[10px] text-muted-foreground">يتم أخذ نسخة كل 24 ساعة</p>
                  </div>
                  <Button size="sm" className="rounded-lg h-9 font-bold">نسخة الآن</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-red-50/20 border border-red-100">
              <CardHeader className="bg-red-50/50 border-b border-red-100">
                <CardTitle className="text-base font-bold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> إجراءات حساسة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full h-12 rounded-lg border-red-200 text-red-600 hover:bg-red-50 font-bold gap-2">
                  <RefreshCcw className="w-4 h-4" /> إعادة تعيين كافة الفهارس
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-lg border-red-200 text-red-600 hover:bg-red-50 font-bold gap-2">
                  <Lock className="w-4 h-4" /> إغلاق كافة جلسات المدير
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

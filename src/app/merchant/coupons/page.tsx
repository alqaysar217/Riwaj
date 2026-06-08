
'use client';

import { useState, useMemo } from "react"
import { 
  Ticket, 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit2, 
  Tag,
  Copy,
  Info,
  X,
  Zap,
  Percent,
  DollarSign,
  Users,
  Save,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const INITIAL_COUPONS = [
  { id: 1, code: "COFFEE20", discount: "20", type: "percentage", status: "active", usage: 45, limit: 100, expiry: "2024-06-30" },
  { id: 2, code: "WELCOME5", discount: "5000", type: "fixed", status: "active", usage: 12, limit: 50, expiry: "2024-12-31" },
  { id: 3, code: "EXPIRED10", discount: "10", type: "percentage", status: "expired", usage: 100, limit: 100, expiry: "2024-05-01" },
]

export default function MerchantCoupons() {
  const { toast } = useToast()
  const [coupons, setCoupons] = useState(INITIAL_COUPONS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    limit: "",
    expiry: ""
  })

  const filteredCoupons = useMemo(() => {
    return coupons.filter(c => 
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, coupons])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ title: "تم النسخ!", description: `كود الخصم ${code} جاهز للمشاركة.` })
  }

  const handleOpenAdd = () => {
    setEditingCoupon(null)
    setFormData({ code: "", discount: "", type: "percentage", limit: "", expiry: "" })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (coupon: any) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      limit: coupon.limit.toString(),
      expiry: coupon.expiry
    })
    setIsDialogOpen(true)
  }

  const handleSaveCoupon = () => {
    if (!formData.code || !formData.discount || !formData.expiry) {
      toast({ title: "بيانات ناقصة", description: "يرجى إكمال كافة الحقول المطلوبة.", variant: "destructive" })
      return
    }

    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? { 
        ...c, 
        ...formData, 
        usage: c.usage, 
        limit: parseInt(formData.limit) || 100,
        status: new Date(formData.expiry) < new Date() ? 'expired' : 'active'
      } : c))
      toast({ title: "تم التحديث", description: "تم تعديل الكوبون بنجاح." })
    } else {
      const newCoupon = {
        id: Date.now(),
        ...formData,
        usage: 0,
        limit: parseInt(formData.limit) || 100,
        status: new Date(formData.expiry) < new Date() ? 'expired' : 'active'
      }
      setCoupons([newCoupon, ...coupons])
      toast({ title: "تمت الإضافة", description: "تم إنشاء الكوبون الجديد بنجاح." })
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number) => {
    setCoupons(coupons.filter(c => c.id !== id))
    toast({ title: "تم الحذف", description: "تم إزالة الكوبون نهائياً." })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">إدارة الكوبونات</h1>
          <p className="text-muted-foreground text-sm mt-1">أنشئ عروض خصم لزيادة مبيعات متجرك وجذب عملاء جدد</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenAdd} className="rounded-2xl h-14 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20 text-lg font-bold">
              <Plus className="w-5 h-5" /> إضافة كوبون جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[32px] sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-4 [&>button]:right-auto">
            <DialogHeader className="p-8 bg-muted/30 border-b">
              <DialogTitle className="text-xl font-headline font-bold text-primary text-right flex items-center gap-2">
                <Ticket className="w-6 h-6 text-secondary" />
                {editingCoupon ? 'تعديل الكوبون' : 'إنشاء كوبون جديد'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary" /> كود الخصم (باللاتينية)
                  </Label>
                  <Input 
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    placeholder="مثلاً: EID2024" 
                    className="h-12 rounded-xl bg-muted/20 border-none px-4 font-bold uppercase" 
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-primary" /> نوع الخصم
                    </Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                      <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="percentage">نسبة مئوية (%)</SelectItem>
                        <SelectItem value="fixed">مبلغ ثابت (ر.ي)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      {formData.type === 'percentage' ? <Percent className="w-3.5 h-3.5 text-primary" /> : <DollarSign className="w-3.5 h-3.5 text-primary" />} 
                      قيمة الخصم
                    </Label>
                    <Input 
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({...formData, discount: e.target.value})}
                      placeholder="0" 
                      className="h-12 rounded-xl bg-muted/20 border-none px-4 font-bold" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-primary" /> حد الاستخدام
                    </Label>
                    <Input 
                      type="number"
                      value={formData.limit}
                      onChange={(e) => setFormData({...formData, limit: e.target.value})}
                      placeholder="100" 
                      className="h-12 rounded-xl bg-muted/20 border-none px-4 font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" /> تاريخ الانتهاء
                    </Label>
                    <Input 
                      type="date"
                      value={formData.expiry}
                      onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                      className="h-12 rounded-xl bg-muted/20 border-none px-4 font-bold" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveCoupon} className="flex-[2] h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-2">
                  <Save className="w-4 h-4" /> {editingCoupon ? 'حفظ التعديلات' : 'إطلاق الكوبون'}
                </Button>
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="flex-1 h-12 rounded-xl font-bold text-muted-foreground">إلغاء</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث بكود الخصم..." 
            className="h-12 pr-11 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <Card key={coupon.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all border border-transparent hover:border-primary/10 relative">
              <CardContent className="p-0">
                <div className={cn(
                  "p-8 flex flex-col items-center justify-center relative overflow-hidden",
                  coupon.status === 'active' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {/* Visual Coupon Cuts */}
                  <div className="absolute top-1/2 -left-4 w-8 h-8 bg-background rounded-full -translate-y-1/2 border-r shadow-inner" />
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-background rounded-full -translate-y-1/2 border-l shadow-inner" />
                  
                  <div className="text-center space-y-2 relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">قيمة الخصم</p>
                    <h2 className="text-4xl font-headline font-bold">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `${parseInt(coupon.discount).toLocaleString()} ر.ي`}
                    </h2>
                    <div className="flex items-center justify-center gap-1.5 opacity-60">
                       <Zap className="w-3 h-3 fill-current" />
                       <span className="text-[9px] font-bold">عرض حصري</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div 
                      className="bg-muted/30 px-5 py-2.5 rounded-2xl border border-dashed border-primary/20 flex items-center gap-3 cursor-pointer hover:bg-primary/5 transition-all group/code"
                      onClick={() => copyCode(coupon.code)}
                    >
                      <span className="font-bold text-base text-primary tracking-widest">{coupon.code}</span>
                      <Copy className="w-4 h-4 text-muted-foreground group-hover/code:text-primary transition-colors" />
                    </div>
                    <Badge className={cn(
                      "text-[9px] font-bold px-3 py-1 rounded-lg border-none",
                      coupon.status === 'active' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    )}>
                      {coupon.status === 'active' ? 'نشط' : 'منتهي'}
                    </Badge>
                  </div>

                  <div className="space-y-3 pt-2">
                     <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> الاستخدام: {coupon.usage}/{coupon.limit}
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> انتهاء: {coupon.expiry}
                        </span>
                     </div>
                     <div className="w-full h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={cn("h-full transition-all duration-1000", coupon.status === 'active' ? "bg-primary" : "bg-muted-foreground/30")} 
                          style={{ width: `${(coupon.usage/coupon.limit)*100}%` }} 
                        />
                     </div>
                  </div>

                  <div className="flex gap-3 pt-2 border-t border-dashed">
                     <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 h-11 rounded-xl gap-2 font-bold text-primary hover:bg-primary/5"
                      onClick={() => handleOpenEdit(coupon)}
                    >
                        <Edit2 className="w-4 h-4" /> تعديل
                     </Button>
                     <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 h-11 rounded-xl gap-2 font-bold text-destructive hover:bg-destructive/5"
                      onClick={() => handleDelete(coupon.id)}
                    >
                        <Trash2 className="w-4 h-4" /> حذف
                     </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-muted/20 rounded-[40px] border border-dashed border-primary/20">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Ticket className="w-10 h-10 text-primary opacity-20" />
             </div>
             <h3 className="font-bold text-lg text-primary">لم يتم العثور على كوبونات</h3>
             <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو أضف كوبوناً جديداً</p>
          </div>
        )}
      </div>

      {/* Pro Tip - Professional Design */}
      <div className="bg-secondary/10 p-8 rounded-[32px] border border-secondary/20 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right">
         <div className="w-16 h-16 rounded-[24px] bg-white shadow-xl flex items-center justify-center text-secondary shrink-0 rotate-3">
            <Zap className="w-8 h-8 fill-secondary" />
         </div>
         <div className="space-y-2">
            <h4 className="font-bold text-lg text-primary">نصيحة "رواج" لزيادة أرباحك:</h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              الكوبونات ذات <span className="text-primary font-bold">الخصم المئوي</span> (مثل 15%) تزيد من وتيرة الشراء بشكل ملحوظ، بينما الكوبونات ذات <span className="text-secondary font-bold">القيمة الثابتة</span> (مثل 5,000 ر.ي) ترفع من متوسط قيمة السلة الشرائية. ننصحك بالتنويع بينهما حسب المناسبات!
            </p>
         </div>
      </div>
    </div>
  )
}

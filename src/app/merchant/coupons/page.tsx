
'use client';

import { useState } from "react"
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
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const COUPONS = [
  { id: 1, code: "COFFEE20", discount: "20%", type: "percentage", status: "active", usage: "45/100", expiry: "2024-06-30" },
  { id: 2, code: "WELCOME5", discount: "5,000 ر.ي", type: "fixed", status: "active", usage: "12/50", expiry: "2024-12-31" },
  { id: 3, code: "EXPIRED10", discount: "10%", type: "percentage", status: "expired", usage: "100/100", expiry: "2024-05-01" },
]

export default function MerchantCoupons() {
  const { toast } = useToast()
  
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ title: "تم النسخ!", description: `كود الخصم ${code} جاهز للمشاركة.` })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">الكوبونات</h1>
          <p className="text-muted-foreground text-sm mt-1">أنشئ عروض خصم لزيادة مبيعات متجرك</p>
        </div>
        <Button className="rounded-2xl h-14 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20 text-lg font-bold">
          <Plus className="w-5 h-5" /> إضافة كوبون جديد
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="بحث عن كود..." className="h-12 pr-10 rounded-2xl bg-white border-none shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COUPONS.map((coupon) => (
          <Card key={coupon.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all border border-transparent hover:border-primary/10">
            <CardContent className="p-0">
              <div className={cn(
                "p-6 flex flex-col items-center justify-center relative overflow-hidden",
                coupon.status === 'active' ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}>
                {/* Coupon Cut Design */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background rounded-full -translate-y-1/2 border shadow-inner" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background rounded-full -translate-y-1/2 border shadow-inner" />
                
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">قيمة الخصم</p>
                  <h2 className="text-3xl font-headline font-bold">{coupon.discount}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="bg-muted/30 px-4 py-2 rounded-xl border border-dashed border-primary/20 flex items-center gap-2 cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => copyCode(coupon.code)}
                  >
                    <span className="font-bold text-sm text-primary tracking-wider">{coupon.code}</span>
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <Badge className={cn(
                    "text-[8px] font-bold px-3 py-1",
                    coupon.status === 'active' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}>
                    {coupon.status === 'active' ? 'نشط' : 'منتهي'}
                  </Badge>
                </div>

                <div className="space-y-2 pt-2">
                   <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> المستخدم: {coupon.usage}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> انتهاء: {coupon.expiry}
                      </span>
                   </div>
                   <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(parseInt(coupon.usage.split('/')[0])/parseInt(coupon.usage.split('/')[1]))*100}%` }} />
                   </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-dashed">
                   <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl gap-2 font-bold text-primary hover:bg-primary/5">
                      <Edit2 className="w-3.5 h-3.5" /> تعديل
                   </Button>
                   <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl gap-2 font-bold text-destructive hover:bg-destructive/5">
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="bg-secondary/10 p-6 rounded-3xl border border-secondary/20 flex gap-4 items-start">
         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary shrink-0">
            <Info className="w-6 h-6" />
         </div>
         <div className="space-y-1">
            <h4 className="font-bold text-sm text-primary">نصيحة رواج للتجار:</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              الكوبونات ذات الخصم المئوي (مثل 15%) تزيد من عدد مرات الشراء، بينما الكوبونات ذات القيمة الثابتة (مثل 5,000 ر.ي) تزيد من متوسط قيمة السلة الشرائية.
            </p>
         </div>
      </div>
    </div>
  )
}

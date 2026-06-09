
'use client';

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { 
  ArrowRight, 
  Package, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Truck, 
  AlertCircle,
  MessageSquare,
  ChevronLeft,
  FileText,
  DollarSign,
  Loader2,
  MoreVertical,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// مكتبة الطلبات التجريبية للتاجر
const MERCHANT_ORDERS_DB: Record<string, any> = {
  "RW-9021": {
    id: "RW-9021",
    customer: "أحمد علي محمد",
    date: "24 مايو 2024، 10:30 ص",
    status: "pending",
    total: "14,500 ر.ي",
    payment: "الدفع عند الاستلام (COD)",
    address: "صنعاء، حي حدة، شارع الخمسين، خلف فندق برج العرب",
    phone: "775258830",
    items: [
      { id: 1, name: "بن خولاني فاخر - درجة أولى", price: "4,500 ر.ي", qty: 2, total: "9,000 ر.ي", img: "/products-1.png" },
      { id: 2, name: "عسل سدر ملكي - عصيمي", price: "5,500 ر.ي", qty: 1, total: "5,500 ر.ي", img: "/products-2.png" },
    ]
  },
  "RW-9020": {
    id: "RW-9020",
    customer: "سارة محمد",
    date: "24 مايو 2024، 11:15 ص",
    status: "processing",
    total: "6,000 ر.ي",
    payment: "محفظة رواج",
    address: "حضرموت، المكلا، حي السلام",
    phone: "770000000",
    items: [
      { id: 3, name: "بخور عدني فاخر", price: "6,000 ر.ي", qty: 1, total: "6,000 ر.ي", img: "/products-3.png" },
    ]
  },
  "RW-9018": {
    id: "RW-9018",
    customer: "خالد بن الوليد",
    date: "23 مايو 2024، 09:00 م",
    status: "shipped",
    total: "22,000 ر.ي",
    payment: "تحويل بنكي (الكريمي)",
    address: "عدن، المعلا، الشارع الرئيسي",
    phone: "771111111",
    items: [
      { id: 4, name: "عسل سدر ملكي", price: "12,000 ر.ي", qty: 1, total: "12,000 ر.ي", img: "/products-2.png" },
      { id: 5, name: "بن مطري محمص", price: "5,000 ر.ي", qty: 2, total: "10,000 ر.ي", img: "/products-1.png" },
    ]
  }
}

export default function MerchantOrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { toast } = useToast()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // محاكاة جلب البيانات
    const timer = setTimeout(() => {
      const foundOrder = MERCHANT_ORDERS_DB[id] || MERCHANT_ORDERS_DB["RW-9021"]
      setOrder(foundOrder)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [id])

  const handleStatusChange = (val: string) => {
    setOrder({ ...order, status: val })
    toast({ 
      title: "تم تحديث الحالة", 
      description: `تم تغيير حالة الطلب رقم ${id} بنجاح.` 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-bold text-muted-foreground">جاري فتح سجل الطلب...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="rounded-full bg-white border shadow-sm text-primary">
            <Link href="/merchant/orders"><ArrowRight className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">تفاصيل طلب #{id}</h1>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm">
           <span className="text-xs font-bold text-muted-foreground mr-2">تحديث الحالة:</span>
           <Select value={order.status} onValueChange={handleStatusChange}>
             <SelectTrigger className="w-40 h-10 rounded-xl bg-primary/5 border-none font-bold text-xs text-primary">
               <SelectValue />
             </SelectTrigger>
             <SelectContent className="rounded-xl">
               <SelectItem value="pending">جديد (انتظار)</SelectItem>
               <SelectItem value="processing">جاري التجهيز</SelectItem>
               <SelectItem value="shipped">تم الشحن</SelectItem>
               <SelectItem value="completed">تم التوصيل</SelectItem>
               <SelectItem value="cancelled">ملغي</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Items Table */}
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
             <CardHeader className="bg-muted/10 border-b p-6">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-primary flex items-center gap-2">
                      <Package className="w-5 h-5 text-secondary" /> المنتجات المطلوبة
                   </h3>
                   <Badge className="bg-primary text-white font-bold">{order.items.length} قطع</Badge>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/5">
                    <TableRow>
                      <TableHead className="text-right font-bold text-[10px] py-4 pr-6 uppercase tracking-wider">المنتج</TableHead>
                      <TableHead className="text-center font-bold text-[10px] uppercase tracking-wider">الكمية</TableHead>
                      <TableHead className="text-center font-bold text-[10px] uppercase tracking-wider">السعر</TableHead>
                      <TableHead className="text-left font-bold text-[10px] pl-6 uppercase tracking-wider">الإجمالي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <TableRow key={item.id} className="hover:bg-muted/5 border-none">
                        <TableCell className="py-4 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border bg-muted shadow-inner shrink-0">
                              <Image src={item.img} alt="" fill className="object-cover" />
                            </div>
                            <span className="font-bold text-xs max-w-[200px] line-clamp-2">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-xs">{item.qty}</TableCell>
                        <TableCell className="text-center text-xs opacity-60">{item.price}</TableCell>
                        <TableCell className="text-left font-bold text-primary text-xs pl-6">{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </CardContent>
          </Card>

          {/* Customer Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="border-none shadow-sm rounded-3xl p-6 space-y-4 bg-white">
                <h3 className="font-bold text-primary flex items-center gap-2">
                   <User className="w-5 h-5 text-secondary" /> بيانات العميل
                </h3>
                <div className="bg-muted/20 p-4 rounded-2xl space-y-3 border border-dashed border-primary/10">
                   <div className="flex justify-between items-center">
                      <p className="font-bold text-sm">{order.customer}</p>
                      <div className="flex gap-1">
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white shadow-sm text-primary hover:bg-primary/5">
                            <Phone className="w-4 h-4" />
                         </Button>
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white shadow-sm text-primary hover:bg-primary/5">
                            <MessageSquare className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                   <p className="text-[11px] text-muted-foreground flex items-center gap-2 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {order.address}
                   </p>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-primary">
                      <Phone className="w-3 h-3" /> <span dir="ltr">{order.phone}</span>
                   </div>
                </div>
             </Card>

             <Card className="border-none shadow-sm rounded-3xl p-6 space-y-4 bg-white">
                <h3 className="font-bold text-primary flex items-center gap-2">
                   <DollarSign className="w-5 h-5 text-secondary" /> ملخص الدفع
                </h3>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold items-center">
                      <span className="text-muted-foreground">وسيلة الدفع:</span>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 font-bold px-3 py-1 rounded-lg">
                        {order.payment}
                      </Badge>
                   </div>
                   <div className="pt-4 mt-2 border-t border-dashed">
                      <div className="flex justify-between text-sm font-bold text-muted-foreground mb-1">
                        <span>المجموع الفرعي:</span>
                        <span>{order.total}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-primary">الإجمالي النهائي:</span>
                        <span className="text-primary">{order.total}</span>
                      </div>
                   </div>
                </div>
             </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-sm rounded-[32px] p-8 bg-primary text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              
              <h3 className="text-xl font-headline font-bold flex items-center gap-3 relative z-10">
                 <Truck className="w-6 h-6 text-secondary" /> إجراءات الشحن
              </h3>
              
              <div className="space-y-4 relative z-10">
                 <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex gap-4 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                       <FileText className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="font-bold text-sm mb-0.5">بوليصة الشحن</p>
                       <p className="text-[10px] text-white/60 leading-tight">اطبع بوليصة الشحن وأرفقها مع الطرد قبل تسليمه للمندوب.</p>
                    </div>
                 </div>
                 
                 <Button className="w-full bg-white text-primary hover:bg-white/90 h-14 rounded-2xl font-bold gap-2 shadow-xl shadow-black/10 transition-all active:scale-95">
                    <FileText className="w-5 h-5" /> طباعة البوليصة (PDF)
                 </Button>
                 
                 <Button variant="ghost" className="w-full border border-white/20 hover:bg-white/10 h-14 rounded-2xl font-bold gap-2 text-white">
                    <MessageSquare className="w-4 h-4" /> تواصل مع المندوب
                 </Button>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-secondary/20 border border-secondary/20 flex gap-3 relative z-10">
                 <Clock className="w-4 h-4 text-secondary shrink-0" />
                 <p className="text-[9px] font-bold text-white/90">يتوقع مندوب التوصيل استلام الطرد خلال ٤ ساعات من الآن.</p>
              </div>
           </Card>

           <Card className="border-none shadow-sm rounded-[32px] p-8 space-y-4 bg-white">
              <h3 className="font-bold text-primary flex items-center gap-2">
                 <AlertCircle className="w-5 h-5 text-secondary" /> ملاحظات داخلية
              </h3>
              <Textarea 
                placeholder="أضف ملاحظات سرية لك ولفريقك حول هذا الطلب..." 
                className="rounded-2xl bg-muted/20 border-none p-4 min-h-[120px] resize-none text-[11px] font-medium focus-visible:ring-1 focus-visible:ring-primary/20" 
              />
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 h-12 rounded-2xl font-bold text-xs transition-colors">
                 حفظ الملاحظة السرية
              </Button>
           </Card>
        </div>
      </div>
    </div>
  )
}

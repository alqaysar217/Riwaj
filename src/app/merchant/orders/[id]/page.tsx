
'use client';

import { use } from "react"
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
  DollarSign
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

export default function MerchantOrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { toast } = useToast()

  const handleStatusChange = (val: string) => {
    toast({ title: "تم تحديث الحالة", description: `تم تغيير حالة الطلب بنجاح.` })
  }

  const order = {
    id: id,
    customer: "أحمد علي محمد",
    date: "24 مايو 2024، 10:30 ص",
    status: "processing",
    total: "14,500 ر.ي",
    payment: "الدفع عند الاستلام (COD)",
    address: "صنعاء، حي حدة، شارع الخمسين، خلف فندق برج العرب",
    phone: "775258830",
    items: [
      { id: 1, name: "بن خولاني فاخر - درجة أولى", price: "4,500 ر.ي", qty: 2, total: "9,000 ر.ي", img: "https://picsum.photos/seed/p1/100/100" },
      { id: 2, name: "عسل سدر ملكي - عصيمي", price: "5,500 ر.ي", qty: 1, total: "5,500 ر.ي", img: "https://picsum.photos/seed/p2/100/100" },
    ]
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
           <Select defaultValue={order.status} onValueChange={handleStatusChange}>
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
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
             <CardHeader className="bg-muted/30 border-b p-6">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-primary flex items-center gap-2">
                      <Package className="w-5 h-5 text-secondary" /> المنتجات المطلوبة
                   </h3>
                   <Badge className="bg-primary text-white font-bold">{order.items.length} قطع</Badge>
                </div>
             </CardHeader>
             <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/10">
                    <TableRow>
                      <TableHead className="text-right font-bold text-[10px] py-4 pr-6">المنتج</TableHead>
                      <TableHead className="text-center font-bold text-[10px]">الكمية</TableHead>
                      <TableHead className="text-center font-bold text-[10px]">السعر</TableHead>
                      <TableHead className="text-left font-bold text-[10px] pl-6">الإجمالي</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/5 border-none">
                        <TableCell className="py-4 pr-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border bg-muted">
                              <Image src={item.img} alt="" fill className="object-cover" />
                            </div>
                            <span className="font-bold text-xs max-w-[150px] line-clamp-2">{item.name}</span>
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
             <Card className="border-none shadow-sm rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                   <User className="w-5 h-5 text-secondary" /> بيانات العميل
                </h3>
                <div className="bg-muted/20 p-4 rounded-2xl space-y-3">
                   <div className="flex justify-between items-center">
                      <p className="text-xs font-bold">{order.customer}</p>
                      <div className="flex gap-1">
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white shadow-sm text-primary">
                            <Phone className="w-4 h-4" />
                         </Button>
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white shadow-sm text-primary">
                            <MessageSquare className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                   <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> {order.address}
                   </p>
                </div>
             </Card>

             <Card className="border-none shadow-sm rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                   <DollarSign className="w-5 h-5 text-secondary" /> ملخص الدفع
                </h3>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">وسيلة الدفع:</span>
                      <span className="text-primary">{order.payment}</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold border-t border-dashed pt-2 mt-2">
                      <span className="text-primary">الإجمالي:</span>
                      <span className="text-primary">{order.total}</span>
                   </div>
                </div>
             </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-sm rounded-[32px] p-8 bg-primary text-white space-y-6">
              <h3 className="text-xl font-headline font-bold flex items-center gap-3">
                 <Truck className="w-6 h-6 text-secondary" /> إجراءات الشحن
              </h3>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                       <FileText className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="font-bold text-sm mb-0.5">بوليصة الشحن</p>
                       <p className="text-[10px] text-white/60">اطبع بوليصة الشحن وأرفقها مع الطرد قبل تسليمه للمندوب.</p>
                    </div>
                 </div>
                 <Button className="w-full bg-white text-primary hover:bg-white/90 h-14 rounded-2xl font-bold gap-2 shadow-xl shadow-black/10">
                    طباعة البوليصة
                 </Button>
                 <Button variant="ghost" className="w-full border border-white/20 hover:bg-white/10 h-14 rounded-2xl font-bold gap-2 text-white">
                    تواصل مع مندوب التوصيل
                 </Button>
              </div>
           </Card>

           <Card className="border-none shadow-sm rounded-[32px] p-8 space-y-4">
              <h3 className="font-bold text-primary flex items-center gap-2">
                 <AlertCircle className="w-5 h-5 text-secondary" /> ملاحظات داخلية
              </h3>
              <Textarea 
                placeholder="أضف ملاحظات سرية لك ولفريقك حول هذا الطلب..." 
                className="rounded-2xl bg-muted/20 border-none p-4 min-h-[100px] resize-none text-[11px]" 
              />
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 h-10 rounded-xl font-bold text-xs">
                 حفظ الملاحظة
              </Button>
           </Card>
        </div>
      </div>
    </div>
  )
}

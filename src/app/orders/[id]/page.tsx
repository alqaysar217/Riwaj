
"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowRight, 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Copy,
  MessageCircle,
  Phone,
  Calendar,
  Wallet,
  Receipt
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { toast } = useToast()

  // Mock data for the specific order
  const order = {
    id: id,
    date: "24 مايو 2024",
    status: "ongoing", // ongoing, delivered, shipped
    items: [
      { id: "1", title: "بن خولاني فاخر - درجة أولى", price: 4500, quantity: 2, image: "/products-1.png" },
      { id: "2", title: "عسل سدر ملكي - عصيمي", price: 12000, quantity: 1, image: "/products-2.png" },
    ],
    paymentMethod: "accounts", // cod, wallet, accounts
    selectedBank: { name: "بنك الكريمي", account: "1234567", owner: "مؤسسة رواج التجارية" },
    address: { title: "المنزل", details: "صنعاء، حي حدة، شارع الخمسين بجوار فندق برج العرب", phone: "775258830" },
    subtotal: 21000,
    shipping: 1000,
    total: 22000,
    note: "يرجى تغليف العسل جيداً لضمان عدم التسرب."
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "تم النسخ!",
      description: `تم نسخ رقم الحساب ${text} إلى الحافظة.`,
    })
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Action */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild className="rounded-full bg-white border shadow-sm text-primary">
                <Link href="/orders">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-headline font-bold text-primary">تفاصيل الطلب</h1>
            </div>
            <Badge className={order.status === 'ongoing' ? 'bg-secondary text-white' : 'bg-green-600 text-white'}>
              {order.status === 'ongoing' ? 'قيد التجهيز' : 'تم التوصيل'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              
              {/* Order Info Bar */}
              <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-wrap justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold">رقم الطلب</p>
                    <p className="text-sm font-bold">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold">تاريخ الطلب</p>
                    <p className="text-sm font-bold">{order.date}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white p-6 rounded-3xl border shadow-sm">
                <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> حالة الشحن والتوصيل
                </h3>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 right-4 w-0.5 bg-muted" />
                  <div className="space-y-8 relative">
                    <div className="flex items-start gap-4 mr-1">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white relative z-10 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">تم استلام الطلب بنجاح</p>
                        <p className="text-xs text-muted-foreground">{order.date} - 10:30 صباحاً</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mr-1">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white relative z-10 shrink-0 animate-pulse">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-secondary">جاري تجهيز المنتجات في المخازن</p>
                        <p className="text-xs text-muted-foreground">توقع الشحن خلال 24 ساعة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mr-1 opacity-30">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground relative z-10 shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">في الطريق إليك مع مندوب التوصيل</p>
                        <p className="text-xs text-muted-foreground">لم يتم بعد</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Table - Matching Cart Style */}
              <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/20 border-b">
                  <h3 className="font-bold text-sm">المنتجات المطلوبة</h3>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <Table className="min-w-[400px] md:min-w-full">
                    <TableHeader className="bg-muted/10">
                      <TableRow>
                        <TableHead className="text-right font-bold text-primary px-4 py-3 text-[10px] md:text-xs">المنتج</TableHead>
                        <TableHead className="text-center font-bold text-primary px-2 py-3 text-[10px] md:text-xs">الكمية</TableHead>
                        <TableHead className="text-center font-bold text-primary px-2 py-3 text-[10px] md:text-xs">السعر</TableHead>
                        <TableHead className="text-center font-bold text-primary px-4 py-3 text-[10px] md:text-xs">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/5">
                          <TableCell className="text-right px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden border shrink-0 hidden md:block">
                                <Image src={item.image || "/products-1.png"} alt={item.title} fill className="object-cover" />
                              </div>
                              <span className="font-bold text-[10px] md:text-sm leading-tight block max-w-[150px] md:max-w-none break-words">
                                {item.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-bold text-[10px] md:text-xs px-2">{item.quantity}</TableCell>
                          <TableCell className="text-center text-[9px] md:text-xs whitespace-nowrap px-2">
                            {item.price} <span className="text-[8px] opacity-60">ر.ي</span>
                          </TableCell>
                          <TableCell className="text-center font-bold text-primary text-[10px] md:text-sm whitespace-nowrap px-4">
                            {item.price * item.quantity} <span className="text-[8px] opacity-60">ر.ي</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Delivery Address & Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" /> عنوان التوصيل
                  </h3>
                  <div className="bg-muted/10 p-4 rounded-2xl border border-dashed">
                    <p className="font-bold text-xs mb-1">{order.address.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{order.address.details}</p>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold" dir="ltr">{order.address.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-secondary" /> ملاحظاتك
                  </h3>
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/5 h-full">
                    <p className="text-[11px] text-primary/80 leading-relaxed italic">
                      "{order.note || "لا توجد ملاحظات إضافية لهذا الطلب"}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary */}
              <div className="bg-white p-6 rounded-3xl border shadow-sm sticky top-24">
                <h2 className="font-bold text-lg mb-6 text-primary border-b pb-4">ملخص الفاتورة</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">المجموع الفرعي</span>
                    <span className="font-bold">{order.subtotal} ر.ي</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">رسوم التوصيل</span>
                    <span className="font-bold text-green-600">{order.shipping} ر.ي</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-base text-primary">الإجمالي الكلي</span>
                    <span className="font-bold text-primary text-xl">{order.total} ر.ي</span>
                  </div>
                </div>

                {/* Payment Detail Section */}
                <div className="space-y-4 pt-4 border-t border-dashed">
                  <h3 className="font-bold text-xs text-muted-foreground flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5" /> وسيلة الدفع
                  </h3>
                  
                  {order.paymentMethod === 'accounts' && (
                    <div className="space-y-4">
                      <div className="bg-secondary/5 p-3 rounded-xl border border-secondary/20 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-secondary shadow-sm shrink-0">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-secondary mb-0.5">تم اختيار التحويل البنكي</p>
                          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => copyToClipboard(order.selectedBank.account)}>
                            <p className="text-xs font-bold" dir="ltr">{order.selectedBank.account}</p>
                            <Copy className="w-2.5 h-2.5 text-muted-foreground" />
                          </div>
                          <p className="text-[9px] text-muted-foreground truncate">{order.selectedBank.name}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-xl border border-green-100 flex gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <p className="text-[9px] text-green-800 leading-tight">
                          يرجى إرسال السند للرقم <span className="font-bold" dir="ltr">775258830</span> لتأكيد الطلب.
                        </p>
                      </div>
                    </div>
                  )}

                  {order.paymentMethod === 'cod' && (
                    <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                        <Truck className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold">الدفع عند الاستلام</p>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5 h-12 rounded-2xl font-bold gap-2">
                    <MessageCircle className="w-4 h-4" /> تواصل مع الدعم الفني
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}


'use client';

import { useState } from "react"
import Link from "next/link"
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ChevronLeft,
  Calendar,
  AlertCircle,
  MoreVertical,
  User,
  Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const ORDERS = [
  { id: "RW-9021", date: "منذ 10 دقائق", total: "14,500 ر.ي", status: "pending", customer: "أحمد علي", itemsCount: 3, payment: "cod" },
  { id: "RW-9020", date: "منذ ساعة", total: "6,000 ر.ي", status: "processing", customer: "سارة محمد", itemsCount: 1, payment: "wallet" },
  { id: "RW-9018", date: "أمس", total: "22,000 ر.ي", status: "shipped", customer: "خالد بن الوليد", itemsCount: 2, payment: "bank" },
  { id: "RW-9015", date: "قبل يومين", total: "8,500 ر.ي", status: "completed", customer: "منى عبد الرحمن", itemsCount: 4, payment: "cod" },
]

export default function MerchantOrders() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">إدارة الطلبات</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">متابعة طلبات عملائك</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <ShoppingBag className="w-6 h-6" />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث برقم الطلب..." 
            className="h-12 pr-10 rounded-2xl bg-white border-none shadow-sm"
          />
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm">
          <Filter className="w-5 h-5 text-primary" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" dir="rtl" onValueChange={setActiveTab}>
        <TabsList className="bg-primary/5 p-1 rounded-2xl h-14 border border-primary/10 w-full mb-6">
          <TabsTrigger value="all" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">الكل</TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">جديدة</TabsTrigger>
          <TabsTrigger value="processing" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">تجهيز</TabsTrigger>
          <TabsTrigger value="shipped" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs">شحن</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {ORDERS.filter(o => activeTab === 'all' || o.status === activeTab).map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-[32px] border border-transparent shadow-sm hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    order.status === 'pending' ? "bg-orange-50 text-orange-600" : 
                    order.status === 'processing' ? "bg-blue-50 text-blue-600" : 
                    order.status === 'shipped' ? "bg-purple-50 text-purple-600" : "bg-green-50 text-green-600"
                  )}>
                    {order.status === 'pending' ? <AlertCircle className="w-6 h-6" /> : 
                     order.status === 'processing' ? <Clock className="w-6 h-6" /> : 
                     order.status === 'shipped' ? <Truck className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">طلب #{order.id}</h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
                      <Calendar className="w-3 h-3" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 p-4 rounded-2xl mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <User className="w-3.5 h-3.5 text-primary" />
                    {order.customer}
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-primary rounded-full bg-primary/5">
                    <Phone className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-muted-foreground mb-0.5 font-bold uppercase tracking-wider">الإجمالي</p>
                  <p className="font-bold text-lg text-primary">{order.total}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="rounded-xl h-10 px-4 font-bold border-primary/20 text-primary">
                    <Link href={`/merchant/orders/${order.id}`}>التفاصيل</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

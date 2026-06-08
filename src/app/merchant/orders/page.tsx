
'use client';

import { useState, useMemo } from "react"
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
  Phone,
  X,
  CreditCard,
  Wallet,
  Receipt
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const ORDERS = [
  { id: "RW-9021", date: "منذ 10 دقائق", total: "14,500 ر.ي", status: "pending", customer: "أحمد علي", itemsCount: 3, payment: "cod" },
  { id: "RW-9020", date: "منذ ساعة", total: "6,000 ر.ي", status: "processing", customer: "سارة محمد", itemsCount: 1, payment: "wallet" },
  { id: "RW-9018", date: "أمس", total: "22,000 ر.ي", status: "shipped", customer: "خالد بن الوليد", itemsCount: 2, payment: "bank" },
  { id: "RW-9015", date: "قبل يومين", total: "8,500 ر.ي", status: "completed", customer: "منى عبد الرحمن", itemsCount: 4, payment: "cod" },
  { id: "RW-8999", date: "قبل 3 أيام", total: "12,000 ر.ي", status: "completed", customer: "صالح جابر", itemsCount: 2, payment: "cod" },
]

export default function MerchantOrders() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = useMemo(() => {
    return ORDERS.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeTab === "all" || order.status === activeTab;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, activeTab]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'انتظار', color: 'bg-orange-50 text-orange-600', icon: AlertCircle };
      case 'processing':
        return { label: 'تجهيز', color: 'bg-blue-50 text-blue-600', icon: Clock };
      case 'shipped':
        return { label: 'شحن', color: 'bg-purple-50 text-purple-600', icon: Truck };
      case 'completed':
        return { label: 'مكتمل', color: 'bg-green-50 text-green-600', icon: CheckCircle2 };
      default:
        return { label: 'غير معروف', color: 'bg-muted text-muted-foreground', icon: AlertCircle };
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border shadow-sm">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">إدارة الطلبات</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">لديك {ORDERS.filter(o => o.status === 'pending').length} طلبات جديدة بانتظارك</p>
        </div>
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
          <ShoppingBag className="w-7 h-7" />
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث برقم الطلب أو اسم العميل..." 
            className="h-12 pr-11 pl-10 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button variant="outline" className="h-12 rounded-2xl bg-white border-none shadow-sm font-bold text-primary gap-2 px-6">
          <Filter className="w-4 h-4" /> تصفية متقدمة
        </Button>
      </div>

      {/* Tabs Control */}
      <Tabs defaultValue="all" className="w-full" dir="rtl" onValueChange={setActiveTab}>
        <TabsList className="bg-primary/5 p-1 rounded-2xl h-14 border border-primary/10 w-full mb-8 shadow-inner">
          <TabsTrigger value="all" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs gap-2">
            الكل <Badge variant="outline" className="h-5 px-1 border-white/20 text-[10px]">{ORDERS.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs gap-2">
            جديدة <Badge variant="secondary" className="h-5 px-1 text-[10px]">{ORDERS.filter(o => o.status === 'pending').length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs gap-2">
            تجهيز
          </TabsTrigger>
          <TabsTrigger value="shipped" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-xs gap-2">
            شحن
          </TabsTrigger>
        </TabsList>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="bg-white p-5 rounded-[32px] border border-transparent shadow-sm hover:border-primary/20 hover:shadow-md transition-all group relative overflow-hidden">
                  {/* Status Side Indicator */}
                  <div className={cn("absolute top-0 right-0 w-1.5 h-full", status.color.split(' ')[1].replace('text', 'bg'))} />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                        status.color
                      )}>
                        <StatusIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base">طلب #{order.id}</h3>
                          <Badge className={cn("text-[9px] font-bold px-2 py-0.5 border-none", status.color)}>
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground text-[10px] font-bold">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Receipt className="w-3 h-3" />
                            <span>{order.itemsCount} منتجات</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="bg-muted/30 px-4 py-2 rounded-2xl flex items-center gap-3 min-w-[140px]">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">العميل</p>
                          <p className="text-xs font-bold truncate">{order.customer}</p>
                        </div>
                      </div>

                      <div className="text-left pr-4">
                        <p className="text-[8px] text-muted-foreground mb-0.5 font-bold uppercase tracking-wider">الإجمالي</p>
                        <p className="font-bold text-lg text-primary">{order.total}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-primary rounded-xl bg-primary/5 hover:bg-primary/10">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button asChild className="rounded-xl h-10 px-6 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 gap-2">
                          <Link href={`/merchant/orders/${order.id}`}>
                            التفاصيل <ChevronLeft className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Info */}
                  <div className="mt-4 pt-4 border-t border-dashed flex items-center gap-4 opacity-70">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold">
                      {order.payment === 'cod' ? (
                        <><Wallet className="w-3.5 h-3.5 text-secondary" /> الدفع عند الاستلام</>
                      ) : order.payment === 'wallet' ? (
                        <><Wallet className="w-3.5 h-3.5 text-primary" /> محفظة رواج</>
                      ) : (
                        <><CreditCard className="w-3.5 h-3.5 text-blue-600" /> تحويل بنكي</>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-muted/20 rounded-[40px] border border-dashed border-primary/20">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Receipt className="w-10 h-10 text-primary opacity-20" />
              </div>
              <h3 className="font-bold text-lg text-primary">لا توجد طلبات مطابقة</h3>
              <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو حالة الطلب في الفلاتر</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchTerm(""); setActiveTab("all"); }} 
                className="mt-6 rounded-xl border-primary/20 text-primary font-bold"
              >
                إظهار كافة الطلبات
              </Button>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}

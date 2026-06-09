
'use client';

import { 
  TrendingUp, 
  ShoppingBag, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  ChevronLeft,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  LayoutDashboard,
  ExternalLink,
  Zap,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell,
  Tooltip as ChartTooltip,
  CartesianGrid
} from "recharts"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const STATS = [
  { label: "إجمالي المبيعات", value: "245,000 ر.ي", trend: "+12.5%", isPositive: true, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "الطلبات النشطة", value: "18", trend: "+5", isPositive: true, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "المنتجات المباعة", value: "124", trend: "-2%", isPositive: false, icon: Package, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "تقييم المتجر", value: "4.8", trend: "0.1", isPositive: true, icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
]

const CHART_DATA = [
  { day: "السبت", sales: 12000 },
  { day: "الأحد", sales: 18500 },
  { day: "الإثنين", sales: 15000 },
  { day: "الثلاثاء", sales: 22000 },
  { day: "الأربعاء", sales: 30000 },
  { day: "الخميس", sales: 25000 },
  { day: "الجمعة", sales: 19000 },
]

const RECENT_ORDERS = [
  { id: "RW-9021", customer: "أحمد علي", total: "14,500 ر.ي", status: "pending", time: "منذ 10 دقائق", items: 3 },
  { id: "RW-9020", customer: "سارة محمد", total: "6,000 ر.ي", status: "processing", time: "منذ 45 دقيقة", items: 1 },
  { id: "RW-9019", customer: "خالد بن الوليد", total: "22,000 ر.ي", status: "completed", time: "ساعتين", items: 2 },
]

export default function MerchantDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10 pb-24">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[35px] border shadow-sm">
        <div className="flex items-center gap-5">
           <div className="relative">
             <Avatar className="w-20 h-20 border-4 border-primary/10 shadow-xl rounded-[28px]">
                <AvatarImage src="/logo-stores-1.png" className="object-cover" />
                <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">م ج</AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-1 -left-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" />
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">مرحباً، محامص الجبال</h1>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-none font-bold text-[10px] px-2 py-0.5 rounded-full">متجر موثق</Badge>
              </div>
              <p className="text-muted-foreground text-sm font-medium">سوق رواج يتمنى لك يوماً مليئاً بالنجاح والمبيعات.</p>
           </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl h-12 border-primary/10 gap-2 font-bold hover:bg-primary/5 transition-all">
            <Calendar className="w-4 h-4" /> الأسبوع الحالي
          </Button>
          <Button className="rounded-2xl h-12 bg-primary hover:bg-primary/90 gap-2 px-6 font-bold shadow-lg shadow-primary/10 transition-all">
            <Zap className="w-4 h-4 fill-white" /> تحديث المخزون
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[30px] overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white border border-transparent hover:border-primary/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-1 rounded-full",
                  stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart Section */}
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline font-bold text-primary">أداء المبيعات</CardTitle>
              <CardDescription className="text-xs font-medium">متابعة نمو مبيعاتك اليومية عبر المنصة</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs font-bold text-primary gap-1 hover:bg-primary/5 rounded-xl">
              <Link href="/merchant/reports">عرض التقارير الكاملة <ArrowLeft className="w-3.5 h-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-8 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis hide />
                <ChartTooltip 
                   cursor={{ fill: '#f1f5f9', radius: 10 }}
                   contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="sales" 
                  radius={[8, 8, 0, 0]} 
                  barSize={40}
                >
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#0F766E' : '#D4A017'} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Actions & Insights */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-sm rounded-[40px] bg-primary text-white p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full -ml-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-6">
                 <h3 className="text-2xl font-headline font-bold">إجراءات سريعة</h3>
                 <div className="grid grid-cols-1 gap-3">
                    <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group/btn backdrop-blur-md transition-all">
                       <Link href="/merchant/products/add" className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <Package className="w-5 h-5 text-secondary" />
                             <span className="font-bold text-sm">إضافة منتج جديد</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-2 transition-transform" />
                       </Link>
                    </Button>
                    <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group/btn backdrop-blur-md transition-all">
                       <Link href="/merchant/orders" className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <ShoppingBag className="w-5 h-5 text-secondary" />
                             <span className="font-bold text-sm">إدارة كافة الطلبات</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-2 transition-transform" />
                       </Link>
                    </Button>
                    <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group/btn backdrop-blur-md transition-all">
                       <Link href="/merchant/messages" className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <MessageSquare className="w-5 h-5 text-secondary" />
                             <span className="font-bold text-sm">محادثات العملاء</span>
                          </div>
                          <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-2 transition-transform" />
                       </Link>
                    </Button>
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-sm rounded-[40px] p-8 bg-white border border-primary/5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Star className="w-5 h-5 text-secondary fill-secondary" />
                 <h4 className="font-bold text-primary">نصيحة رواج اليوم</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                المنتجات التي تحتوي على وصف "سردي" وقصة جذابة تحقق مبيعات أعلى بنسبة 35%. جرب استخدام "ذكاء رواج" في صفحة إضافة المنتجات!
              </p>
              <Button variant="ghost" className="p-0 h-auto text-secondary text-[11px] font-bold hover:bg-transparent underline decoration-dashed underline-offset-4">ابدأ التحسين الآن</Button>
           </Card>
        </div>
      </div>

      {/* Recent Orders Enhanced Section */}
      <Card className="border-none shadow-sm rounded-[45px] overflow-hidden bg-white">
        <CardHeader className="p-10 pb-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-headline font-bold text-primary">آخر الطلبات الواردة</CardTitle>
            <CardDescription className="font-medium">لديك 3 طلبات جديدة بحاجة للمراجعة والتجهيز</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="text-xs font-bold text-primary h-10 border-primary/20 rounded-xl px-5 hover:bg-primary/5">
            <Link href="/merchant/orders">عرض السجل الكامل</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <div className="space-y-4">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-[30px] bg-muted/20 hover:bg-muted/40 transition-all group border border-transparent hover:border-primary/10 cursor-pointer">
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-500",
                    order.status === 'pending' ? "bg-orange-50 text-orange-600" : 
                    order.status === 'processing' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                  )}>
                    {order.status === 'pending' ? <AlertCircle className="w-7 h-7" /> : 
                     order.status === 'processing' ? <Clock className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-bold text-lg">#{order.id} - {order.customer}</h4>
                       <Badge className={cn(
                         "text-[9px] font-bold px-2 py-0.5 rounded-lg border-none",
                         order.status === 'pending' ? "bg-orange-50 text-orange-700" : 
                         order.status === 'processing' ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
                       )}>
                         {order.status === 'pending' ? 'انتظار' : order.status === 'processing' ? 'تجهيز' : 'مكتمل'}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold">
                       <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {order.time}</span>
                       <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> {order.items} منتجات</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-none">
                  <div className="text-left md:text-right flex-1 md:flex-none">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">إجمالي الفاتورة</p>
                    <p className="font-bold text-xl text-primary">{order.total}</p>
                  </div>
                  <Button variant="ghost" size="icon" asChild className="rounded-xl h-12 w-12 hover:bg-primary/5 text-primary">
                     <Link href={`/merchant/orders/${order.id}`}><ExternalLink className="w-6 h-6" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

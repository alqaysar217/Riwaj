
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
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell 
} from "recharts"
import Link from "next/link"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "إجمالي المبيعات", value: "245,000 ر.ي", trend: "+12.5%", isPositive: true, icon: TrendingUp },
  { label: "الطلبات النشطة", value: "18", trend: "+5", isPositive: true, icon: ShoppingBag },
  { label: "المنتجات المباعة", value: "124", trend: "-2%", isPositive: false, icon: Package },
  { label: "تقييم المتجر", value: "4.8", trend: "0.1", isPositive: true, icon: Star },
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
  { id: "RW-9021", customer: "أحمد علي", total: "14,500 ر.ي", status: "pending", time: "منذ 10 دقائق" },
  { id: "RW-9020", customer: "سارة محمد", total: "6,000 ر.ي", status: "processing", time: "منذ 45 دقيقة" },
  { id: "RW-9019", customer: "خالد بن الوليد", total: "22,000 ر.ي", status: "completed", time: "ساعتين" },
]

export default function MerchantDashboard() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">لوحة التحكم</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">متجر محامص الجبال</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full h-10 border-primary/20 text-primary gap-2">
          <Calendar className="w-4 h-4" /> الأسبوع الحالي
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[24px] overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold">{stat.label}</p>
                <p className="text-lg font-bold text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-base font-bold text-primary">أداء المبيعات</CardTitle>
            <Link href="/merchant/reports" className="text-xs font-bold text-primary hover:underline">عرض التقارير</Link>
          </CardHeader>
          <CardContent className="h-[250px] pr-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }} 
                />
                <YAxis hide />
                <Bar 
                  dataKey="sales" 
                  radius={[6, 6, 0, 0]} 
                  barSize={30}
                >
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#0F766E' : '#D4A017'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 border-none shadow-sm rounded-[32px] bg-primary text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full -ml-16 -mt-16 blur-3xl" />
          <h3 className="text-xl font-headline font-bold mb-6 relative z-10">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 gap-3 relative z-10">
            <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group">
              <Link href="/merchant/products/add" className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-bold">إضافة منتج</span>
                </div>
                <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </Link>
            </Button>
            <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group">
              <Link href="/merchant/orders" className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-bold">الطلبات</span>
                </div>
                <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </Link>
            </Button>
            <Button asChild className="bg-white/10 hover:bg-white/20 border-white/20 text-white justify-between h-14 rounded-2xl group">
              <Link href="/merchant/messages" className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-bold">المحادثات</span>
                </div>
                <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold text-primary">آخر الطلبات</CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-xs font-bold text-primary h-8">
            <Link href="/merchant/orders">عرض الكل</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-2">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-2xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    order.status === 'pending' ? "bg-orange-50 text-orange-600" : 
                    order.status === 'processing' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                  )}>
                    {order.status === 'pending' ? <AlertCircle className="w-5 h-5" /> : 
                     order.status === 'processing' ? <Clock className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">#{order.id} - {order.customer}</h4>
                    <p className="text-[10px] text-muted-foreground">{order.time}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

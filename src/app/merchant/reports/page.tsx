'use client';

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  Filter, 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users,
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
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area 
} from "recharts"
import { cn } from "@/lib/utils"

const SALES_DATA = [
  { name: 'السبت', value: 4000 },
  { name: 'الأحد', value: 3000 },
  { name: 'الاثنين', value: 2000 },
  { name: 'الثلاثاء', value: 2780 },
  { name: 'الأربعاء', value: 1890 },
  { name: 'الخميس', value: 2390 },
  { name: 'الجمعة', value: 3490 },
];

const TOP_PRODUCTS = [
  { name: "بن خولاني فاخر", sales: 124, revenue: "558,000 ر.ي" },
  { name: "عسل سدر ملكي", sales: 89, revenue: "1,068,000 ر.ي" },
  { name: "بخور عدني خاص", sales: 56, revenue: "156,800 ر.ي" },
];

export default function MerchantReports() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatCurrency = (val: number) => {
    if (!isMounted) return val.toString();
    return val.toLocaleString() + " ر.ي";
  }

  return (
    <div className="min-h-full bg-muted/40 p-6 md:p-10 space-y-10 pb-28">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/50 p-8 rounded-[32px] border border-white/20 backdrop-blur-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary tracking-tight">التقارير والتحليلات</h1>
          <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            نظرة شاملة ودقيقة على أداء متجرك التجاري
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl h-14 border-primary/10 bg-white text-primary font-bold gap-2 px-8 shadow-sm hover:shadow-md hover:bg-white transition-all">
            <Download className="w-5 h-5" /> تصدير PDF
          </Button>
          <Button className="rounded-2xl h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-2 px-10 font-bold transition-all hover:scale-105 active:scale-95">
            <Calendar className="w-5 h-5" /> آخر 30 يوم
          </Button>
        </div>
      </div>

      {/* Primary Stats - High Contrast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "إجمالي الأرباح", value: 1842000, trend: "+15.2%", icon: DollarSign, color: "text-green-600", bg: "bg-green-50/50" },
          { label: "عدد الطلبات", value: 342, trend: "+8.4%", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50/50" },
          { label: "معدل التحويل", value: "4.8%", trend: "-2.1%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50/50" },
          { label: "عملاء جدد", value: 56, trend: "+12", icon: Users, color: "text-purple-600", bg: "bg-purple-50/50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:shadow-primary/10 rounded-[35px] overflow-hidden group transition-all duration-500 bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className={cn("w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-black/[0.02]", stat.bg, stat.color)}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={cn("text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-black/[0.02]", stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                  {stat.trend}
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-[0.15em] mb-2">{stat.label}</p>
              <h2 className="text-2xl font-bold text-primary">
                {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sales Chart Section */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-black/[0.03] rounded-[45px] overflow-hidden bg-white">
          <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-headline font-bold text-primary">تحليل الإيرادات</CardTitle>
              <CardDescription className="font-bold text-muted-foreground/70">تطور المبيعات اليومي خلال الأسبوع الحالي</CardDescription>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="w-7 h-7" />
            </div>
          </CardHeader>
          <CardContent className="p-10 h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 13, fontWeight: 700, fill: '#64748b'}} dy={15} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ stroke: '#0F766E', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '28px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', background: 'white' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0F766E" strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products - Enhanced Vertical List */}
        <Card className="border-none shadow-xl shadow-black/[0.03] rounded-[45px] overflow-hidden bg-white flex flex-col">
          <CardHeader className="p-10 pb-6">
            <CardTitle className="text-2xl font-headline font-bold text-primary">النجوم (الأعلى مبيعاً)</CardTitle>
            <CardDescription className="font-bold text-muted-foreground/70">أفضل منتجاتك أداءً وتفاعلاً</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0 space-y-6 flex-1">
            <div className="space-y-5">
              {TOP_PRODUCTS.map((prod, i) => (
                <div key={i} className="flex items-center gap-5 p-6 rounded-[30px] bg-muted/20 hover:bg-muted/40 transition-all group border border-transparent hover:border-primary/10">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/[0.02] flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {i+1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base truncate text-foreground group-hover:text-primary transition-colors">{prod.name}</h4>
                    <p className="text-[11px] text-muted-foreground font-bold mt-1.5 uppercase tracking-widest">{prod.sales} طلب ناجح</p>
                  </div>
                  <div className="text-left">
                    <p className="text-base font-bold text-primary">{prod.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 mt-auto">
              <Button variant="ghost" className="w-full h-16 rounded-[24px] text-primary font-bold hover:bg-primary/5 gap-3 group text-base">
                استكشاف كافة المنتجات <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts Area - High Impact UI */}
      <Card className="border-none shadow-2xl shadow-secondary/10 rounded-[50px] bg-gradient-to-r from-secondary via-secondary to-[#B48812] text-white p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-[250px] -mt-[250px] blur-3xl transition-transform duration-1000 group-hover:scale-125" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full -ml-40 -mb-40 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-4">
               <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl border border-white/30 group-hover:rotate-12 transition-transform duration-500">
                  <Package className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-3xl font-headline font-bold">تنبيهات المخزون</h3>
            </div>
            <p className="text-white/90 text-lg max-w-xl font-medium leading-relaxed">
              هناك <span className="font-bold underline decoration-4 underline-offset-8">4 منتجات</span> على وشك النفاد. لا تدع عملائك ينتظرون، قم بتحديث الكميات فوراً لضمان استمرار التدفق المالي.
            </p>
          </div>
          <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold rounded-[24px] h-20 px-12 text-xl gap-4 shadow-2xl shadow-black/20 transition-all hover:scale-105 active:scale-95 group">
            إدارة المخزون الآن <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}


'use client';

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
  Users
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
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">التقارير والتحليلات</h1>
          <p className="text-muted-foreground text-sm mt-1">تتبع أداء متجرك المالي والتشغيلي بكل دقة</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl h-12 border-primary/20 text-primary gap-2">
            <Download className="w-4 h-4" /> تصدير PDF
          </Button>
          <Button className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2">
            <Calendar className="w-4 h-4" /> آخر 30 يوم
          </Button>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "إجمالي الأرباح", value: "1,842,000 ر.ي", trend: "+15.2%", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "عدد الطلبات", value: "342", trend: "+8.4%", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "معدل التحويل", value: "4.8%", trend: "-2.1%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "عملاء جدد", value: "56", trend: "+12", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[24px] overflow-hidden group hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                  {stat.trend}
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-bold mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-primary">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-primary">رسم بياني للمبيعات</CardTitle>
              <CardDescription>أداء المبيعات اليومي خلال الأسبوع الحالي</CardDescription>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#6b7280'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-bold text-primary">المنتجات الأعلى طلباً</CardTitle>
            <CardDescription>المنتجات الأكثر مبيعاً في متجرك</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-4">
              {TOP_PRODUCTS.map((prod, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold text-sm">
                    {i+1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{prod.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{prod.sales} طلب ناجح</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-primary">{prod.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 text-primary font-bold hover:bg-primary/5">
              عرض كافة المنتجات
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts Area */}
      <Card className="border-none shadow-sm rounded-[32px] bg-secondary text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-bold">تنبيهات المخزون</h3>
            <p className="text-white/80 text-sm max-w-md">لديك 4 منتجات قاربت كمياتها على الانتهاء. قم بتحديث الكميات لضمان عدم توقف المبيعات.</p>
          </div>
          <Button size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold rounded-2xl h-14 px-8 gap-2">
            <Package className="w-5 h-5" /> إدارة المخزون الآن
          </Button>
        </div>
      </Card>
    </div>
  )
}

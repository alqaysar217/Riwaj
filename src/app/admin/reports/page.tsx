
'use client';

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  ShieldCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie
} from "recharts"
import { cn } from "@/lib/utils"

const REVENUE_DATA = [
  { name: 'يناير', amount: 4500000 },
  { name: 'فبراير', amount: 3200000 },
  { name: 'مارس', amount: 5100000 },
  { name: 'أبريل', amount: 4800000 },
  { name: 'مايو', amount: 6200000 },
  { name: 'يونيو', amount: 5800000 },
];

const USER_GROWTH = [
  { name: 'الأسبوع 1', customers: 400, merchants: 40 },
  { name: 'الأسبوع 2', customers: 600, merchants: 55 },
  { name: 'الأسبوع 3', customers: 850, merchants: 70 },
  { name: 'الأسبوع 4', customers: 1200, merchants: 95 },
];

const CATEGORY_DATA = [
  { name: 'البن', value: 45, color: '#0F766E' },
  { name: 'العسل', value: 25, color: '#D4A017' },
  { name: 'الحرف', value: 15, color: '#0D9488' },
  { name: 'أخرى', value: 15, color: '#6B7280' },
];

export default function AdminReports() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const formatCurrency = (val: number) => {
    if (!isMounted) return val.toString();
    return val.toLocaleString() + " ر.ي";
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">التقارير والتحليلات العامة</h1>
          <p className="text-muted-foreground text-sm font-medium">مراقبة أداء منصة رواج الشامل وتطور السوق اليمني الرقمي</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-primary/10 gap-2 font-bold transition-all hover:bg-primary/5">
            <Download className="w-4 h-4" /> تصدير البيانات
          </Button>
          <Button className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-6 font-bold shadow-lg shadow-primary/10 transition-all">
            <Calendar className="w-4 h-4" /> التقرير السنوي
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "إجمالي المبيعات (GMV)", value: 42500000, trend: "+18.2%", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "المستخدمين النشطين", value: 14500, trend: "+12.4%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "إجمالي الطلبات", value: 3840, trend: "+5.1%", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "معدل نمو التجار", value: "+14", trend: "تصاعدي", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all bg-white border border-transparent hover:border-primary/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn("text-[10px] font-bold px-2 py-1 rounded-full", stat.trend.includes('+') ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600")}>
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-primary">
                  {typeof stat.value === 'number' && i === 0 ? formatCurrency(stat.value) : stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline font-bold text-primary">نمو الإيرادات المنصية</CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">مقارنة شهرية لأداء المبيعات الإجمالي لعام 2024</CardDescription>
            </div>
            <div className="flex gap-2">
               <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-bold text-primary bg-primary/5">شهري</Button>
               <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-bold text-muted-foreground">سنوي</Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorAdminRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#6B7280'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ stroke: '#0F766E', strokeWidth: 1 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-xl shadow-xl border border-primary/10 animate-in fade-in zoom-in-95 duration-200">
                          <p className="text-xs font-bold text-muted-foreground mb-1">{payload[0].payload.name}</p>
                          <p className="text-lg font-bold text-primary">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="amount" stroke="#0F766E" strokeWidth={4} fillOpacity={1} fill="url(#colorAdminRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution Chart */}
        <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-headline font-bold text-primary">توزيع المبيعات</CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">حصة كل فئة من إجمالي المبيعات</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-8">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="outline-none focus:outline-none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
               {CATEGORY_DATA.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-sm font-bold text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{item.value}%</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Analysis */}
      <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
        <CardHeader className="p-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-headline font-bold text-primary">نمو قاعدة المستخدمين</CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">معدل انضمام المشترين والتجار الجدد أسبوعياً</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold">
             <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> مشترين</div>
             <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-secondary" /> تجار</div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={USER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#6B7280'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#6B7280'}} />
              <Tooltip cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="customers" name="مشترين" fill="#0F766E" radius={[4, 4, 0, 0]} barSize={35} />
              <Bar dataKey="merchants" name="تجار" fill="#D4A017" radius={[4, 4, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform Health and Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 rounded-xl border-none shadow-sm bg-primary text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" /> كفاءة النظام
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-medium">استقرار قواعد البيانات وسرعة الاستجابة في أفضل حالاتها (99.9%).</p>
              <div className="flex items-center gap-2 text-[10px] font-bold bg-white/10 w-fit px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> متصل ومستقر الآن
              </div>
            </div>
         </Card>
         
         <Card className="p-6 rounded-xl border-none shadow-sm bg-white space-y-4 group">
            <h3 className="font-bold text-lg text-primary flex items-center gap-2">
               <PieChartIcon className="w-5 h-5 text-secondary" /> رضا المستخدمين
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">متوسط تقييمات المتاجر والمنتجات عبر المنصة هو 4.7/5.</p>
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold text-primary"><span>مستوى الرضا</span><span>94%</span></div>
               <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary transition-all duration-1000 w-[94%] group-hover:w-[96%]" />
               </div>
            </div>
         </Card>

         <Card className="p-6 rounded-xl border-none shadow-sm bg-white space-y-4 group">
            <h3 className="font-bold text-lg text-primary flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-secondary" /> أمان المعاملات
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">تم حل 92% من تذاكر الدعم والنزاعات خلال أقل من 24 ساعة.</p>
            <Button variant="outline" className="w-full rounded-xl border-primary/20 text-primary font-bold h-11 text-xs hover:bg-primary/5 transition-all">
               إدارة تذاكر الدعم
            </Button>
         </Card>
      </div>
    </div>
  )
}

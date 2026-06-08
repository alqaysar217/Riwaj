
'use client';

import { 
  TrendingUp, 
  Users, 
  Store, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const STATS = [
  { label: "إجمالي المبيعات", value: "4,250,000 ر.ي", trend: "+15.2%", isPositive: true, icon: TrendingUp },
  { label: "المستخدمين النشطين", value: "1,450", trend: "+8.4%", isPositive: true, icon: Users },
  { label: "المتاجر الموثقة", value: "128", trend: "+12", isPositive: true, icon: Store },
  { label: "طلبات توثيق معلقة", value: "14", trend: "عاجل", isPositive: false, icon: ShieldAlert },
];

const REVENUE_DATA = [
  { month: "يناير", amount: 2400000 },
  { month: "فبراير", amount: 1398000 },
  { month: "مارس", amount: 9800000 },
  { month: "أبريل", amount: 3908000 },
  { month: "مايو", amount: 4800000 },
  { month: "يونيو", amount: 3800000 },
];

const RECENT_STORES = [
  { name: "عسل سقطرى", category: "عسل", owner: "أصيل عبد الرقيب", date: "اليوم، 10:45 ص", status: "pending" },
  { name: "بن وادي ذنه", category: "قهوة", owner: "سالم العزاني", date: "أمس، 09:15 م", status: "verified" },
  { name: "فضيات زبيد", category: "حرف يدوية", owner: "خالد الزبيدي", date: "24 مايو", status: "verified" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">نظرة عامة على المنصة</h1>
          <p className="text-muted-foreground text-sm mt-1">مرحباً بك مجدداً في مركز إدارة "رواج"</p>
        </div>
        <Button className="h-12 rounded-xl bg-primary hover:bg-primary/90 gap-2 px-6">
          <Calendar className="w-4 h-4" /> تحميل التقرير السنوي
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[24px] overflow-hidden group hover:shadow-lg transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold px-2 py-1 rounded-full",
                  stat.isPositive ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ShieldAlert className="w-3 h-3 ml-1" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-8 border-none shadow-sm rounded-[32px] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
            <div>
              <CardTitle className="text-lg font-bold text-primary">تحليلات الإيرادات</CardTitle>
              <CardDescription>أداء مبيعات المنصة خلال آخر 6 أشهر</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg h-9 text-xs font-bold border-primary/20">شهري</Button>
              <Button variant="ghost" size="sm" className="rounded-lg h-9 text-xs font-bold text-muted-foreground">سنوي</Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] p-8 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#6B7280' }}
                  dy={10}
                />
                <YAxis hide />
                <ChartTooltip 
                  cursor={{ fill: '#0F766E', fillOpacity: 0.05 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-xl shadow-xl border border-primary/10">
                          <p className="text-xs font-bold text-muted-foreground mb-1">{payload[0].payload.month}</p>
                          <p className="text-lg font-bold text-primary">{payload[0].value?.toLocaleString()} ر.ي</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={40}>
                  {REVENUE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#D4A017' : '#0F766E'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Store Verifications */}
        <Card className="lg:col-span-4 border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-bold text-primary">المتاجر الجديدة</CardTitle>
            <CardDescription>طلبات انضمام بحاجة للمراجعة</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <div className="space-y-4">
              {RECENT_STORES.map((store, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors group cursor-pointer border border-transparent hover:border-primary/10">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    store.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                  )}>
                    {store.status === 'pending' ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{store.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-medium">{store.owner} • {store.category}</p>
                    <p className="text-[9px] text-muted-foreground mt-1">{store.date}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 text-primary font-bold hover:bg-primary/5">
              عرض كل طلبات التوثيق
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-[24px] bg-primary text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full -ml-16 -mt-16 blur-3xl" />
          <h3 className="text-xl font-headline font-bold mb-4 relative z-10">إحصائيات فورية</h3>
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-white/80 text-xs font-bold">
              <span>طلبات مكتملة اليوم</span>
              <span className="text-white text-lg">42</span>
            </div>
            <div className="flex items-center justify-between text-white/80 text-xs font-bold">
              <span>مستخدمين جدد</span>
              <span className="text-white text-lg">+18</span>
            </div>
            <div className="flex items-center justify-between text-white/80 text-xs font-bold">
              <span>المخزون المنخفض (تنبيهات)</span>
              <span className="text-secondary font-bold text-lg">5</span>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[24px] p-6 space-y-4">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Package className="w-5 h-5 text-secondary" /> إدارة المخزون
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">هناك 5 متاجر تعاني من نقص في كميات المنتجات الأكثر طلباً. هل تريد إرسال تنبيهات لهؤلاء التجار؟</p>
          <Button className="w-full rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold h-11">إرسال تنبيهات فورية</Button>
        </Card>

        <Card className="border-none shadow-sm rounded-[24px] p-6 space-y-4">
          <h3 className="text-lg font-bold text-primary flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" /> الصيانة الدورية
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">آخر نسخة احتياطية للنظام تمت قبل 3 ساعات. حالة قواعد البيانات مستقرة تماماً.</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            النظام يعمل بكفاءة 100%
          </div>
        </Card>
      </div>
    </div>
  );
}

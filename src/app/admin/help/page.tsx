
'use client';

import { useState } from "react"
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  Plus, 
  Search, 
  ChevronLeft, 
  LifeBuoy, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Type,
  LayoutGrid,
  Trash2,
  Edit2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const TICKETS = [
  { id: 1, user: "أحمد علي", subject: "مشكلة في سحب الرصيد", status: "open", priority: "high", date: "منذ 10 دقائق" },
  { id: 2, user: "متجر خولان", subject: "طلب توثيق إضافي", status: "pending", priority: "medium", date: "منذ ساعة" },
  { id: 3, user: "سارة محمد", subject: "استفسار عن عمولة الشحن", status: "closed", priority: "low", date: "أمس" },
]

export default function AdminHelp() {
  const [activeTab, setActiveTab] = useState("tickets")

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">مركز المساعدة والدعم</h1>
          <p className="text-muted-foreground text-sm font-medium">إدارة تذاكر دعم المستخدمين وتوثيق أدلة الاستخدام</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-primary/10 gap-2 font-bold transition-all hover:bg-primary/5">
            <BookOpen className="w-4 h-4" /> دليل الإدارة
          </Button>
          <Button className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-6 font-bold shadow-lg shadow-primary/10 transition-all">
            <Plus className="w-4 h-4" /> إضافة مقال مساعد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Tickets Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary" /> تذاكر الدعم النشطة
            </h3>
            <div className="relative group w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="بحث برقم التذكرة..." className="h-10 pr-9 bg-white border-none shadow-sm rounded-lg" />
            </div>
          </div>

          <div className="space-y-4">
            {TICKETS.map((ticket) => (
              <Card key={ticket.id} className="border-none shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all group border border-transparent hover:border-primary/10">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        ticket.status === 'open' ? "bg-red-50 text-red-600" : ticket.status === 'pending' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                      }`}>
                        <LifeBuoy className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">#{ticket.id} - {ticket.subject}</h4>
                          <Badge variant="outline" className={`text-[8px] font-bold px-2 py-0.5 border-none ${
                            ticket.priority === 'high' ? "bg-red-100 text-red-700" : "bg-muted text-muted-foreground"
                          }`}>
                            {ticket.priority === 'high' ? 'أولوية قصوى' : 'عادي'}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium">بواسطة: {ticket.user} • {ticket.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mr-auto md:mr-0">
                      <Badge className={`text-[9px] font-bold border-none px-3 py-1 rounded-lg ${
                        ticket.status === 'open' ? "bg-red-50 text-red-700" : ticket.status === 'pending' ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700"
                      }`}>
                        {ticket.status === 'open' ? 'بانتظار الرد' : ticket.status === 'pending' ? 'جاري المعالجة' : 'مكتمل'}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-primary/5 text-primary">
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Management Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> الأسئلة الشائعة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-3 bg-muted/20 rounded-lg border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                <p className="text-xs font-bold mb-1">كيفية تفعيل المتجر؟</p>
                <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                  <span>تم التحديث: أمس</span>
                  <div className="flex gap-2">
                    <Edit2 className="w-3 h-3 hover:text-primary" />
                    <Trash2 className="w-3 h-3 hover:text-destructive" />
                  </div>
                </div>
              </div>
              <div className="p-3 bg-muted/20 rounded-lg border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                <p className="text-xs font-bold mb-1">شروط سحب الأرباح</p>
                <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                  <span>تم التحديث: منذ أسبوع</span>
                  <div className="flex gap-2">
                    <Edit2 className="w-3 h-3 hover:text-primary" />
                    <Trash2 className="w-3 h-3 hover:text-destructive" />
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs font-bold text-primary gap-2 h-10 hover:bg-primary/5 rounded-lg border border-dashed border-primary/20 mt-2">
                <Plus className="w-4 h-4" /> إضافة سؤال جديد
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl bg-primary text-white p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-secondary" /> التواصل مع المطورين
              </h3>
              <p className="text-[10px] text-white/80 leading-relaxed font-medium">
                في حال وجود مشاكل برمجية أو رغبتك في تحديث خصائص النظام، تواصل مع فريق التطوير التقني لـ رواج.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold h-11 rounded-lg text-[11px] shadow-xl">
                 إرسال بلاغ تقني
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

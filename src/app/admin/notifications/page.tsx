
'use client';

import { useState, useMemo } from "react"
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Trash2, 
  Users, 
  Store, 
  ShieldAlert, 
  Zap,
  CheckCircle2,
  Clock,
  MoreVertical,
  X,
  Type,
  MessageSquare,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: "تحديث شروط الخدمة", content: "لقد قمنا بتحديث سياسة الخصوصية لضمان أمان أفضل لكافة الأعضاء.", target: "all", type: "system", status: "sent", date: "منذ ساعتين", sentBy: "المدير العام" },
  { id: 2, title: "عرض خاص للتجار الجدد", content: "احصل على خصم 50% على عمولة المبيعات لأول شهر عند توثيق متجرك.", target: "merchants", type: "offer", status: "sent", date: "أمس", sentBy: "فريق التسويق" },
  { id: 3, title: "صيانة دورية للنظام", content: "سنقوم بإجراء صيانة دورية لقواعد البيانات يوم الجمعة القادم الساعة 2 صباحاً.", target: "all", type: "security", status: "scheduled", date: "مجدول: 24 مايو", sentBy: "التقني" },
]

export default function AdminNotifications() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    target: "all",
    type: "system"
  })

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => 
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, notifications])

  const handleSend = () => {
    if (!formData.title || !formData.content) {
      toast({ title: "بيانات ناقصة", description: "يرجى كتابة عنوان ومحتوى الإشعار.", variant: "destructive" })
      return
    }

    const newNote = {
      id: Date.now(),
      ...formData,
      status: "sent",
      date: "الآن",
      sentBy: "أنت (المدير)"
    }

    setNotifications([newNote, ...notifications])
    setIsDialogOpen(false)
    setFormData({ title: "", content: "", target: "all", type: "system" })
    toast({ title: "تم الإرسال", description: "تم بث الإشعار بنجاح لكافة الفئات المستهدفة." })
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
    toast({ title: "تم الحذف", description: "تمت إزالة سجل الإشعار بنجاح." })
  }

  const getTargetLabel = (target: string) => {
    switch (target) {
      case 'all': return { label: 'للجميع', icon: Globe, color: 'bg-primary/10 text-primary' };
      case 'merchants': return { label: 'للتجار', icon: Store, color: 'bg-secondary/10 text-secondary' };
      case 'customers': return { label: 'للمشترين', icon: Users, color: 'bg-blue-100 text-blue-700' };
      default: return { label: 'غير محدد', icon: Bell, color: 'bg-muted text-muted-foreground' };
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-primary';
      case 'offer': return 'text-orange-600';
      case 'security': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">الإشعارات العامة</h1>
          <p className="text-muted-foreground text-sm font-medium">بث الرسائل والتبيهات لكافة مستخدمي منصة رواج</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl h-12 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/10 text-base font-bold transition-all">
              <Plus className="w-5 h-5" /> إرسال إشعار جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-xl sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-6 [&>button]:right-auto">
            <DialogHeader className="p-6 bg-muted/30 border-b">
              <DialogTitle className="text-xl font-headline font-bold text-primary text-right flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Send className="w-6 h-6" />
                </div>
                إنشاء بث جديد
              </DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-primary" /> عنوان الإشعار
                  </Label>
                  <Input 
                    placeholder="اكتب عنواناً جذاباً..." 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="h-12 rounded-lg bg-muted/20 border-none px-4 font-bold" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1">الفئة المستهدفة</Label>
                    <Select value={formData.target} onValueChange={(v) => setFormData({...formData, target: v})}>
                      <SelectTrigger className="h-12 rounded-lg bg-muted/20 border-none font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="all">كافة المستخدمين</SelectItem>
                        <SelectItem value="merchants">التجار فقط</SelectItem>
                        <SelectItem value="customers">المشترين فقط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-muted-foreground pr-1">نوع الرسالة</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                      <SelectTrigger className="h-12 rounded-lg bg-muted/20 border-none font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="system">نظام / تقني</SelectItem>
                        <SelectItem value="offer">عرض ترويجي</SelectItem>
                        <SelectItem value="security">تنبيه أمان</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-muted-foreground pr-1 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" /> محتوى الرسالة
                  </Label>
                  <Textarea 
                    placeholder="اكتب تفاصيل الإشعار هنا بوضوح..." 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="rounded-lg bg-muted/20 border-none p-4 min-h-[120px] resize-none" 
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-[2] h-12 rounded-lg bg-primary hover:bg-primary/90 font-bold text-base gap-2 shadow-lg shadow-primary/10 transition-all" 
                  onClick={handleSend}
                >
                  <Send className="w-5 h-5 rotate-180" /> بث الإشعار الآن
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex-1 h-12 rounded-lg font-bold text-muted-foreground" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث في سجل الإشعارات..." 
            className="h-12 pr-11 pl-10 rounded-xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button variant="outline" className="h-12 rounded-xl bg-white border-none shadow-sm gap-2 font-bold px-6">
          <Filter className="w-4 h-4" /> تصفية
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((note) => {
            const target = getTargetLabel(note.target);
            const TargetIcon = target.icon;
            
            return (
              <Card key={note.id} className="border-none shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all bg-white border border-transparent hover:border-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-4 flex-1">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        target.color
                      )}>
                        <TargetIcon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{note.title}</h3>
                          <Badge variant="outline" className={cn("text-[9px] font-bold border-none px-2 py-0.5", target.color)}>
                            {target.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all">{note.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {note.date}</span>
                          <span className="flex items-center gap-1.5"><Zap className={cn("w-3 h-3", getTypeColor(note.type))} /> {note.type === 'system' ? 'نظام' : note.type === 'offer' ? 'عرض' : 'أمان'}</span>
                          <span className="flex items-center gap-1.5 text-primary/70">بواسطة: {note.sentBy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg",
                        note.status === 'sent' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                      )}>
                        {note.status === 'sent' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {note.status === 'sent' ? 'تم الإرسال' : 'مجدول'}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-lg bg-red-50 text-destructive hover:bg-red-500 hover:text-white transition-all"
                        onClick={() => handleDelete(note.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-xl border border-dashed border-primary/20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bell className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="font-bold text-lg text-primary">لا توجد إشعارات مسجلة</h3>
            <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو ابدأ ببث إشعار جديد الآن</p>
          </div>
        )}
      </div>
    </div>
  )
}

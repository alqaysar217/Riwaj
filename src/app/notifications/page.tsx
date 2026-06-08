
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Bell, Package, Tag, Info, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const NOTIFICATIONS = [
  {
    id: 1,
    title: "تم شحن طلبك",
    description: "طلبك رقم RW-9021 في طريقه إليك الآن عبر مندوب التوصيل.",
    time: "منذ ساعتين",
    type: "order",
    icon: Package,
    color: "text-blue-500 bg-blue-50"
  },
  {
    id: 2,
    title: "خصم خاص لفترة محدودة",
    description: "استمتع بخصم 20% على جميع أنواع البن الخولاني بمناسبة يوم القهوة.",
    time: "منذ 5 ساعات",
    type: "offer",
    icon: Tag,
    color: "text-secondary bg-secondary/10"
  },
  {
    id: 3,
    title: "تنبيه أمان",
    description: "تم تسجيل الدخول إلى حسابك من متصفح جديد.",
    time: "أمس",
    type: "info",
    icon: Info,
    color: "text-muted-foreground bg-muted"
  }
]

export default function NotificationsPage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-headline font-bold text-primary">الإشعارات</h1>
            <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">تحديد الكل كمقروء</Button>
          </div>

          <div className="space-y-3">
            {NOTIFICATIONS.map((note) => (
              <div key={note.id} className="bg-white p-4 rounded-2xl border shadow-sm flex gap-4 hover:shadow-md transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${note.color}`}>
                  <note.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{note.title}</h3>
                    <span className="text-[10px] text-muted-foreground">{note.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{note.description}</p>
                </div>
                <div className="flex items-center">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground/30" />
                </div>
              </div>
            ))}
          </div>

          {NOTIFICATIONS.length === 0 && (
            <div className="text-center py-20 opacity-40">
              <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="font-bold">لا توجد إشعارات جديدة</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

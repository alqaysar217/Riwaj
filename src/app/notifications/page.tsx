
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Bell, Package, Tag, Info, ChevronLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const NOTIFICATIONS = [
  {
    id: 1,
    title: "تم شحن طلبك",
    description: "طلبك رقم RW-9021 في طريقه إليك الآن عبر مندوب التوصيل.",
    time: "منذ ساعتين",
    type: "orders",
    icon: Package,
    isNew: true
  },
  {
    id: 2,
    title: "خصم خاص لفترة محدودة",
    description: "استمتع بخصم 20% على جميع أنواع البن الخولاني بمناسبة يوم القهوة.",
    time: "منذ 5 ساعات",
    type: "offers",
    icon: Tag,
    isNew: true
  },
  {
    id: 3,
    title: "تنبيه أمان",
    description: "تم تسجيل الدخول إلى حسابك من متصفح جديد.",
    time: "أمس",
    type: "info",
    icon: Info,
    isNew: false
  },
  {
    id: 4,
    title: "تم استلام الطلب",
    description: "شكراً لشرائك من متجر خولان، نتمنى أن تنال التجربة إعجابك.",
    time: "قبل يومين",
    type: "orders",
    icon: CheckCircle2,
    isNew: false
  }
]

const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "new", label: "جديدة" },
  { id: "orders", label: "الطلبات" },
  { id: "offers", label: "العروض" },
]

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredNotifications = NOTIFICATIONS.filter(note => {
    if (activeFilter === "all") return true
    if (activeFilter === "new") return note.isNew
    return note.type === activeFilter
  })

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-headline font-bold text-primary">الإشعارات</h1>
            <Button variant="ghost" size="sm" className="text-[10px] text-primary font-bold h-7">تحديد الكل كمقروء</Button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0",
                  activeFilter === filter.id 
                    ? "bg-primary text-white border-primary shadow-sm" 
                    : "bg-white text-muted-foreground border-border hover:border-primary/30"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((note) => (
                <div 
                  key={note.id} 
                  className={cn(
                    "bg-white p-3 rounded-xl border shadow-sm flex gap-3 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden",
                    note.isNew && "border-primary/20 bg-primary/[0.01]"
                  )}
                >
                  {note.isNew && (
                    <div className="absolute top-0 right-0 w-1 h-full bg-primary" />
                  )}
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                    <note.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className={cn("text-xs font-bold truncate group-hover:text-primary transition-colors", note.isNew ? "text-foreground" : "text-muted-foreground")}>
                        {note.title}
                      </h3>
                      <span className="text-[9px] text-muted-foreground shrink-0 mr-2">{note.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {note.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ChevronLeft className="w-3 h-3 text-muted-foreground/30" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 opacity-40">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-bold text-sm">لا توجد إشعارات حالياً</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

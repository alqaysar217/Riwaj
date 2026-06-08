import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, User, Package, MapPin, HelpCircle, LogOut, Bell, Shield } from "lucide-react"
import Link from "next/link"

const MENU_ITEMS = [
  { icon: Package, label: "طلباتي", href: "/orders" },
  { icon: Bell, label: "التنبيهات", href: "/notifications" },
  { icon: MapPin, label: "عناويني", href: "/addresses" },
  { icon: Shield, label: "الأمان والخصوصية", href: "/privacy" },
  { icon: HelpCircle, label: "مركز المساعدة", href: "/help" },
]

export default function ProfilePage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* User Header */}
          <div className="bg-primary p-8 rounded-3xl text-white flex flex-col items-center text-center mb-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl" />
            
            <Avatar className="w-24 h-24 border-4 border-white/20 mb-4 shadow-xl">
              <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
              <AvatarFallback className="bg-secondary text-white text-2xl font-bold">أ م</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-headline font-bold">أحمد محمد</h1>
            <p className="text-white/70 text-sm mb-4">ahmed.m@example.com</p>
            <Button variant="secondary" size="sm" className="rounded-full px-6 font-bold" asChild>
              <Link href="/settings">تعديل الملف الشخصي</Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl border shadow-sm text-center">
              <p className="text-xl font-bold text-primary">12</p>
              <p className="text-[10px] text-muted-foreground">طلب ناجح</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border shadow-sm text-center">
              <p className="text-xl font-bold text-primary">5</p>
              <p className="text-[10px] text-muted-foreground">قائمة الرغبات</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border shadow-sm text-center">
              <p className="text-xl font-bold text-primary">1240</p>
              <p className="text-[10px] text-muted-foreground">نقاط مكافأة</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            {MENU_ITEMS.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className={`flex items-center justify-between p-5 hover:bg-muted/30 transition-colors ${index !== MENU_ITEMS.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold">{item.label}</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-8 text-destructive hover:text-destructive hover:bg-destructive/5 h-14 rounded-2xl gap-2 font-bold">
            <LogOut className="w-5 h-5" /> تسجيل الخروج
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

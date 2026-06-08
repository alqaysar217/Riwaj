
'use client';

import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, User, Package, MapPin, HelpCircle, LogOut, Bell, Shield, Settings2, Heart, Store } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const MENU_ITEMS = [
  { icon: Package, label: "طلباتي", href: "/orders" },
  { icon: Heart, label: "المفضلة", href: "/favorites" },
  { icon: Bell, label: "التنبيهات", href: "/notifications" },
  { icon: MapPin, label: "عناويني", href: "/addresses" },
  { icon: Shield, label: "الأمان والخصوصية", href: "/privacy" },
  { icon: HelpCircle, label: "مركز المساعدة", href: "/help" },
]

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    // محاكاة تسجيل الخروج والعودة للترحيب
    router.push('/auth/welcome')
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* User Header */}
          <div className="bg-primary p-6 rounded-3xl text-white shadow-lg relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl" />
            
            <div className="flex items-center gap-5 relative z-10">
              <Avatar className="w-20 h-20 border-2 border-white/30 shadow-md">
                <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                <AvatarFallback className="bg-secondary text-white text-xl font-bold">أ م</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-headline font-bold truncate">أحمد محمد</h1>
                <p className="text-white/70 text-xs mb-3 truncate">ahmed.m@example.com</p>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="rounded-full h-8 px-4 font-bold text-[10px] gap-1.5 shadow-sm" 
                    asChild
                  >
                    <Link href="/settings">
                      <Settings2 className="w-3 h-3" /> تعديل الملف
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full h-8 px-4 font-bold text-[10px] gap-1.5 border-white/20 text-white hover:bg-white/10" 
                    asChild
                  >
                    <Link href="/merchant/dashboard">
                      <Store className="w-3 h-3" /> لوحة التاجر
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white p-3 rounded-2xl border shadow-sm text-center group hover:border-primary/20 transition-colors">
              <p className="text-lg font-bold text-primary">12</p>
              <p className="text-[9px] text-muted-foreground font-bold">طلب ناجح</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border shadow-sm text-center group hover:border-primary/20 transition-colors">
              <p className="text-lg font-bold text-primary">5</p>
              <p className="text-[9px] text-muted-foreground font-bold">المفضلة</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border shadow-sm text-center group hover:border-primary/20 transition-colors">
              <p className="text-lg font-bold text-primary">1240</p>
              <p className="text-[9px] text-muted-foreground font-bold">نقاط</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            {MENU_ITEMS.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${index !== MENU_ITEMS.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full mt-6 text-destructive hover:text-destructive hover:bg-destructive/5 h-12 rounded-2xl gap-2 font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

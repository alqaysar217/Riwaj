import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Camera } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/profile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-headline font-bold text-primary">تعديل الملف الشخصي</h1>
          </div>

          <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary/10">
                  <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                  <AvatarFallback className="text-3xl">أ م</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">تغيير صورة الملف الشخصي</p>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input id="name" defaultValue="أحمد محمد" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" defaultValue="ahmed.m@example.com" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" defaultValue="77XXXXXXX" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">نبذة قصيرة</Label>
                <Input id="bio" placeholder="أهلاً بك في ملفي الشخصي..." className="rounded-xl h-12" />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1 h-12 rounded-xl font-bold">حفظ التغييرات</Button>
              <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold" asChild>
                <Link href="/profile">إلغاء</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

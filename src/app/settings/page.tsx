
'use client';

import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Camera, User, Mail, Phone, FileText, Save, X } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/profile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-headline font-bold text-primary">تعديل الملف الشخصي</h1>
          </div>

          {/* Settings Form Card */}
          <div className="bg-white p-8 rounded-[32px] border shadow-sm space-y-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary/10 shadow-lg">
                  <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                  <AvatarFallback className="text-3xl font-bold bg-primary/5 text-primary">أ م</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">تغيير صورة الملف الشخصي</p>
            </div>

            {/* Input Fields */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                  <User className="w-3.5 h-3.5 text-primary" /> الاسم الكامل
                </Label>
                <Input 
                  id="name" 
                  defaultValue="أحمد محمد" 
                  className="rounded-2xl h-14 bg-muted/20 border-none px-5 focus-visible:ring-primary/20" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                  <Mail className="w-3.5 h-3.5 text-primary" /> البريد الإلكتروني
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue="ahmed.m@example.com" 
                  className="rounded-2xl h-14 bg-muted/20 border-none px-5 focus-visible:ring-primary/20 text-left" 
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                  <Phone className="w-3.5 h-3.5 text-primary" /> رقم الهاتف
                </Label>
                <Input 
                  id="phone" 
                  defaultValue="77XXXXXXX" 
                  className="rounded-2xl h-14 bg-muted/20 border-none px-5 focus-visible:ring-primary/20 text-left" 
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                  <FileText className="w-3.5 h-3.5 text-primary" /> نبذة قصيرة
                </Label>
                <Input 
                  id="bio" 
                  placeholder="أهلاً بك في ملفي الشخصي..." 
                  className="rounded-2xl h-14 bg-muted/20 border-none px-5 focus-visible:ring-primary/20" 
                />
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1 h-14 rounded-2xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
                <Save className="w-5 h-5" /> حفظ التغييرات
              </Button>
              <Button variant="ghost" className="flex-1 h-14 rounded-2xl font-bold text-muted-foreground gap-2" asChild>
                <Link href="/profile">
                  <X className="w-5 h-5" /> إلغاء
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

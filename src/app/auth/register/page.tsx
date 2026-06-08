
'use client';

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Phone, ArrowRight, UserPlus, ShoppingBag, Store, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [role, setRole] = useState<'customer' | 'merchant'>('customer')
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // محاكاة لعملية التسجيل
    if (role === 'merchant') {
      router.push('/merchant/onboarding')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <header className="mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white shadow-sm border text-primary">
          <ArrowRight className="w-5 h-5" />
        </Button>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full space-y-8 pb-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-headline font-bold text-primary">انضم إلى رواج</h1>
          <p className="text-muted-foreground text-sm font-medium">اختر نوع الحساب وابدأ رحلتك معنا</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => setRole('customer')}
            className={cn(
              "p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 relative overflow-hidden",
              role === 'customer' ? "border-primary bg-primary/5" : "border-border bg-white"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", role === 'customer' ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">مشتري</p>
              <p className="text-[10px] text-muted-foreground">أريد التسوق</p>
            </div>
            {role === 'customer' && <CheckCircle2 className="absolute top-2 left-2 w-4 h-4 text-primary" />}
          </div>

          <div 
            onClick={() => setRole('merchant')}
            className={cn(
              "p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 relative overflow-hidden",
              role === 'merchant' ? "border-primary bg-primary/5" : "border-border bg-white"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", role === 'merchant' ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
              <Store className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">تاجر</p>
              <p className="text-[10px] text-muted-foreground">أريد البيع</p>
            </div>
            {role === 'merchant' && <CheckCircle2 className="absolute top-2 left-2 w-4 h-4 text-primary" />}
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                <User className="w-3.5 h-3.5 text-primary" /> الاسم الكامل
              </Label>
              <Input placeholder="أحمد محمد" className="h-14 rounded-2xl bg-muted/30 border-none px-6" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                <Mail className="w-3.5 h-3.5 text-primary" /> البريد الإلكتروني
              </Label>
              <Input type="email" placeholder="example@mail.com" className="h-14 rounded-2xl bg-muted/30 border-none px-6 text-left" dir="ltr" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                <Phone className="w-3.5 h-3.5 text-primary" /> رقم الهاتف
              </Label>
              <Input placeholder="77XXXXXXX" className="h-14 rounded-2xl bg-muted/30 border-none px-6 text-left" dir="ltr" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                <Lock className="w-3.5 h-3.5 text-primary" /> كلمة المرور
              </Label>
              <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-muted/30 border-none px-6 text-left" dir="ltr" required />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20 gap-2">
            {role === 'merchant' ? 'متابعة لإنشاء المتجر' : 'إنشاء الحساب الآن'} <UserPlus className="w-5 h-5" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground px-6 leading-relaxed">
          بالتسجيل في رواج، أنت توافق على <Link href="/terms" className="text-primary font-bold hover:underline">شروط الخدمة</Link> و <Link href="/privacy" className="text-primary font-bold hover:underline">سياسة الخصوصية</Link>
        </p>

        <div className="text-center">
          <Link href="/auth/login" className="text-sm font-bold text-primary hover:underline">
            لديك حساب بالفعل؟ سجل دخولك
          </Link>
        </div>
      </main>
    </div>
  )
}

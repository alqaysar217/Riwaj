
'use client';

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic for auth would go here
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <header className="mb-12">
        <Button variant="ghost" size="icon" asChild className="rounded-full bg-white shadow-sm border text-primary">
          <Link href="/auth/welcome">
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold text-primary">مرحباً بك مجدداً</h1>
          <p className="text-muted-foreground text-sm font-medium">سجل دخولك لمواصلة رحلتك في سوق رواج</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                <Mail className="w-3.5 h-3.5 text-primary" /> البريد الإلكتروني
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="example@mail.com" 
                className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-primary/20 text-left" 
                dir="ltr"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pr-1">
                <Label htmlFor="password" className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-primary" /> كلمة المرور
                </Label>
                <Link href="/auth/forgot-password" title="نسيت كلمة المرور؟" className="text-[10px] font-bold text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-primary/20 text-left" 
                  dir="ltr"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20 gap-2">
            تسجيل الدخول <LogIn className="w-5 h-5" />
          </Button>
        </form>

        <div className="pt-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground font-medium">ليس لديك حساب بعد؟</p>
          <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-primary text-primary font-bold hover:bg-primary/5">
            <Link href="/auth/register">إنشاء حساب جديد</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

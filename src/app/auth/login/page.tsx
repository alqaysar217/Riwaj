
'use client';

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Image Section */}
      <div className="relative h-[30vh] w-full">
        <Image 
          src={PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl || ""} 
          alt="Login" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="absolute top-6 right-6 rounded-full bg-white/20 backdrop-blur-md text-white border-none"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <main className="flex-1 max-w-md mx-auto w-full px-6 space-y-8 -mt-10 relative z-10">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-primary/5 space-y-6">
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
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-primary/20 text-left placeholder:text-right" 
                  dir="ltr"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <Label htmlFor="password" className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-primary" /> كلمة المرور
                  </Label>
                  <Link href="/auth/forgot-password" core-hint="forgot-password" className="text-[10px] font-bold text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-primary/20 text-left placeholder:text-right" 
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

          <div className="pt-4 text-center space-y-4">
            <p className="text-xs text-muted-foreground font-medium">ليس لديك حساب بعد؟</p>
            <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-primary text-primary font-bold hover:bg-primary/5">
              <Link href="/auth/register">إنشاء حساب جديد</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

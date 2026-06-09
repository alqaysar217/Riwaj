
'use client';

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, ShieldAlert, Store, User } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    const lowerEmail = email.toLowerCase().trim();

    // محاكاة نجاح الدخول
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('hasSeenWelcome', 'true')

    // Admin login logic
    if (lowerEmail === "admin" && password === "123456") {
      toast({
        title: "مرحباً أيها المدير",
        description: "جاري توجيهك إلى لوحة الإدارة المركزية لـ رواج.",
      })
      router.push('/admin')
      return
    }

    // Merchant login logic
    if (lowerEmail === "merchant" && password === "123456") {
      toast({
        title: "أهلاً بك يا شريك النجاح",
        description: "جاري توجيهك إلى لوحة تحكم متجرك.",
      })
      router.push('/merchant/dashboard')
      return
    }

    // Default user login (Customer)
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في رواج، استمتع برحلة تسوق أصيلة.",
    })
    router.push('/')
  }

  const heroImage = PlaceHolderImages.find(i => i.id === "hero-1")?.imageUrl || "/hero-1.png"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Image Section */}
      <div className="relative h-[35vh] w-full">
        <Image 
          src={heroImage} 
          alt="Login" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="absolute top-6 right-6 rounded-full bg-white/20 backdrop-blur-md text-white border-none hover:bg-white/40"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
        
        <div className="absolute bottom-12 right-8 z-20">
          <h2 className="text-4xl font-headline font-bold text-white drop-shadow-lg">رواج</h2>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.3em]">بوابتك للمنتجات اليمنية</p>
        </div>
      </div>

      <main className="flex-1 max-w-md mx-auto w-full px-6 space-y-8 -mt-8 relative z-30 pb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-primary/5 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold text-primary">مرحباً بك مجدداً</h1>
            <p className="text-muted-foreground text-sm font-medium">سجل دخولك لمواصلة رحلتك في سوق رواج</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-muted-foreground flex items-center gap-2 pr-1">
                  <User className="w-3.5 h-3.5 text-primary" /> اسم المستخدم أو البريد
                </Label>
                <Input 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل اسم المستخدم أو البريد" 
                  className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/20 text-right font-bold" 
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="h-14 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-2 focus-visible:ring-primary/20 text-right font-bold" 
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

            <Button type="submit" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 gap-3 transition-all hover:scale-[1.02] active:scale-95">
              تسجيل الدخول <LogIn className="w-5 h-5" />
            </Button>
          </form>

          {(email.toLowerCase().trim() === "admin" || email.toLowerCase().trim() === "merchant") && (
            <div className={cn(
              "p-4 rounded-2xl flex items-center gap-3 border animate-in fade-in zoom-in-95 duration-300",
              email.toLowerCase().trim() === "admin" ? "bg-orange-50 border-orange-100 text-orange-700" : "bg-blue-50 border-blue-100 text-blue-700"
            )}>
               <div className={cn(
                 "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                 email.toLowerCase().trim() === "admin" ? "bg-white text-orange-600" : "bg-white text-blue-600"
               )}>
                 {email.toLowerCase().trim() === "admin" ? <ShieldAlert className="w-5 h-5" /> : <Store className="w-5 h-5" />}
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">وضع الدخول السريع</p>
                 <p className="text-xs font-bold">نمط الدخول كـ {email.toLowerCase().trim() === "admin" ? "مدير للنظام" : "تاجر معتمد"} مفعّل.</p>
               </div>
            </div>
          )}

          <div className="pt-4 text-center space-y-4">
            <p className="text-xs text-muted-foreground font-medium">ليس لديك حساب بعد؟</p>
            <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all">
              <Link href="/auth/register">إنشاء حساب جديد</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

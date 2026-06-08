import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { HelpCircle, ArrowRight, MessageCircle, Phone, Mail, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  const faqs = [
    "كيف يمكنني تتبع طلبي؟",
    "ما هي طرق الدفع المتاحة؟",
    "كيف يمكنني استرجاع منتج؟",
    "هل التوصيل متاح لجميع المحافظات؟",
  ]

  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/profile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-headline font-bold text-primary">مركز المساعدة</h1>
          </div>

          <div className="bg-primary p-8 rounded-3xl text-white mb-8">
            <h2 className="text-xl font-bold mb-4">كيف يمكننا مساعدتك اليوم؟</h2>
            <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-xl" placeholder="ابحث عن المساعدة..." />
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-bold text-lg mb-4">الأسئلة الشائعة</h3>
              <div className="grid gap-3">
                {faqs.map((faq, i) => (
                  <button key={i} className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between text-right hover:bg-primary/5 transition-colors group">
                    <span className="text-sm font-medium">{faq}</span>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs">واتساب</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary">
                  <Phone className="w-6 h-6" />
                  <span className="text-xs">اتصال مباشر</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary">
                  <Mail className="w-6 h-6" />
                  <span className="text-xs">البريد الإلكتروني</span>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

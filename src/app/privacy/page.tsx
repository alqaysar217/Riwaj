import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Shield, ArrowRight, Lock, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const sections = [
    { icon: Lock, title: "حماية البيانات", description: "نحن نستخدم أحدث تقنيات التشفير لضمان أمان بياناتك الشخصية ومعلومات الدفع." },
    { icon: Eye, title: "سياسة الخصوصية", description: "لا نقوم بمشاركة بياناتك مع أي جهات خارجية دون موافقة صريحة منك." },
    { icon: FileText, title: "شروط الاستخدام", description: "تعرف على حقوقك والتزاماتك عند استخدام منصة رواج." },
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
            <h1 className="text-2xl font-headline font-bold text-primary">الأمان والخصوصية</h1>
          </div>

          <div className="space-y-6">
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 text-center mb-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-4 shadow-sm">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">تسوقك آمن مع رواج</h2>
              <p className="text-sm text-muted-foreground">نلتزم بأعلى معايير الأمان لحماية تجربتك في السوق اليمني.</p>
            </div>

            <div className="grid gap-4">
              {sections.map((section, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}


"use client"

import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { 
  HelpCircle, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronLeft, 
  Search,
  BookOpen,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer: "يمكنك تتبع طلبك بكل سهولة من خلال الذهاب إلى صفحة 'طلباتي' في حسابك الشخصي، حيث ستجد تفاصيل حالة الطلب وموقعه الحالي مع مندوب التوصيل."
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نحن ندعم حالياً الدفع عند الاستلام كخيار أساسي، بالإضافة إلى التحويل عبر خدمة الكريمي (أو إم تي). نعمل جاهدين لتوفير الدفع عبر البطاقات الإلكترونية والمحافظ المحلية قريباً."
  },
  {
    question: "كيف يمكنني استرجاع منتج؟",
    answer: "في حال وجود عيب مصنعي أو مخالفة للمواصفات، يمكنك تقديم طلب استرجاع خلال 3 أيام من تاريخ الاستلام. يرجى التواصل مع الدعم الفني وتزويدنا بصور للمنتج وتفاصيل المشكلة."
  },
  {
    question: "هل التوصيل متاح لجميع المحافظات؟",
    answer: "نعم، نقوم بالتوصيل إلى معظم المحافظات اليمنية الرئيسية (صنعاء، عدن، تعز، حضرموت، إلخ) عبر شركاء توصيل محليين موثوقين لضمان وصول المنتج بأمان."
  },
  {
    question: "كيف يمكنني التواصل مع التاجر مباشرة؟",
    answer: "في صفحة كل منتج، ستجد زراً للتواصل المباشر مع التاجر عبر الدردشة الداخلية أو الواتساب للاستفسار عن أي تفاصيل قبل عملية الشراء."
  }
]

export default function HelpPage() {
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
            <h1 className="text-2xl font-headline font-bold text-primary">مركز المساعدة</h1>
          </div>

          {/* Search Section */}
          <div className="bg-primary p-8 rounded-3xl text-white mb-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h2 className="text-xl font-bold mb-4 relative z-10">كيف يمكننا مساعدتك اليوم؟</h2>
            <div className="relative z-10">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
              <Input 
                className="bg-white border-none text-foreground placeholder:text-muted-foreground h-12 rounded-xl pr-10" 
                placeholder="ابحث عن المشكلة أو السؤال..." 
              />
            </div>
          </div>

          <div className="space-y-10">
            {/* FAQs Accordion */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg">الأسئلة الشائعة</h3>
              </div>
              
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden px-4">
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-none">
                      <AccordionTrigger className="text-right hover:no-underline hover:text-primary transition-colors font-bold text-sm py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-xs leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Contact Support */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg">تواصل معنا</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                >
                  <MessageCircle className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-xs font-bold">واتساب</p>
                    <p className="text-[10px] text-muted-foreground">رد فوري</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                >
                  <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-xs font-bold">اتصال مباشر</p>
                    <p className="text-[10px] text-muted-foreground">8:00 ص - 8:00 م</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 flex-col gap-2 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                >
                  <Mail className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-xs font-bold">البريد الإلكتروني</p>
                    <p className="text-[10px] text-muted-foreground">خلال 24 ساعة</p>
                  </div>
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

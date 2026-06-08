
"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function CartPage() {
  // بيانات تجريبية للسلة
  const cartItems = [
    { id: "1", title: "بن خولاني فاخر - درجة أولى", price: 4500, quantity: 2, image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl },
    { id: "2", title: "عسل سدر ملكي - عصيمي", price: 12000, quantity: 1, image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 1000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="pb-24">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-primary opacity-20" />
          </div>
          <h1 className="text-2xl font-headline font-bold mb-2">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-8 text-sm">يبدو أنك لم تضف أي منتجات بعد. اكتشف كنوز اليمن الآن!</p>
          <Button asChild className="rounded-full px-10 h-12 font-bold bg-primary hover:bg-primary/90">
            <Link href="/">ابدأ التسوق</Link>
          </Button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary p-0">
            <Link href="/" className="flex items-center gap-1 font-bold text-xs">
              <ArrowRight className="w-4 h-4 ml-1" /> العودة للتسوق
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">سلة التسوق</h1>
            <p className="text-muted-foreground text-xs">لديك {cartItems.length} منتجات في سلتك</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-3xl border shadow-sm flex gap-4 group hover:border-primary/20 transition-all">
                {/* Product Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border bg-muted">
                  <Image 
                    src={item.image || ""} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-primary font-bold text-sm">{item.price} ر.ي</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/5 -mt-1 rounded-full w-8 h-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-muted/30 rounded-xl p-1 border">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white text-primary">
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white text-primary">
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    
                    <div className="text-left">
                      <p className="text-[10px] text-muted-foreground font-medium mb-0.5">الإجمالي الفرعي</p>
                      <p className="font-bold text-primary text-base">{item.price * item.quantity} ر.ي</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border shadow-sm sticky top-24">
              <h2 className="font-headline font-bold text-xl mb-6 text-primary">ملخص الطلب</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">المجموع الفرعي</span>
                  <span className="font-bold">{subtotal} ر.ي</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">رسوم التوصيل</span>
                  <span className="font-bold text-green-600">{shipping} ر.ي</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg text-primary">الإجمالي الكلي</span>
                  <div className="text-left">
                    <span className="font-bold text-primary text-2xl">{total} ر.ي</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 text-base font-bold rounded-2xl shadow-lg shadow-secondary/20">
                  <Link href="/checkout">إتمام عملية الشراء</Link>
                </Button>
                <Button variant="outline" asChild className="w-full border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/5 h-12 rounded-2xl font-bold gap-2">
                  <Link href="/">مواصلة التسوق <ArrowLeft className="w-4 h-4" /></Link>
                </Button>
              </div>

              {/* Secure Checkout Banner */}
              <div className="mt-8 pt-6 border-t border-dashed">
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-primary">تسوق آمن وموثوق 100%</p>
                    <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">حقوقك محفوظة بالكامل عبر نظام حماية المشتري في منصة رواج</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

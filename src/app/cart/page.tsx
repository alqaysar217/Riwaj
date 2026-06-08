
"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function CartPage() {
  const cartItems = [
    { id: "1", title: "بن خولاني فاخر", price: 4500, quantity: 2, image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl },
    { id: "2", title: "عسل سدر ملكي", price: 12000, quantity: 1, image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 1000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="pb-24">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary opacity-20" />
          </div>
          <h1 className="text-2xl font-headline font-bold mb-2">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-8">لم تقم بإضافة أي منتجات للسلة بعد</p>
          <Button asChild className="rounded-full px-8">
            <Link href="/">ابدأ التسوق</Link>
          </Button>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-primary">سلة التسوق</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border shadow-sm flex gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border">
                  <Image src={item.image || ""} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
                      <p className="text-primary font-bold">{item.price} ر.ي</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/5 -mt-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden h-9">
                      <Button variant="ghost" size="icon" className="h-full w-9 rounded-none hover:bg-primary/5">
                        <Plus className="w-3 h-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-full w-9 rounded-none hover:bg-primary/5">
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="font-bold text-primary">{item.price * item.quantity} ر.ي</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <h2 className="font-bold text-xl mb-4">ملخص الطلب</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span className="font-bold">{subtotal} ر.ي</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">رسوم التوصيل</span>
                <span className="font-bold">{shipping} ر.ي</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg pt-2">
                <span className="font-bold text-primary">الإجمالي</span>
                <span className="font-bold text-primary text-2xl">{total} ر.ي</span>
              </div>
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 text-lg font-bold mt-6 rounded-full shadow-lg shadow-secondary/20">
                <Link href="/checkout">إتمام عملية الشراء</Link>
              </Button>
              <Button variant="ghost" asChild className="w-full text-muted-foreground hover:text-primary gap-2 mt-2">
                <Link href="/">مواصلة التسوق <ArrowLeft className="w-4 h-4" /></Link>
              </Button>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">تسوق آمن 100%</p>
                <p className="text-[10px] text-muted-foreground">حقوقك محفوظة بالكامل عبر منصة رواج</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

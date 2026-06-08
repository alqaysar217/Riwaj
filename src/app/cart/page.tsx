
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  MessageSquare, 
  Ticket, 
  Wallet, 
  ChevronDown,
  ChevronUp,
  CreditCard,
  CheckCircle2,
  Edit2,
  Copy,
  MessageCircle
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState([
    { id: "1", title: "بن خولاني فاخر - درجة أولى", price: 4500, quantity: 2, image: PlaceHolderImages.find(i => i.id === "hero-coffee")?.imageUrl },
    { id: "2", title: "عسل سدر ملكي - عصيمي", price: 12000, quantity: 1, image: PlaceHolderImages.find(i => i.id === "cat-honey")?.imageUrl },
  ])

  const [showNote, setShowNote] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [note, setNote] = useState("")
  const [coupon, setCoupon] = useState("")
  const [walletBalance] = useState(50000)

  const banks = [
    { id: "kuraimi", name: "بنك الكريمي", account: "1234567", owner: "مؤسسة رواج التجارية", logo: "https://picsum.photos/seed/kuraimi/100/100" },
    { id: "busairi", name: "شركة البسيري للصرافة", account: "7654321", owner: "مؤسسة رواج التجارية", logo: "https://picsum.photos/seed/busairi/100/100" },
    { id: "dawood", name: "بن دول للصرافة", account: "9876543", owner: "مؤسسة رواج التجارية", logo: "https://picsum.photos/seed/dawood/100/100" },
    { id: "amjad", name: "أمجاد حضرموت", account: "1122334", owner: "مؤسسة رواج التجارية", logo: "https://picsum.photos/seed/amjad/100/100" },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 1000
  const total = subtotal + shipping

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ))
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "تم النسخ!",
      description: `تم نسخ رقم الحساب ${text} إلى الحافظة.`,
    })
  }

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
            <p className="text-muted-foreground text-xs">إدارة منتجاتك وإتمام عملية الشراء</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* Products Table */}
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="text-right font-bold text-primary">المنتج</TableHead>
                      <TableHead className="text-center font-bold text-primary">الكمية</TableHead>
                      <TableHead className="text-center font-bold text-primary">السعر</TableHead>
                      <TableHead className="text-center font-bold text-primary">الإجمالي</TableHead>
                      <TableHead className="text-center font-bold text-primary">إجراء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <TableRow className="cursor-pointer hover:bg-muted/10 transition-colors">
                            <TableCell className="text-right">
                              <span className="font-bold text-[11px] sm:text-sm line-clamp-2">{item.title}</span>
                            </TableCell>
                            <TableCell className="text-center font-bold text-xs">{item.quantity}</TableCell>
                            <TableCell className="text-center text-[10px] sm:text-xs whitespace-nowrap">{item.price} ر.ي</TableCell>
                            <TableCell className="text-center font-bold text-primary text-[11px] sm:text-sm whitespace-nowrap">{item.price * item.quantity} ر.ي</TableCell>
                            <TableCell className="text-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </DialogTrigger>
                        <DialogContent className="rounded-[32px] w-[92vw] max-w-md sm:max-w-sm border-none shadow-2xl p-0 overflow-hidden [&>button]:left-4 [&>button]:right-auto">
                          <DialogHeader className="p-6 pb-0">
                            <DialogTitle className="text-xl font-headline font-bold text-primary text-right">تعديل المنتج</DialogTitle>
                          </DialogHeader>
                          <div className="p-6 space-y-6">
                            <div className="flex gap-4 bg-muted/20 p-4 rounded-3xl border border-dashed">
                              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border bg-white shrink-0">
                                <Image src={item.image || ""} alt={item.title} fill className="object-cover" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
                                <p className="text-primary font-bold text-lg">{item.price} <span className="text-[10px]">ر.ي</span></p>
                                <p className="text-xs text-muted-foreground">الإجمالي: <span className="text-foreground font-bold">{item.price * item.quantity} ر.ي</span></p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-between bg-muted/30 rounded-2xl p-3 border">
                                <span className="font-bold text-xs pr-2">تعديل الكمية</span>
                                <div className="flex items-center gap-4">
                                  <Button variant="secondary" size="icon" className="rounded-xl h-10 w-10 shadow-sm" onClick={() => updateQuantity(item.id, 1)}>
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                  <span className="w-8 text-center text-lg font-bold">{item.quantity}</span>
                                  <Button variant="secondary" size="icon" className="rounded-xl h-10 w-10 shadow-sm" onClick={() => updateQuantity(item.id, -1)}>
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <Button variant="destructive" className="w-full rounded-2xl gap-2 h-12 font-bold" onClick={() => removeItem(item.id)}>
                                <Trash2 className="w-4 h-4" /> حذف المنتج من السلة
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Notes & Coupon Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-3">
                <button 
                  onClick={() => setShowNote(!showNote)}
                  className="flex items-center justify-between w-full font-bold text-sm text-primary group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    هل تريد إضافة ملاحظة للطلب؟
                  </div>
                  {showNote ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showNote && (
                  <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Textarea 
                      placeholder="أضف تعليمات خاصة للطلب هنا..." 
                      className="rounded-2xl bg-muted/20 border-none resize-none h-24"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <Button className="w-full rounded-xl h-10 text-xs font-bold" onClick={() => setShowNote(false)}>حفظ الملاحظة</Button>
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-3xl border shadow-sm space-y-3">
                <button 
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="flex items-center justify-between w-full font-bold text-sm text-primary group"
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    هل لديك كوبون خصم؟
                  </div>
                  {showCoupon ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showCoupon && (
                  <div className="flex gap-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Input 
                      placeholder="أدخل الرمز" 
                      className="rounded-xl bg-muted/20 border-none h-10"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button variant="secondary" className="rounded-xl px-6 h-10 text-xs font-bold">تطبيق</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Selection */}
            <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-6">
              <h2 className="font-headline font-bold text-lg text-primary flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-secondary" /> طريقة الدفع
              </h2>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="rounded-2xl h-14 bg-muted/30 border-none font-bold">
                  <SelectValue placeholder="اختر طريقة الدفع المفضلة" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="cod">الدفع عند الاستلام</SelectItem>
                  <SelectItem value="wallet">الدفع من المحفظة</SelectItem>
                  <SelectItem value="accounts">الدفع عبر حساباتنا البنكية</SelectItem>
                </SelectContent>
              </Select>

              {/* Conditional Payment Views */}
              {paymentMethod === "wallet" && (
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-bold mb-1">رصيدك المتاح في المحفظة</p>
                    <p className="text-2xl font-bold text-primary">{walletBalance} ر.ي</p>
                  </div>
                  {walletBalance < total && (
                    <p className="text-[10px] text-destructive font-bold">عذراً، الرصيد غير كافٍ لإتمام العملية</p>
                  )}
                </div>
              )}

              {paymentMethod === "accounts" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" /> اختر الحساب المناسب لك للتحويل:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {banks.map((bank) => (
                        <div key={bank.id} className="bg-white p-4 rounded-2xl border flex items-center gap-4 hover:border-primary/40 transition-all group relative">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border bg-muted shrink-0">
                            <Image src={bank.logo} alt={bank.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs truncate mb-0.5">{bank.name}</p>
                            <div 
                              className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors"
                              onClick={() => copyToClipboard(bank.account)}
                            >
                              <p className="text-[11px] text-primary font-bold" dir="ltr">{bank.account}</p>
                              <Copy className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-[9px] text-muted-foreground truncate">{bank.owner}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20 flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm shrink-0">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary mb-1">ملاحظة هامة جداً:</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        بعد عملية الإيداع يرجى تصوير السند وإرساله واتساب على الرقم اليمني <span className="text-primary font-bold" dir="ltr">775258830</span> ليتسنى لنا تأكيد طلبكم وشحنه فوراً.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border shadow-sm sticky top-24">
              <h2 className="font-headline font-bold text-xl mb-6 text-primary">ملخص الفاتورة</h2>
              
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
                <Button 
                  disabled={!paymentMethod || (paymentMethod === 'wallet' && walletBalance < total)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white h-14 text-lg font-bold rounded-2xl shadow-lg shadow-secondary/20 gap-2"
                >
                  تأكيد وإتمام الشراء <CheckCircle2 className="w-5 h-5" />
                </Button>
                <Button variant="outline" asChild className="w-full border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/5 h-12 rounded-2xl font-bold gap-2">
                  <Link href="/">مواصلة التسوق</Link>
                </Button>
              </div>

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


import Image from "next/image"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Truck, CreditCard, Wallet } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-headline font-bold mb-8 text-primary">إتمام الطلب</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <section className="bg-white p-6 rounded-2xl border shadow-sm">
                <h2 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-secondary" /> عنوان التوصيل
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" placeholder="أحمد محمد" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="77XXXXXXX" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="city">المدينة والحي</Label>
                    <Input id="city" placeholder="صنعاء - حي حدة" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">العنوان بالتفصيل</Label>
                    <Input id="address" placeholder="شارع الخمسين - خلف بنك التضامن" />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 rounded-2xl border shadow-sm">
                <h2 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-secondary" /> طريقة الدفع
                </h2>
                <RadioGroup defaultValue="cod" className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse border p-4 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer flex items-center justify-between">
                      <span className="font-bold">الدفع عند الاستلام</span>
                      <Wallet className="w-5 h-5 text-muted-foreground" />
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse border p-4 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
                    <RadioGroupItem value="kuraimi" id="kuraimi" />
                    <Label htmlFor="kuraimi" className="flex-1 cursor-pointer flex items-center justify-between">
                      <span className="font-bold">الكريمي (أو إم تي)</span>
                      <span className="text-xs text-secondary font-bold">الأكثر سرعة</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse border p-4 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="font-bold">بطاقة إلكترونية (قريباً)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </section>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h2 className="font-bold text-xl mb-6">ملخص الطلب</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-muted rounded relative overflow-hidden shrink-0">
                      <Image src="https://picsum.photos/seed/p1/100/100" alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">بن خولاني فاخر</p>
                      <p className="text-xs text-muted-foreground">الكمية: 2</p>
                    </div>
                    <p className="text-xs font-bold text-primary">9000 ر.ي</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-muted rounded relative overflow-hidden shrink-0">
                      <Image src="https://picsum.photos/seed/p2/100/100" alt="" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold line-clamp-1">عسل سدر ملكي</p>
                      <p className="text-xs text-muted-foreground">الكمية: 1</p>
                    </div>
                    <p className="text-xs font-bold text-primary">12000 ر.ي</p>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع</span>
                    <span className="font-bold">21000 ر.ي</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التوصيل</span>
                    <span className="font-bold">1000 ر.ي</span>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex justify-between text-xl mb-8">
                  <span className="font-bold">الإجمالي</span>
                  <span className="font-bold text-primary">22000 ر.ي</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-bold rounded-full gap-2">
                  تأكيد الطلب <CheckCircle2 className="w-5 h-5" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-4">بضغطك على تأكيد الطلب أنت توافق على شروط الخدمة</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

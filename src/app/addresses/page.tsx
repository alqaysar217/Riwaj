
"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, ArrowRight, Trash2, Navigation, User } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, title: "المنزل", details: "صنعاء، حي حدة، شارع الخمسين", phone: "77XXXXXXX" },
    { id: 2, title: "العمل", details: "صنعاء، التحرير، عمارة البركة", phone: "77XXXXXXX" },
  ])

  const [addressType, setAddressType] = useState<string>("home")
  const [newAddress, setNewAddress] = useState({ 
    title: "", 
    details: "", 
    phone: "",
    recipientName: "" 
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleAddAddress = () => {
    let finalTitle = ""
    if (addressType === "home") finalTitle = "المنزل"
    else if (addressType === "work") finalTitle = "العمل"
    else finalTitle = newAddress.title || "عنوان مخصص"

    if (newAddress.details && newAddress.phone) {
      const id = Date.now()
      setAddresses([...addresses, { 
        id, 
        title: finalTitle, 
        details: newAddress.details, 
        phone: newAddress.phone 
      }])
      setNewAddress({ title: "", details: "", phone: "", recipientName: "" })
      setAddressType("home")
      setIsOpen(false)
    }
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Link href="/profile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-headline font-bold text-primary">عناويني</h1>
            </div>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full gap-2">
                  <Plus className="w-4 h-4" /> إضافة عنوان
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl sm:max-w-md border-none shadow-2xl [&>button]:left-4 [&>button]:right-auto">
                <DialogHeader className="text-right">
                  <DialogTitle className="text-xl font-headline font-bold text-primary">إضافة عنوان جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-6">
                  <div className="space-y-2">
                    <Label className="text-right block font-bold text-xs">نوع العنوان</Label>
                    <Select value={addressType} onValueChange={setAddressType}>
                      <SelectTrigger className="rounded-xl h-12 bg-muted/30 border-none">
                        <SelectValue placeholder="اختر نوع العنوان" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="home">المنزل</SelectItem>
                        <SelectItem value="work">العمل</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {addressType === "other" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="recipientName" className="text-right block font-bold text-xs">اسم مستلم الطلب</Label>
                        <Input 
                          id="recipientName" 
                          value={newAddress.recipientName}
                          onChange={(e) => setNewAddress({...newAddress, recipientName: e.target.value})}
                          placeholder="مثلاً: محمد علي" 
                          className="rounded-xl h-12 bg-muted/30 border-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-right block font-bold text-xs">لقب العنوان</Label>
                        <Input 
                          id="title" 
                          value={newAddress.title}
                          onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                          placeholder="مثلاً: المزرعة، الاستراحة" 
                          className="rounded-xl h-12 bg-muted/30 border-none"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-right block font-bold text-xs">العنوان بالتفصيل</Label>
                    <Input 
                      id="details" 
                      value={newAddress.details}
                      onChange={(e) => setNewAddress({...newAddress, details: e.target.value})}
                      placeholder="المدينة، الحي، اسم الشارع..." 
                      className="rounded-xl h-12 bg-muted/30 border-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-right block font-bold text-xs">رقم الهاتف للتواصل</Label>
                    <Input 
                      id="phone" 
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      placeholder="77XXXXXXX" 
                      className="rounded-xl h-12 bg-muted/30 border-none text-left"
                      dir="ltr"
                    />
                  </div>

                  <Button variant="outline" className="w-full rounded-xl h-12 border-primary/20 text-primary gap-2 hover:bg-primary/5 font-bold">
                    <Navigation className="w-4 h-4" /> تحديد موقعي بالأحداثيات على الخريطة
                  </Button>
                </div>
                <DialogFooter className="flex gap-3 sm:justify-start">
                  <Button className="flex-1 rounded-xl h-12 font-bold bg-primary hover:bg-primary/90" onClick={handleAddAddress}>حفظ العنوان</Button>
                  <Button variant="ghost" className="flex-1 rounded-xl h-12 font-bold text-muted-foreground" onClick={() => setIsOpen(false)}>إلغاء</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="bg-white p-5 rounded-2xl border shadow-sm flex gap-4 group hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-base">{address.title}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive rounded-full hover:bg-destructive/5"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{address.details}</p>
                    <p className="text-xs font-bold text-primary" dir="ltr">{address.phone}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="font-bold text-lg mb-1">لا توجد عناوين بعد</h3>
                <p className="text-muted-foreground text-xs">أضف عنوانك الأول لتسهيل عملية التوصيل في طلباتك القادمة</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

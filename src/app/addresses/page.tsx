"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Plus, 
  ArrowRight, 
  Trash2, 
  Navigation, 
  User, 
  Phone, 
  Tag, 
  Type, 
  Loader2, 
  CheckCircle2, 
  Star, 
  MoreVertical,
  Edit2
} from "lucide-react"
import { useRouter } from "next/navigation"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function AddressesPage() {
  const router = useRouter()
  const [addresses, setAddresses] = useState([
    { id: 1, title: "المنزل", details: "صنعاء، حي حدة، شارع الخمسين، عمارة الأمل", phone: "775258830", isDefault: true },
    { id: 2, title: "العمل", details: "صنعاء، حي التحرير، مبنى رواج للتجارة، الدور الثالث", phone: "775258830", isDefault: false },
    { id: 3, title: "المزرعة", details: "إب، وادي بناء، قرب الشلال الكبير", phone: "770000000", isDefault: false },
  ])

  const [addressType, setAddressType] = useState<string>("home")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [newAddress, setNewAddress] = useState({ 
    title: "", 
    details: "", 
    phone: "",
    recipientName: "" 
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleGetLocation = () => {
    setIsLoadingLocation(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setNewAddress({
            ...newAddress,
            details: `إحداثيات الموقع: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          })
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location", error)
          setIsLoadingLocation(false)
        }
      )
    } else {
      alert("خاصية تحديد الموقع غير مدعومة في متصفحك")
      setIsLoadingLocation(false)
    }
  }

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
        phone: newAddress.phone,
        isDefault: addresses.length === 0
      }])
      setNewAddress({ title: "", details: "", phone: "", recipientName: "" })
      setAddressType("home")
      setIsOpen(false)
    }
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Action */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center border shadow-sm text-primary hover:bg-primary/5 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-headline font-bold text-primary">عناويني</h1>
                <p className="text-[10px] text-muted-foreground font-bold">إدارة مواقع التوصيل الخاصة بك</p>
              </div>
            </div>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-2xl gap-2 font-bold px-5 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10">
                  <Plus className="w-4 h-4" /> إضافة عنوان
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[2.5rem] sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-6 [&>button]:right-auto">
                <DialogHeader className="p-8 bg-muted/30 border-b">
                  <DialogTitle className="text-xl font-headline font-bold text-primary text-right flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" /> إضافة عنوان جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="p-8 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-right flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                      <Type className="w-3.5 h-3.5 text-primary" /> نوع العنوان
                    </Label>
                    <Select value={addressType} onValueChange={setAddressType}>
                      <SelectTrigger className="rounded-xl h-12 bg-muted/30 border-none font-bold text-right" dir="rtl">
                        <SelectValue placeholder="اختر نوع العنوان" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-none shadow-xl">
                        <SelectItem value="home">المنزل</SelectItem>
                        <SelectItem value="work">العمل</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {addressType === "other" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="title" className="text-right flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                        <Tag className="w-3.5 h-3.5 text-primary" /> لقب العنوان
                      </Label>
                      <Input 
                        id="title" 
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                        placeholder="مثلاً: المزرعة، الاستراحة" 
                        className="rounded-xl h-12 bg-muted/30 border-none font-bold"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-right flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> العنوان بالتفصيل
                    </Label>
                    <Input 
                      id="details" 
                      value={newAddress.details}
                      onChange={(e) => setNewAddress({...newAddress, details: e.target.value})}
                      placeholder="المدينة، الحي، اسم الشارع..." 
                      className="rounded-xl h-12 bg-muted/30 border-none font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-right flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                      <Phone className="w-3.5 h-3.5 text-primary" /> رقم الهاتف للتواصل
                    </Label>
                    <Input 
                      id="phone" 
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      placeholder="77XXXXXXX" 
                      className="rounded-xl h-12 bg-muted/30 border-none text-left font-bold"
                      dir="ltr"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleGetLocation}
                    disabled={isLoadingLocation}
                    className="w-full rounded-xl h-12 border-primary/20 text-primary gap-2 hover:bg-primary/5 font-bold"
                  >
                    {isLoadingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                    تحديد موقعي التلقائي
                  </Button>
                </div>
                <DialogFooter className="p-8 pt-0 flex gap-3 sm:justify-start">
                  <Button className="flex-1 rounded-xl h-12 font-bold bg-primary hover:bg-primary/90" onClick={handleAddAddress}>حفظ العنوان</Button>
                  <Button variant="ghost" className="flex-1 rounded-xl h-12 font-bold text-muted-foreground" onClick={() => setIsOpen(false)}>إلغاء</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Addresses List */}
          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={cn(
                    "bg-white p-5 rounded-[2rem] border transition-all relative group overflow-hidden",
                    address.isDefault ? "border-primary/40 bg-primary/[0.01] shadow-md ring-1 ring-primary/20" : "border-border shadow-sm hover:border-primary/20"
                  )}
                >
                  <div className="flex gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-300",
                      address.isDefault ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
                    )}>
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-foreground">{address.title}</h3>
                          {address.isDefault && (
                            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-secondary" /> العنوان الافتراضي
                            </Badge>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/5 text-muted-foreground hover:text-primary">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl p-2 w-48 shadow-xl border-none">
                            <DropdownMenuItem className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer">
                              <Edit2 className="w-3.5 h-3.5" /> تعديل العنوان
                            </DropdownMenuItem>
                            {!address.isDefault && (
                              <DropdownMenuItem 
                                className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer text-secondary"
                                onClick={() => handleSetDefault(address.id)}
                              >
                                <Star className="w-3.5 h-3.5" /> تعيين كافتراضي
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer text-destructive hover:bg-destructive/5"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" /> حذف العنوان
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{address.details}</p>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5 text-primary">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold" dir="ltr">{address.phone}</span>
                         </div>
                         {address.isDefault && (
                           <div className="flex items-center gap-1.5 text-green-600 ml-auto">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-bold">مستخدم حالياً للتوصيل</span>
                           </div>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-muted/20 rounded-[3rem] border border-dashed border-primary/20">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MapPin className="w-10 h-10 text-primary opacity-20" />
                </div>
                <h3 className="font-bold text-lg mb-1">لا توجد عناوين بعد</h3>
                <p className="text-muted-foreground text-xs">أضف عنوانك الأول لتسهيل عملية التوصيل في طلباتك القادمة</p>
              </div>
            )}
          </div>

          {/* Info Tip */}
          <div className="mt-8 bg-primary/5 p-6 rounded-[2rem] border border-primary/10 flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 text-secondary">
                <Star className="w-5 h-5 fill-secondary" />
             </div>
             <div>
                <p className="font-bold text-sm text-primary mb-1">نصيحة رواج:</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  تعيين عنوان "المنزل" كافتراضي يسرّع عملية إتمام الطلب بضغطة زر واحدة. يمكنك تغيير العنوان الافتراضي في أي وقت من قائمة الخيارات.
                </p>
             </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

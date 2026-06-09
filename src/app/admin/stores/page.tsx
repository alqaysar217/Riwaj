'use client';

import { useState, useMemo } from "react"
import { 
  Store, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertCircle, 
  MoreVertical, 
  MapPin, 
  ShoppingBag, 
  Star, 
  ExternalLink,
  Ban,
  CheckCircle2,
  X,
  Plus,
  LayoutGrid,
  Info,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const INITIAL_STORES = [
  { id: 1, name: "محامص الجبال", owner: "أحمد علي", category: "البن والقهوة", status: "verified", rating: 4.8, products: 45, location: "صنعاء", banner: "/logo-stores-ditales-1.png", avatar: "/logo-stores-1.png" },
  { id: 2, name: "رحيق الوادي", owner: "سالم العفيفي", category: "العسل الطبيعي", status: "verified", rating: 4.9, products: 32, location: "حضرموت", banner: "/logo-stores-ditales-2.png", avatar: "/logo-stores-2.png" },
  { id: 3, name: "بيت الفخار", owner: "خالد الزبيدي", category: "الحرف اليدوية", status: "pending", rating: 4.5, products: 12, location: "صنعاء", banner: "/logo-stores-ditales-3.png", avatar: "/logo-stores-3.png" },
  { id: 4, name: "مأكولات الأجداد", owner: "فاطمة باوزير", category: "الأطعمة", status: "verified", rating: 4.6, products: 28, location: "تعز", banner: "/logo-stores-ditales-4.png", avatar: "/logo-stores-5.png" },
  { id: 5, name: "صائغ العقيق", owner: "عمر فاروق", category: "المجوهرات", status: "suspended", rating: 4.9, products: 18, location: "صنعاء", banner: "/logo-stores-ditales-5.png", avatar: "/logo-stores-6.png" },
];

export default function AdminStores() {
  const { toast } = useToast()
  const [stores, setStores] = useState(INITIAL_STORES)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           store.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || store.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
  }, [searchTerm, filterStatus, stores])

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'verified' : 'suspended';
    setStores(stores.map(s => s.id === id ? { ...s, status: newStatus } : s))
    toast({
      title: newStatus === 'verified' ? "تم تفعيل المتجر" : "تم إيقاف المتجر",
      description: `تم تحديث حالة المتجر بنجاح.`,
    })
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">إدارة المتاجر</h1>
          <p className="text-muted-foreground text-sm font-medium">مراقبة أداء المتاجر والتحقق من هوية التجار في المنصة</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 text-center">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">إجمالي المتاجر</p>
            <p className="text-xl font-bold text-primary">{stores.length}</p>
          </div>
          <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-100 text-center">
            <p className="text-[10px] text-orange-600 font-bold uppercase">بانتظار التوثيق</p>
            <p className="text-xl font-bold text-orange-600">{stores.filter(s => s.status === 'pending').length}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث باسم المتجر أو التاجر..." 
            className="h-12 pr-11 rounded-xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'verified', 'pending', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "rounded-xl h-12 px-5 font-bold text-xs capitalize transition-all border shrink-0",
                filterStatus === status 
                  ? "bg-primary text-white border-primary shadow-lg scale-105" 
                  : "bg-white text-muted-foreground border-transparent shadow-sm hover:border-primary/20"
              )}
            >
              {status === 'all' ? 'الكل' : status === 'verified' ? 'موثق' : status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
            </button>
          ))}
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-500 bg-white border border-transparent hover:border-primary/10">
            <div className="relative h-28 bg-muted">
               <Image src={store.banner} alt="" fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
               <div className="absolute top-4 left-4">
                  <Badge className={cn(
                    "text-[8px] font-bold border-none px-2 py-0.5 rounded-lg",
                    store.status === 'verified' ? "bg-green-500 text-white" : 
                    store.status === 'pending' ? "bg-orange-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {store.status === 'verified' ? 'موثق' : store.status === 'pending' ? 'بانتظار المراجعة' : 'موقوف'}
                  </Badge>
               </div>
            </div>
            <CardContent className="relative pt-12 pb-6 px-6">
               <div className="absolute -top-10 right-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-lg rounded-2xl">
                     <AvatarImage src={store.avatar} className="object-cover" />
                     <AvatarFallback className="bg-primary/5 text-primary font-bold">{store.name[0]}</AvatarFallback>
                  </Avatar>
               </div>

               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-primary truncate flex items-center gap-1.5">
                      {store.name}
                      {store.status === 'verified' && <ShieldCheck className="w-4 h-4 text-green-600" />}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-bold">بواسطة: {store.owner}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-primary/5">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-2 w-48 shadow-xl border-none">
                      <DropdownMenuItem asChild className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer text-primary">
                        <Link href={`/stores/${store.id}`}>
                           <ExternalLink className="w-3.5 h-3.5" /> عرض المتجر
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer"
                        onClick={() => handleToggleStatus(store.id, store.status)}
                      >
                         {store.status === 'suspended' ? (
                           <><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> تفعيل المتجر</>
                         ) : (
                           <><Ban className="w-3.5 h-3.5 text-destructive" /> إيقاف مؤقت</>
                         )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg gap-2 font-bold text-xs py-2.5 cursor-pointer text-destructive">
                         <AlertCircle className="w-3.5 h-3.5" /> حذف السجل
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>

               <div className="grid grid-cols-2 gap-4 py-4 border-t border-dashed border-muted">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <ShoppingBag className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase">المنتجات</p>
                        <p className="text-xs font-bold">{store.products} منتج</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-secondary">
                        <Star className="w-4 h-4 fill-secondary" />
                     </div>
                     <div>
                        <p className="text-[8px] text-muted-foreground font-bold uppercase">التقييم</p>
                        <p className="text-xs font-bold">{store.rating} / 5</p>
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-muted">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">{store.location}</span>
                  </div>
                  <Badge variant="outline" className="bg-muted/30 border-none text-[9px] font-bold px-2 py-0.5">
                    {store.category}
                  </Badge>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

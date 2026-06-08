
'use client';

import { useState, useMemo } from "react"
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  FileText, 
  User, 
  MapPin, 
  Clock,
  ExternalLink,
  ChevronLeft,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const PENDING_STORES = [
  { id: 1, name: "عسل سقطرى", owner: "أصيل عبد الرقيب", type: "منحل عسل", date: "منذ ساعتين", location: "سقطرى", docType: "بطاقة شخصية" },
  { id: 2, name: "قهوة يافع", owner: "سالم العفيفي", type: "مزارع بن", date: "أمس", location: "لحج", docType: "جواز سفر" },
  { id: 3, name: "بخور عدني تريم", owner: "فاطمة باوزير", type: "بخور وعطور", date: "قبل يومين", location: "عدن", docType: "بطاقة شخصية" },
]

export default function AdminVerifications() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStores = useMemo(() => {
    return PENDING_STORES.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleApprove = (name: string) => {
    toast({ title: "تم التوثيق", description: `تم منح شارة التوثيق لمتجر ${name} بنجاح.` })
  }

  const handleReject = (name: string) => {
    toast({ title: "تم الرفض", description: `تم رفض طلب متجر ${name}، سيتم إشعار التاجر.`, variant: "destructive" })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end bg-white p-8 rounded-[35px] border shadow-sm">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">طلبات التوثيق</h1>
          <p className="text-muted-foreground text-sm mt-1">مراجعة هوية التجار لضمان أمان سوق "رواج"</p>
        </div>
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث باسم المتجر أو المالك..." 
            className="h-12 pr-11 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button variant="outline" className="h-12 rounded-2xl bg-white border-none shadow-sm gap-2 font-bold px-6">
          <Filter className="w-4 h-4" /> فرز التاريخ
        </Button>
      </div>

      <div className="space-y-4">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <Card key={store.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                  <div className="flex gap-4 items-center w-full md:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary shrink-0">
                        <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-primary">{store.name}</h3>
                          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-none font-bold text-[9px]">قيد المراجعة</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                          المالك: <span className="text-foreground">{store.owner}</span> • {store.type}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {store.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {store.date}</span>
                          <span className="flex items-center gap-1 text-primary"><FileText className="w-3 h-3" /> {store.docType}</span>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 md:w-32 rounded-xl h-12 border-primary/20 text-primary font-bold gap-2">
                            <Eye className="w-4 h-4" /> مراجعة
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[40px] max-w-2xl border-none shadow-2xl p-8 [&>button]:left-6 [&>button]:right-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-headline font-bold text-primary text-right mb-6">مراجعة وثائق {store.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase">صورة الوثيقة (أمام)</p>
                                  <div className="aspect-[3/2] bg-muted rounded-2xl overflow-hidden border-2 border-dashed relative">
                                      <img src="https://picsum.photos/seed/doc1/400/250" className="object-cover w-full h-full opacity-50" />
                                      <div className="absolute inset-0 flex items-center justify-center"><p className="text-[10px] font-bold text-muted-foreground">صورة الهوية الوطنية</p></div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase">صورة الوثيقة (خلف)</p>
                                  <div className="aspect-[3/2] bg-muted rounded-2xl overflow-hidden border-2 border-dashed relative">
                                      <img src="https://picsum.photos/seed/doc2/400/250" className="object-cover w-full h-full opacity-50" />
                                      <div className="absolute inset-0 flex items-center justify-center"><p className="text-[10px] font-bold text-muted-foreground">صورة الهوية الوطنية</p></div>
                                  </div>
                                </div>
                            </div>
                            <div className="bg-primary/5 p-6 rounded-[25px] space-y-4">
                                <h4 className="font-bold text-primary text-sm">بيانات المتجر المسجلة:</h4>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div><p className="text-muted-foreground mb-1">الاسم التجاري</p><p className="font-bold">{store.name}</p></div>
                                  <div><p className="text-muted-foreground mb-1">اسم المالك</p><p className="font-bold">{store.owner}</p></div>
                                  <div><p className="text-muted-foreground mb-1">العنوان</p><p className="font-bold">{store.location}</p></div>
                                  <div><p className="text-muted-foreground mb-1">تاريخ الطلب</p><p className="font-bold">{store.date}</p></div>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold gap-2" onClick={() => handleApprove(store.name)}>
                                  <CheckCircle2 className="w-5 h-5" /> قبول وتوثيق
                                </Button>
                                <Button variant="ghost" className="flex-1 h-14 rounded-2xl text-destructive hover:bg-red-50 font-bold gap-2" onClick={() => handleReject(store.name)}>
                                  <XCircle className="w-5 h-5" /> رفض الطلب
                                </Button>
                            </div>
                          </div>
                        </DialogContent>
                    </Dialog>

                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all" onClick={() => handleApprove(store.name)}>
                          <CheckCircle2 className="w-6 h-6" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all" onClick={() => handleReject(store.name)}>
                          <XCircle className="w-6 h-6" />
                        </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-[40px] border border-dashed border-primary/20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="font-bold text-lg text-primary">لا توجد طلبات توثيق مطابقة</h3>
            <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو مسح النص للعثور على الطلبات</p>
          </div>
        )}
      </div>
    </div>
  )
}

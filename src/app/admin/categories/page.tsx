
'use client';

import { useState } from "react"
import { 
  LayoutGrid, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  ChevronLeft,
  Coffee,
  Droplets,
  Wind,
  Palette,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const INITIAL_CATEGORIES = [
  { id: 1, name: "البن اليمني", icon: Coffee, count: 124, image: "https://picsum.photos/seed/cat1/200/200" },
  { id: 2, name: "عسل طبيعي", icon: Droplets, count: 56, image: "https://picsum.photos/seed/cat2/200/200" },
  { id: 3, name: "بخور وعطور", icon: Wind, count: 89, image: "https://picsum.photos/seed/cat3/200/200" },
  { id: 4, name: "حرف يدوية", icon: Palette, count: 142, image: "https://picsum.photos/seed/cat4/200/200" },
]

export default function AdminCategories() {
  const { toast } = useToast()
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newCat, setNewCat] = useState({ name: "", description: "" })

  const handleDelete = (name: string) => {
    toast({ title: "تم الحذف", description: `تم إزالة فئة ${name} نهائياً.`, variant: "destructive" })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-[35px] border shadow-sm">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">إدارة الفئات</h1>
          <p className="text-muted-foreground text-sm mt-1">تنظيم هيكلية المنتجات وتسهيل عملية التصفح للمشتري</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl h-14 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-lg shadow-primary/20 text-lg font-bold">
              <Plus className="w-6 h-6" /> إضافة فئة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[40px] border-none shadow-2xl p-8 [&>button]:left-6 [&>button]:right-auto">
             <DialogHeader>
               <DialogTitle className="text-2xl font-headline font-bold text-primary text-right">إنشاء فئة رئيسية</DialogTitle>
             </DialogHeader>
             <div className="space-y-6 py-4">
                <div className="space-y-2">
                   <Label className="text-xs font-bold text-muted-foreground pr-1">اسم الفئة</Label>
                   <Input placeholder="مثلاً: مأكولات شعبية" className="h-12 rounded-xl bg-muted/30 border-none" />
                </div>
                <div className="space-y-2">
                   <Label className="text-xs font-bold text-muted-foreground pr-1">أيقونة الفئة</Label>
                   <div className="grid grid-cols-4 gap-3">
                      {[Coffee, Droplets, Wind, Palette, LayoutGrid].map((Icon, i) => (
                        <div key={i} className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/10 border-2 border-transparent hover:border-primary transition-all">
                           <Icon className="w-6 h-6" />
                        </div>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <Label className="text-xs font-bold text-muted-foreground pr-1">صورة الغلاف</Label>
                   <div className="h-32 bg-muted/20 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-muted-foreground gap-2 cursor-pointer">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-[10px] font-bold">اضغط لرفع صورة فنية</span>
                   </div>
                </div>
             </div>
             <DialogFooter className="flex gap-3">
                <Button className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold" onClick={() => setIsAddOpen(false)}>حفظ الفئة</Button>
                <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setIsAddOpen(false)}>إلغاء</Button>
             </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all bg-white relative">
            <div className="relative h-32">
               <Image src={cat.image} alt={cat.name} fill className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base">{cat.name}</h3>
               </div>
            </div>
            <CardContent className="p-6 space-y-6">
               <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                  <span>إجمالي المنتجات</span>
                  <span className="text-primary">{cat.count} منتج</span>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 border-primary/20 text-primary font-bold gap-1.5 text-[11px]">
                     <Edit2 className="w-3.5 h-3.5" /> تعديل
                  </Button>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all" onClick={() => handleDelete(cat.name)}>
                     <Trash2 className="w-4 h-4" />
                  </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


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
  X,
  Shirt,
  Utensils,
  Gem,
  ShoppingBag,
  Sparkles,
  Type
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
import { cn } from "@/lib/utils"

// تعريف الأيقونات المتاحة للفئات
const AVAILABLE_ICONS = [
  { id: 'coffee', icon: Coffee, label: 'بن' },
  { id: 'droplets', icon: Droplets, label: 'عسل' },
  { id: 'wind', icon: Wind, label: 'بخور' },
  { id: 'palette', icon: Palette, label: 'حرف' },
  { id: 'shirt', icon: Shirt, label: 'ملابس' },
  { id: 'utensils', icon: Utensils, label: 'أطعمة' },
  { id: 'gem', icon: Gem, label: 'فضيات' },
  { id: 'shopping-bag', icon: ShoppingBag, label: 'أخرى' },
]

const INITIAL_CATEGORIES = [
  { id: 1, name: "البن اليمني", iconId: "coffee", count: 124, image: "https://picsum.photos/seed/cat1/400/300" },
  { id: 2, name: "عسل طبيعي", iconId: "droplets", count: 56, image: "https://picsum.photos/seed/cat2/400/300" },
  { id: 3, name: "بخور وعطور", iconId: "wind", count: 89, image: "https://picsum.photos/seed/cat3/400/300" },
  { id: 4, name: "حرف يدوية", iconId: "palette", count: 142, image: "https://picsum.photos/seed/cat4/400/300" },
]

export default function AdminCategories() {
  const { toast } = useToast()
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: "",
    iconId: "shopping-bag",
    image: ""
  })

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setFormData({ name: "", iconId: "shopping-bag", image: "" })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (cat: any) => {
    setEditingCategory(cat)
    setFormData({ name: cat.name, iconId: cat.iconId, image: cat.image })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) {
      toast({ title: "بيانات ناقصة", description: "يرجى إدخال اسم الفئة أولاً.", variant: "destructive" })
      return
    }

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c))
      toast({ title: "تم التحديث", description: `تم تعديل بيانات فئة ${formData.name} بنجاح.` })
    } else {
      const newCat = {
        id: Date.now(),
        name: formData.name,
        iconId: formData.iconId,
        image: formData.image || `https://picsum.photos/seed/${Date.now()}/400/300`,
        count: 0
      }
      setCategories([...categories, newCat])
      toast({ title: "تمت الإضافة", description: `تم إنشاء فئة ${formData.name} الجديدة بنجاح.` })
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: number, name: string) => {
    setCategories(categories.filter(c => c.id !== id))
    toast({ title: "تم الحذف", description: `تم إزالة فئة ${name} نهائياً من النظام.`, variant: "destructive" })
  }

  const getIconComponent = (id: string) => {
    return AVAILABLE_ICONS.find(i => i.id === id)?.icon || LayoutGrid
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[35px] border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">إدارة الفئات</h1>
          <p className="text-muted-foreground text-sm font-medium">تنظيم هيكلية المنتجات وتسهيل عملية التصفح للمشتري في سوق رواج</p>
        </div>
        
        <Button 
          onClick={handleOpenAdd}
          className="rounded-2xl h-14 bg-primary hover:bg-primary/90 gap-2 px-8 shadow-xl shadow-primary/20 text-lg font-bold transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-6 h-6" /> إضافة فئة جديدة
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => {
          const CategoryIcon = getIconComponent(cat.iconId);
          return (
            <Card key={cat.id} className="border-none shadow-xl shadow-black/[0.03] rounded-[45px] overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-white relative border border-transparent hover:border-primary/10">
              <div className="relative h-44">
                 <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                 <div className="absolute bottom-6 right-6 flex items-center gap-4 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                      <CategoryIcon className="w-7 h-7" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="font-bold text-xl leading-none">{cat.name}</h3>
                      <p className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em]">{cat.count} منتج متوفر</p>
                    </div>
                 </div>
              </div>
              <CardContent className="p-6">
                 <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-2xl h-12 border-primary/10 text-primary font-bold gap-2 text-xs hover:bg-primary/5 hover:border-primary/20 transition-all"
                      onClick={() => handleOpenEdit(cat)}
                    >
                       <Edit2 className="w-4 h-4" /> تعديل البيانات
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-12 h-12 rounded-2xl bg-red-50 text-destructive hover:bg-red-500 hover:text-white transition-all shadow-sm" 
                      onClick={() => handleDelete(cat.id, cat.name)}
                    >
                       <Trash2 className="w-5 h-5" />
                    </Button>
                 </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[50px] sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-8 [&>button]:right-auto">
          <DialogHeader className="p-10 bg-muted/30 border-b">
            <DialogTitle className="text-3xl font-headline font-bold text-primary text-right flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                {editingCategory ? <Edit2 className="w-6 h-6" /> : <Plus className="w-7 h-7" />}
              </div>
              {editingCategory ? 'تعديل فئة' : 'إنشاء فئة جديدة'}
            </DialogTitle>
          </DialogHeader>

          <div className="p-10 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                 <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                   <Type className="w-4 h-4 text-primary" /> اسم الفئة (سيظهر للعملاء)
                 </Label>
                 <Input 
                  placeholder="مثلاً: مأكولات يمنية، فضيات وهدايا..." 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-16 rounded-[22px] bg-muted/20 border-none px-8 font-bold text-lg focus-visible:ring-2 focus-visible:ring-primary/20" 
                />
              </div>

              <div className="space-y-4">
                 <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-secondary" /> أيقونة الفئة الرمزية
                 </Label>
                 <div className="grid grid-cols-4 gap-4">
                    {AVAILABLE_ICONS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={item.id} 
                          onClick={() => setFormData({...formData, iconId: item.id})}
                          className={cn(
                            "aspect-square rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all border-2 border-transparent",
                            formData.iconId === item.id 
                              ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105" 
                              : "bg-muted/30 hover:border-primary/20 text-muted-foreground"
                          )}
                        >
                           <Icon className="w-6 h-6 mb-1.5" />
                           <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
                        </div>
                      )
                    })}
                 </div>
              </div>

              <div className="space-y-3">
                 <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                   <ImageIcon className="w-4 h-4 text-primary" /> صورة غلاف الفئة
                 </Label>
                 <div className="relative group">
                    <div className="h-40 bg-muted/20 border-2 border-dashed border-primary/10 rounded-[35px] flex flex-col items-center justify-center text-muted-foreground gap-3 cursor-pointer hover:bg-primary/5 transition-all overflow-hidden relative shadow-inner">
                      {formData.image ? (
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            <ImageIcon className="w-6 h-6 text-primary/40" />
                          </div>
                          <span className="text-[11px] font-bold text-primary/60">اضغط لرفع صورة إبداعية</span>
                        </>
                      )}
                    </div>
                    <Input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setFormData({...formData, image: reader.result as string});
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                 </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                className="flex-[2] h-16 rounded-[24px] bg-primary hover:bg-primary/90 font-bold text-xl gap-3 shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]" 
                onClick={handleSave}
              >
                <Check className="w-6 h-6" /> {editingCategory ? 'حفظ التعديلات' : 'إطلاق الفئة الآن'}
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 h-16 rounded-[24px] font-bold text-muted-foreground hover:bg-muted" 
                onClick={() => setIsDialogOpen(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

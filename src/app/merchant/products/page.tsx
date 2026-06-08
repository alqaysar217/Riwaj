
'use client';

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Star,
  ArrowRight,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const MERCHANT_PRODUCTS = [
  { id: "1", name: "بن خولاني فاخر - درجة أولى", price: 4500, stock: 45, sales: 124, status: "active", rating: 4.9, image: "https://picsum.photos/seed/p1/200/200", category: "بن" },
  { id: "2", name: "بن مطري - تحميص متوسط", price: 5000, stock: 12, sales: 89, status: "active", rating: 4.8, image: "https://picsum.photos/seed/p2/200/200", category: "بن" },
  { id: "3", name: "قشر قهوة مطحون", price: 1800, stock: 0, sales: 234, status: "out_of_stock", rating: 4.7, image: "https://picsum.photos/seed/p3/200/200", category: "بن" },
  { id: "4", name: "خلطة بن عربي بالهيل", price: 3500, stock: 28, sales: 56, status: "active", rating: 4.9, image: "https://picsum.photos/seed/p4/200/200", category: "بن" },
]

export default function MerchantProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setFilter] = useState("all")

  const filteredProducts = useMemo(() => {
    return MERCHANT_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">إدارة المنتجات</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">تحكم في مخزونك وأسعارك بكل سهولة</p>
        </div>
        <Button asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-12 px-6 font-bold gap-2 shadow-lg shadow-primary/20">
          <Link href="/merchant/products/add">
            <Plus className="w-5 h-5" /> إضافة منتج جديد
          </Link>
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم المنتج..." 
            className="h-12 pr-11 pl-10 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setFilter}>
            <SelectTrigger className="h-12 rounded-2xl bg-white border-none shadow-sm font-bold text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-primary" />
                <SelectValue placeholder="تصفية حسب الحالة" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">كل الحالات</SelectItem>
              <SelectItem value="active">متاح حالياً</SelectItem>
              <SelectItem value="out_of_stock">نفذ المخزون</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10 text-center">
          <p className="text-[10px] text-muted-foreground font-bold">الإجمالي</p>
          <p className="text-lg font-bold text-primary">{MERCHANT_PRODUCTS.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-2xl border border-green-100 text-center">
          <p className="text-[10px] text-muted-foreground font-bold">نشط</p>
          <p className="text-lg font-bold text-green-600">{MERCHANT_PRODUCTS.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100 text-center">
          <p className="text-[10px] text-muted-foreground font-bold">نفذ</p>
          <p className="text-lg font-bold text-orange-600">{MERCHANT_PRODUCTS.filter(p => p.status === 'out_of_stock').length}</p>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-3xl border border-transparent shadow-sm hover:border-primary/20 transition-all group flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border shrink-0 bg-muted">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white px-2 py-1 border border-white/50 rounded-lg backdrop-blur-sm">نفذ</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-[10px] text-muted-foreground font-medium">الفئة: {product.category}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/5">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-xl border-none">
                      <DropdownMenuItem asChild className="rounded-xl gap-2 font-bold text-xs py-3">
                        <Link href={`/merchant/products/edit/${product.id}`}>
                          <Edit2 className="w-4 h-4 text-primary" /> تعديل بيانات المنتج
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-3">
                        <Eye className="w-4 h-4 text-primary" /> عرض في المتجر العام
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-3 text-destructive hover:bg-destructive/5">
                        <Trash2 className="w-4 h-4" /> حذف المنتج نهائياً
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3 mt-1">
                  <p className="text-primary font-bold text-base">{product.price.toLocaleString()} <span className="text-[10px]">ر.ي</span></p>
                  <div className="flex items-center gap-1 text-[10px] bg-secondary/10 px-2 py-0.5 rounded-lg text-secondary font-bold">
                    <Star className="w-3 h-3 fill-secondary" />
                    <span>{product.rating}</span>
                  </div>
                  <Badge className={cn(
                    "text-[8px] font-bold px-2 py-0.5 border-none",
                    product.status === 'active' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}>
                    {product.status === 'active' ? <CheckCircle2 className="w-2.5 h-2.5 ml-1" /> : <AlertCircle className="w-2.5 h-2.5 ml-1" />}
                    {product.status === 'active' ? 'متاح' : 'غير متوفر'}
                  </Badge>
                </div>

                <div className="flex gap-6 items-center pt-3 border-t border-dashed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">المخزون</p>
                      <p className={cn("text-xs font-bold", product.stock < 10 ? "text-destructive" : "text-foreground")}>
                        {product.stock} حبة
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">المبيعات</p>
                      <p className="text-xs font-bold">{product.sales} قطعة</p>
                    </div>
                  </div>
                  <div className="mr-auto">
                    <Button variant="ghost" size="sm" asChild className="text-[10px] font-bold text-primary h-8 gap-1.5 rounded-xl hover:bg-primary/5">
                      <Link href={`/merchant/products/edit/${product.id}`}>
                        التفاصيل <ArrowRight className="w-3 h-3 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-[32px] border border-dashed border-primary/20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="font-bold text-lg text-primary">لم نعثر على أي منتجات</h3>
            <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو الفلاتر</p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setFilter("all"); }} className="mt-6 rounded-xl border-primary/20 text-primary font-bold">
              إعادة تعيين البحث
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

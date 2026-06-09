'use client';

import { useState, useMemo, useEffect } from "react"
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
  AlertCircle,
  TrendingUp,
  LayoutGrid,
  ShoppingBag,
  ChevronLeft
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
import { Card, CardContent } from "@/components/ui/card"

const MERCHANT_PRODUCTS = [
  { id: "1", name: "بن خولاني فاخر - درجة أولى", price: 4500, stock: 45, sales: 124, status: "active", rating: 4.9, image: "/products-1.png", category: "البن والقهوة" },
  { id: "2", name: "بن مطري - تحميص متوسط", price: 5000, stock: 12, sales: 89, status: "active", rating: 4.8, image: "/products-2.png", category: "البن والقهوة" },
  { id: "3", name: "قشر قهوة مطحون", price: 1800, stock: 0, sales: 234, status: "out_of_stock", rating: 4.7, image: "/products-3.png", category: "البن والقهوة" },
  { id: "4", name: "خلطة بن عربي بالهيل", price: 3500, stock: 28, sales: 56, status: "active", rating: 4.9, image: "/products-4.png", category: "البن والقهوة" },
]

export default function MerchantProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setFilter] = useState("all")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredProducts = useMemo(() => {
    return MERCHANT_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 pb-28">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[35px] border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary tracking-tight">إدارة المنتجات</h1>
            <p className="text-muted-foreground text-sm font-medium">تحكم في مخزونك وأسعارك وراقب أداء مبيعاتك</p>
          </div>
        </div>
        <Button asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-14 px-8 font-bold gap-3 shadow-xl shadow-primary/20 text-lg transition-all hover:scale-105 active:scale-95">
          <Link href="/merchant/products/add">
            <Plus className="w-5 h-5" /> إضافة منتج جديد
          </Link>
        </Button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "إجمالي المنتجات", value: MERCHANT_PRODUCTS.length, icon: LayoutGrid, color: "text-primary", bg: "bg-primary/5" },
          { label: "المنتجات النشطة", value: MERCHANT_PRODUCTS.filter(p => p.status === 'active').length, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "نفذ من المخزون", value: MERCHANT_PRODUCTS.filter(p => p.status === 'out_of_stock').length, icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-5 flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                  <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
               </div>
               <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[24px] border shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم المنتج أو الفئة..." 
            className="h-12 pr-11 pl-10 rounded-xl bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary/20 font-bold"
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
        
        <div className="w-full md:w-56">
          <Select value={statusFilter} onValueChange={setFilter}>
            <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none font-bold text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-primary" />
                <SelectValue placeholder="تصفية حسب الحالة" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-xl">
              <SelectItem value="all">كافة الحالات</SelectItem>
              <SelectItem value="active">متاح (نشط)</SelectItem>
              <SelectItem value="out_of_stock">نفذ المخزون</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-[32px] border border-transparent shadow-sm hover:border-primary/20 hover:shadow-md transition-all group flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              {/* Product Image */}
              <div className="relative w-full md:w-32 aspect-square rounded-[24px] overflow-hidden border shrink-0 bg-muted group-hover:scale-105 transition-transform duration-500 shadow-inner">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="text-[10px] font-bold text-white px-3 py-1 bg-red-600 rounded-full shadow-lg">نفذ</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-primary truncate transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2">
                       <Badge variant="outline" className="bg-primary/5 text-primary border-none text-[9px] font-bold py-0.5 px-2 rounded-full">
                         {product.category}
                       </Badge>
                       <div className="flex items-center gap-1 text-[10px] bg-secondary/10 px-2 py-0.5 rounded-full text-secondary font-bold">
                        <Star className="w-3 h-3 fill-secondary" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-2xl p-2 w-56 shadow-2xl border-none">
                      <DropdownMenuItem asChild className="rounded-xl gap-3 font-bold text-xs py-3 cursor-pointer">
                        <Link href={`/merchant/products/edit/${product.id}`}>
                          <Edit2 className="w-4 h-4 text-primary" /> تعديل بيانات المنتج
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl gap-3 font-bold text-xs py-3 cursor-pointer">
                        <Eye className="w-4 h-4 text-primary" /> عرض في المتجر العام
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-muted" />
                      <DropdownMenuItem className="rounded-xl gap-3 font-bold text-xs py-3 text-destructive hover:bg-destructive/5 cursor-pointer">
                        <Trash2 className="w-4 h-4" /> حذف المنتج نهائياً
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Price and Basic Status */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <p className="text-primary font-bold text-xl">
                    {isMounted ? product.price.toLocaleString() : product.price} <span className="text-[10px] opacity-60">ر.ي</span>
                  </p>
                  <Badge className={cn(
                    "text-[9px] font-bold px-3 py-1 rounded-full border-none shadow-sm",
                    product.status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {product.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" /> : <AlertCircle className="w-3.5 h-3.5 ml-1.5" />}
                    {product.status === 'active' ? 'متاح للبيع' : 'غير متوفر'}
                  </Badge>
                </div>

                {/* Extended Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-dashed border-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <ShoppingBag className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">المخزون</p>
                      <p className={cn("text-sm font-bold", product.stock < 10 && product.stock > 0 ? "text-orange-600" : product.stock === 0 ? "text-red-600" : "text-foreground")}>
                        {product.stock} حبة
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-secondary/5 group-hover:text-secondary transition-colors">
                      <TrendingUp className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">المبيعات</p>
                      <p className="text-sm font-bold">{product.sales} قطعة</p>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-end">
                    <Button variant="ghost" size="sm" asChild className="text-[11px] font-bold text-primary h-9 gap-2 rounded-xl hover:bg-primary/5 group/btn">
                      <Link href={`/merchant/products/edit/${product.id}`}>
                        إدارة التفاصيل <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-[45px] border border-dashed border-primary/20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="font-bold text-lg text-primary">لا توجد منتجات مطابقة</h3>
            <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو إعادة تعيين الفلاتر</p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchTerm(""); setFilter("all"); }} 
              className="mt-6 rounded-xl border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all"
            >
              إظهار كافة المنتجات
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

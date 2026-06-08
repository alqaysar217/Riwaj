
'use client';

import { useState } from "react"
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
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const MERCHANT_PRODUCTS = [
  { id: "1", name: "بن خولاني فاخر - درجة أولى", price: "4,500 ر.ي", stock: 45, sales: 124, status: "active", rating: 4.9, image: "https://picsum.photos/seed/p1/200/200" },
  { id: "2", name: "بن مطري - تحميص متوسط", price: "5,000 ر.ي", stock: 12, sales: 89, status: "active", rating: 4.8, image: "https://picsum.photos/seed/p2/200/200" },
  { id: "3", name: "قشر قهوة مطحون", price: "1,800 ر.ي", stock: 0, sales: 234, status: "out_of_stock", rating: 4.7, image: "https://picsum.photos/seed/p3/200/200" },
  { id: "4", name: "خلطة بن عربي بالهيل", price: "3,500 ر.ي", stock: 28, sales: 56, status: "active", rating: 4.9, image: "https://picsum.photos/seed/p4/200/200" },
]

export default function MerchantProducts() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary">المنتجات</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">إدارة مخزون متجرك</p>
        </div>
        <Button asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-12 px-6 font-bold gap-2 shadow-lg shadow-primary/20">
          <Link href="/merchant/products/add">
            <Plus className="w-5 h-5" /> إضافة منتج
          </Link>
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث في منتجاتي..." 
            className="h-12 pr-10 rounded-2xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm text-primary">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {MERCHANT_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-3xl border border-transparent shadow-sm hover:border-primary/20 transition-all group flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white px-2 py-0.5 border border-white rounded">نفذ</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{product.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl p-1 w-40">
                    <DropdownMenuItem className="rounded-lg gap-2 text-xs font-bold">
                      <Edit2 className="w-3.5 h-3.5" /> تعديل البيانات
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-xs font-bold">
                      <Eye className="w-3.5 h-3.5" /> عرض في المتجر
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-lg gap-2 text-xs font-bold text-destructive">
                      <Trash2 className="w-3.5 h-3.5" /> حذف المنتج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <p className="text-primary font-bold text-sm">{product.price}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="font-bold">{product.rating}</span>
                </div>
                <Badge className={cn(
                  "text-[8px] font-bold px-2 py-0.5",
                  product.status === 'active' ? "bg-green-50 text-green-700 hover:bg-green-50" : "bg-red-50 text-red-700 hover:bg-red-50"
                )}>
                  {product.status === 'active' ? 'متاح' : 'غير متوفر'}
                </Badge>
              </div>

              <div className="flex gap-6 items-center pt-2 border-t border-dashed">
                <div>
                  <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">المخزون</p>
                  <p className={cn("text-xs font-bold", product.stock < 10 ? "text-red-500" : "text-foreground")}>
                    {product.stock} حبة
                  </p>
                </div>
                <div>
                  <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">المبيعات</p>
                  <p className="text-xs font-bold">{product.sales} قطعة</p>
                </div>
                <div className="mr-auto">
                  <Button variant="ghost" size="sm" asChild className="text-[10px] font-bold text-primary h-7 gap-1">
                    <Link href={`/merchant/products/edit/${product.id}`}>
                      التفاصيل <ArrowRight className="w-3 h-3 rotate-180" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

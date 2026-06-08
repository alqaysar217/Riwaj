import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, ChevronLeft, Package, Clock, CheckCircle2 } from "lucide-react"

const ORDERS = [
  { id: "RW-9021", date: "24 مايو 2024", total: 16500, status: "ongoing", itemsCount: 3, image: "https://picsum.photos/seed/o1/100/100" },
  { id: "RW-8912", date: "12 مايو 2024", total: 4500, status: "delivered", itemsCount: 1, image: "https://picsum.photos/seed/o2/100/100" },
  { id: "RW-7856", date: "1 مايو 2024", total: 12000, status: "delivered", itemsCount: 2, image: "https://picsum.photos/seed/o3/100/100" },
]

export default function OrdersPage() {
  return (
    <div className="pb-24">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-headline font-bold text-primary">طلباتي</h1>
              <p className="text-muted-foreground text-xs">تتبع حالة طلباتك الحالية والسابقة</p>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">الكل</TabsTrigger>
              <TabsTrigger value="ongoing" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">جارية</TabsTrigger>
              <TabsTrigger value="delivered" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs">مكتملة</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {ORDERS.length > 0 ? (
                ORDERS.map((order) => (
                  <OrderCard key={order.id} {...order} />
                ))
              ) : (
                <EmptyOrders />
              )}
            </TabsContent>
            
            <TabsContent value="ongoing" className="space-y-4">
              {ORDERS.filter(o => o.status === "ongoing").map((order) => (
                <OrderCard key={order.id} {...order} />
              ))}
            </TabsContent>

            <TabsContent value="delivered" className="space-y-4">
              {ORDERS.filter(o => o.status === "delivered").map((order) => (
                <OrderCard key={order.id} {...order} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

function OrderCard({ id, date, total, status, itemsCount, image }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted">
            <Image src={image} alt="" fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1">طلب رقم: {id}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
              <Clock className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        <Badge 
          className={status === 'ongoing' ? 'bg-secondary/10 text-secondary border-none' : 'bg-green-50 text-green-700 border-none'}
        >
          {status === 'ongoing' ? 'قيد التجهيز' : 'تم التوصيل'}
        </Badge>
      </div>

      <div className="flex items-center justify-between py-3 border-t border-dashed">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[8px] text-muted-foreground mb-0.5 uppercase font-bold tracking-wider">عدد المنتجات</p>
            <p className="font-bold text-xs">{itemsCount}</p>
          </div>
          <div>
            <p className="text-[8px] text-muted-foreground mb-0.5 uppercase font-bold tracking-wider">الإجمالي</p>
            <p className="font-bold text-xs text-primary">{total} ر.ي</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild className="rounded-full h-8 text-[10px] px-3 border-primary/20 hover:bg-primary/5">
          <Link href={`/orders/${id}`}>
            التفاصيل <ChevronLeft className="w-3 h-3 mr-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function EmptyOrders() {
  return (
    <div className="text-center py-16 bg-muted/20 rounded-3xl border border-dashed">
      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
      <h3 className="font-bold text-lg mb-1">لا توجد طلبات بعد</h3>
      <p className="text-muted-foreground text-xs mb-6">ابدأ رحلة التسوق الآن واكتشف كنوز اليمن</p>
      <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-8 h-10 text-sm">
        <Link href="/">تسوق الآن</Link>
      </Button>
    </div>
  )
}

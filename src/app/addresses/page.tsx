import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AddressesPage() {
  const addresses = [
    { id: 1, title: "المنزل", details: "صنعاء، حي حدة، شارع الخمسين", phone: "77XXXXXXX" },
    { id: 2, title: "العمل", details: "صنعاء، التحرير، عمارة البركة", phone: "77XXXXXXX" },
  ]

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
            <Button size="sm" className="rounded-full gap-2">
              <Plus className="w-4 h-4" /> إضافة عنوان
            </Button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold">{address.title}</h3>
                    <Button variant="ghost" size="sm" className="text-primary text-xs font-bold p-0 h-auto">تعديل</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{address.details}</p>
                  <p className="text-xs font-medium text-primary">{address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

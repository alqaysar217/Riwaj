
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Store 
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "الرئيسية", icon: LayoutDashboard, href: "/merchant/dashboard" },
  { label: "المنتجات", icon: Package, href: "/merchant/products" },
  { label: "الطلبات", icon: ShoppingCart, href: "/merchant/orders" },
  { label: "المحادثات", icon: MessageSquare, href: "/merchant/messages" },
  { label: "متجري", icon: Store, href: "/merchant/store" },
]

export function MerchantBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex items-center justify-around h-16 px-4 md:hidden">
      {navItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className={cn(
            "flex flex-col items-center gap-1 min-w-[60px] transition-colors", 
            pathname === item.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          <item.icon className={cn("w-5 h-5", pathname === item.href ? "stroke-[2.5]" : "stroke-[1.5]")} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

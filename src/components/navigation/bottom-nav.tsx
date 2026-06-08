"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, ShoppingBag, ClipboardList, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "الرئيسية", icon: Home, href: "/" },
  { label: "الفئات", icon: LayoutGrid, href: "/categories" },
  { label: "المتاجر", icon: ShoppingBag, href: "/stores" },
  { label: "الطلبات", icon: ClipboardList, href: "/orders" },
  { label: "حسابي", icon: "/profile", href: "/profile", isProfile: true },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex items-center justify-around h-16 px-4 md:hidden">
      <Link href="/" className={cn("flex flex-col items-center gap-1 min-w-[64px]", pathname === "/" ? "text-primary" : "text-muted-foreground")}>
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium">الرئيسية</span>
      </Link>
      <Link href="/categories" className={cn("flex flex-col items-center gap-1 min-w-[64px]", pathname === "/categories" ? "text-primary" : "text-muted-foreground")}>
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-medium">الفئات</span>
      </Link>
      <Link href="/stores" className={cn("flex flex-col items-center gap-1 min-w-[64px]", pathname === "/stores" ? "text-primary" : "text-muted-foreground")}>
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] font-medium">المتاجر</span>
      </Link>
      <Link href="/orders" className={cn("flex flex-col items-center gap-1 min-w-[64px]", pathname === "/orders" ? "text-primary" : "text-muted-foreground")}>
        <ClipboardList className="w-5 h-5" />
        <span className="text-[10px] font-medium">الطلبات</span>
      </Link>
      <Link href="/profile" className={cn("flex flex-col items-center gap-1 min-w-[64px]", pathname === "/profile" ? "text-primary" : "text-muted-foreground")}>
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">حسابي</span>
      </Link>
    </nav>
  )
}
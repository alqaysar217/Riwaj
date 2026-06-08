"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-headline font-bold text-primary">رواج</span>
        </Link>

        {/* Search Bar - Hidden on Mobile, shown in separate bar or expanded */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Input 
            placeholder="ابحث عن البن، العسل، أو الحرف اليدوية..." 
            className="pr-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-secondary text-[8px]">2</Badge>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </Button>
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

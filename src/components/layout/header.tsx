
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart_items") || "[]")
      const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
      setCartCount(count)
    }
    updateCartCount()
    window.addEventListener("cart_updated", updateCartCount)
    return () => window.removeEventListener("cart_updated", updateCartCount)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo Section with Shadow and Border */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative p-1.5 rounded-xl bg-white shadow-sm border border-primary/10 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
            <div className="absolute inset-0 bg-primary/5 blur-md rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image 
              src="/logo.png" 
              alt="رواج" 
              width={34} 
              height={34} 
              className="object-contain relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-2xl font-headline font-bold text-primary tracking-tight drop-shadow-sm">رواج</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن البن، العسل، أو الحرف اليدوية..." 
            className="pr-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/20 rounded-xl"
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full hover:bg-transparent text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl" asChild>
            <Link href="/search">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl" asChild>
            <Link href="/notifications">
              <Bell className="w-5 h-5" />
              <Badge className="absolute top-1 left-1 w-4 h-4 p-0 flex items-center justify-center bg-secondary text-white text-[8px] border-2 border-white">2</Badge>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-primary text-white text-[8px] border-2 border-white animate-in zoom-in-50">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl" asChild>
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

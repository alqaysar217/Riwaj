
'use client';

import { MerchantBottomNav } from "@/components/navigation/merchant-bottom-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { MerchantSidebar } from "@/components/navigation/merchant-sidebar"
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background" dir="rtl">
        <MerchantSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Dashboard Top Bar */}
          <header className="h-16 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-primary hover:bg-primary/5 rounded-xl h-9 w-9" />
              <div className="md:hidden flex items-center gap-2">
                <Image src="/logo.png" alt="رواج" width={30} height={30} className="object-contain" />
                <span className="text-xl font-headline font-bold text-primary">رواج</span>
              </div>
              <div className="hidden md:flex relative group w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="بحث سريع..." 
                  className="h-10 pr-9 bg-muted/30 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative bg-muted/30 hover:bg-primary/5 hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-5 h-5" />
              </div>
            </div>
          </header>

          <main className="flex-1 pb-24 md:pb-8 p-0">
            {children}
          </main>
          <MerchantBottomNav />
        </div>
      </div>
    </SidebarProvider>
  )
}

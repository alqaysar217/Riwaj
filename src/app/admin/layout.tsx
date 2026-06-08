
'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/navigation/admin-sidebar";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/40" dir="rtl">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar for Admin */}
          <header className="h-20 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="text-primary hover:bg-primary/5 rounded-xl h-10 w-10 shrink-0" />
              <div className="md:hidden flex items-center gap-2 mr-2">
                <Image src="/logo.png" alt="رواج" width={32} height={32} className="object-contain" />
                <span className="text-xl font-headline font-bold text-primary">رواج</span>
              </div>
              <div className="relative w-full max-w-md group hidden md:block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="بحث سريع في النظام..." 
                  className="h-11 pr-10 bg-muted/30 border-none rounded-xl w-full focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative bg-muted/30 hover:bg-primary/5 hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
              </Button>
              <div className="h-8 w-px bg-border mx-2 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold leading-none">الإدارة العامة</p>
                  <p className="text-[10px] text-secondary font-bold mt-1">أدمن النظام</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <User className="w-5 h-5" />
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild className="rounded-xl text-destructive hover:bg-red-50">
                 <Link href="/auth/welcome"><LogOut className="w-5 h-5" /></Link>
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-10 pb-24">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

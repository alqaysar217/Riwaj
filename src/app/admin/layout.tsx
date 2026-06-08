
'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/navigation/admin-sidebar";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/20" dir="ltr">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0" dir="rtl">
          {/* Top Bar for Admin */}
          <header className="h-20 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="text-primary hover:bg-primary/5" />
              <div className="md:hidden flex items-center gap-2 mr-2">
                <Image src="/logo.png" alt="رواج" width={32} height={32} className="object-contain" />
                <span className="text-xl font-headline font-bold text-primary">رواج</span>
              </div>
              <div className="relative w-full max-w-md group hidden md:block">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="ابحث عن متجر، مستخدم، أو رقم طلب..." 
                  className="h-11 pr-10 bg-muted/30 border-none rounded-xl w-full focus-visible:ring-1 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative bg-muted/30 hover:bg-primary/5 hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
              </Button>
              <div className="h-8 w-px bg-border mx-2 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <div className="text-left hidden md:block">
                  <p className="text-xs font-bold leading-none">الإدارة العامة</p>
                  <p className="text-[10px] text-muted-foreground mt-1">متصل الآن</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

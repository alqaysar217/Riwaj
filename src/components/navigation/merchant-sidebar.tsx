
'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Store,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Ticket
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "لوحة التحكم", icon: LayoutDashboard, href: "/merchant/dashboard" },
  { label: "المنتجات", icon: Package, href: "/merchant/products" },
  { label: "الطلبات", icon: ShoppingCart, href: "/merchant/orders" },
  { label: "المحادثات", icon: MessageSquare, href: "/merchant/messages" },
  { label: "الكوبونات", icon: Ticket, href: "/merchant/coupons" },
  { label: "بروفايل المتجر", icon: Store, href: "/merchant/store" },
];

const TOOLS_ITEMS = [
  { label: "التقارير المالية", icon: BarChart3, href: "/merchant/reports" },
  { label: "إعدادات الحساب", icon: Settings, href: "/merchant/settings" },
];

export function MerchantSidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/merchant/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Sidebar side="right" className="border-l bg-white" dir="rtl">
      <SidebarHeader className="h-24 flex items-center justify-start px-4 border-b">
        <Link href="/merchant/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
             {/* Glowing effect behind logo */}
             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <Image 
              src="/logo.png" 
              alt="رواج" 
              width={54} 
              height={52} 
              className="object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(15,118,110,0.3)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-3xl font-headline font-bold text-primary tracking-tight">رواج</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">إدارة المتجر</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-200 group",
                        active 
                          ? "bg-gradient-to-l from-primary to-primary/80 text-white shadow-lg shadow-primary/20" 
                          : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <item.icon className={cn("w-5 h-5 transition-colors", active ? "text-white" : "text-primary")} />
                        <span className={cn("font-bold text-sm transition-colors", active ? "text-white" : "text-foreground")}>{item.label}</span>
                        {active && <ChevronLeft className="w-4 h-4 mr-auto animate-in slide-in-from-right-2 duration-300 text-white" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">أدوات إضافية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOOLS_ITEMS.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-200 group",
                        active 
                          ? "bg-gradient-to-l from-primary to-primary/80 text-white shadow-lg shadow-primary/20" 
                          : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <item.icon className={cn("w-5 h-5 transition-colors", active ? "text-white" : "text-primary")} />
                        <span className={cn("font-bold text-sm transition-colors", active ? "text-white" : "text-foreground")}>{item.label}</span>
                        {active && <ChevronLeft className="w-4 h-4 mr-auto animate-in slide-in-from-right-2 duration-300 text-white" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t">
        <Button variant="ghost" className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/5 hover:text-destructive font-bold gap-2" asChild>
          <Link href="/">
            <LogOut className="w-4 h-4" /> العودة للتسوق
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

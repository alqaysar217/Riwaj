
'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Store,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft
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
  { label: "بروفايل المتجر", icon: Store, href: "/merchant/store" },
];

const TOOLS_ITEMS = [
  { label: "التقارير", icon: BarChart3, href: "/merchant/reports" },
  { label: "الإعدادات", icon: Settings, href: "/merchant/settings" },
];

export function MerchantSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right" className="border-l bg-white hidden md:flex">
      <SidebarHeader className="h-20 flex items-center justify-center border-b px-6">
        <Link href="/merchant/dashboard" className="flex items-center gap-2">
          <span className="text-3xl font-headline font-bold text-primary">رواج</span>
          <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary/20">التاجر</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">إدارة المتجر</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-12 px-4 rounded-xl transition-all duration-200 group",
                      pathname === item.href 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-primary")} />
                      <span className="font-bold text-sm">{item.label}</span>
                      {pathname === item.href && <ChevronLeft className="w-4 h-4 mr-auto" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">أدوات إضافية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOOLS_ITEMS.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-12 px-4 rounded-xl transition-all duration-200",
                      pathname === item.href 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-primary")} />
                      <span className="font-bold text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

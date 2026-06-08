
'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  LayoutGrid,
  Bell,
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
  { label: "لوحة التحكم", icon: LayoutDashboard, href: "/admin" },
  { label: "توثيق المتاجر", icon: ShieldCheck, href: "/admin/verifications" },
  { label: "إدارة المتاجر", icon: Store, href: "/admin/stores" },
  { label: "إدارة المستخدمين", icon: Users, href: "/admin/users" },
  { label: "إدارة الفئات", icon: LayoutGrid, href: "/admin/categories" },
  { label: "التقارير والتحليلات", icon: BarChart3, href: "/admin/reports" },
];

const SYSTEM_ITEMS = [
  { label: "الإشعارات العامة", icon: Bell, href: "/admin/notifications" },
  { label: "إعدادات النظام", icon: Settings, href: "/admin/settings" },
  { label: "مركز المساعدة", icon: HelpCircle, href: "/admin/help" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/admin') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Sidebar side="right" className="border-l bg-white" dir="rtl">
      <SidebarHeader className="h-24 flex items-center justify-start px-6 border-b">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <Image 
              src="/logo.png" 
              alt="رواج" 
              width={48} 
              height={48} 
              className="object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(15,118,110,0.2)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-2xl font-headline font-bold text-primary tracking-tight">رواج</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">القائمة الرئيسية</SidebarGroupLabel>
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
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">النظام</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SYSTEM_ITEMS.map((item) => {
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
        <div className="flex items-center gap-3 mb-6 p-3 bg-muted/30 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            م
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">مدير النظام</p>
            <p className="text-[10px] text-muted-foreground truncate">admin@riwaj.ye</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/5 hover:text-destructive font-bold gap-2" asChild>
          <Link href="/auth/welcome">
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

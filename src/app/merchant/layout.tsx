
'use client';

import { MerchantBottomNav } from "@/components/navigation/merchant-bottom-nav"
import { Header } from "@/components/layout/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MerchantSidebar } from "@/components/navigation/merchant-sidebar"

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background" dir="rtl">
        <MerchantSidebar />
        <SidebarInset className="flex flex-col">
          <Header />
          <main className="flex-1 pb-24 md:pb-8">
            {children}
          </main>
          <MerchantBottomNav />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

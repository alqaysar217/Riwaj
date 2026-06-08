
'use client';

import { MerchantBottomNav } from "@/components/navigation/merchant-bottom-nav"
import { Header } from "@/components/layout/header"

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24">
        {children}
      </main>
      <MerchantBottomNav />
    </div>
  )
}

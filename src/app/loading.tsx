
'use client';

import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-6">
      <div className="relative group">
        <div className="w-24 h-24 border-4 border-primary/5 rounded-[2rem] animate-[spin_3s_linear_infinite] border-t-primary shadow-xl shadow-primary/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-12 h-12">
             <span className="text-4xl font-headline font-bold text-primary animate-pulse">ر</span>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-3 animate-in fade-in zoom-in-95 duration-700">
        <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">رواج</h2>
        <p className="text-sm text-muted-foreground font-medium max-w-[200px] leading-relaxed">
          نجمع لك كنوز اليمن الأصيلة من قلب الطبيعة
        </p>
        <div className="flex gap-1 justify-center">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

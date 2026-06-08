
'use client';

import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-6">
      <div className="relative group">
        {/* Outer Spinning Ring */}
        <div className="w-28 h-28 border-4 border-primary/5 rounded-[2.5rem] animate-[spin_3s_linear_infinite] border-t-primary shadow-xl shadow-primary/10" />
        
        {/* Inner Logo Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-14 h-14 bg-white rounded-2xl shadow-lg border border-primary/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-500">
             <div className="absolute inset-0 bg-primary/5 blur-md rounded-full animate-pulse" />
             <Image 
              src="/logo.png" 
              alt="رواج" 
              width={40} 
              height={40} 
              className="object-contain relative z-10 animate-pulse"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-3 animate-in fade-in zoom-in-95 duration-700">
        <h2 className="text-3xl font-headline font-bold text-primary tracking-tight">رواج</h2>
        <p className="text-sm text-muted-foreground font-medium max-w-[200px] leading-relaxed">
          نجمع لك كنوز اليمن الأصيلة من قلب الطبيعة
        </p>
        <div className="flex gap-1.5 justify-center mt-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}


'use client';

import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-8">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full animate-pulse" />

      <div className="relative group">
        {/* Main Rotating Container */}
        <div className="w-36 h-36 relative animate-[spin_8s_linear_infinite]">
          {/* Outer Border Effect */}
          <div className="absolute inset-0 border-4 border-primary/10 rounded-[3rem] border-t-primary shadow-2xl shadow-primary/10" />
          
          {/* Logo Container - Takes full size and rotates with the parent */}
          <div className="absolute inset-2 bg-white rounded-[2.5rem] shadow-xl border border-primary/5 flex items-center justify-center overflow-hidden p-6 group-hover:scale-105 transition-transform duration-500">
            <div className="relative w-full h-full">
              <Image 
                src="/logo.png" 
                alt="رواج" 
                fill
                className="object-contain p-2 animate-pulse"
                priority
              />
            </div>
          </div>
        </div>

        {/* Static Center Point for Balance (Optional, but helps focus) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_rgba(212,160,23,0.8)] animate-ping" />
        </div>
      </div>
      
      <div className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-headline font-bold text-primary tracking-tighter">رواج</h2>
          <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.3em]">سوق اليمن الأصيل</p>
        </div>
        
        <p className="text-sm text-muted-foreground font-medium max-w-[250px] leading-relaxed mx-auto">
          نستخرج لك كنوز اليمن من قلب الطبيعة...
        </p>
        
        <div className="flex gap-2 justify-center mt-4">
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.3s] shadow-sm" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s] shadow-sm" />
          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce shadow-sm" />
        </div>
      </div>
    </div>
  );
}


'use client';

import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary/10 rounded-full animate-spin border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-headline font-bold text-xl">ر</span>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-headline font-bold text-primary animate-pulse">جاري تحميل رواج...</h2>
        <p className="text-xs text-muted-foreground font-medium">نجمع لك كنوز اليمن الأصيلة</p>
      </div>
    </div>
  );
}

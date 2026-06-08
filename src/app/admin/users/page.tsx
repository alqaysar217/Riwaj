
'use client';

import { useState } from "react"
import { 
  Users, 
  Search, 
  MoreVertical, 
  ShieldCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const USERS_LIST = [
  { id: 1, name: "أحمد علي محمد", email: "ahmed@mail.com", phone: "775258830", joined: "24 مايو 2024", role: "customer", status: "active", orders: 12 },
  { id: 2, name: "سارة محمود", email: "sara@mail.com", phone: "771234567", joined: "12 مايو 2024", role: "merchant", status: "active", orders: 45 },
  { id: 3, name: "خالد بن الوليد", email: "khaled@mail.com", phone: "733333333", joined: "1 مايو 2024", role: "customer", status: "suspended", orders: 2 },
]

export default function AdminUsers() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-8 rounded-[35px] border shadow-sm">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">إدارة المستخدمين</h1>
          <p className="text-muted-foreground text-sm mt-1">التحكم في صلاحيات وحسابات أعضاء منصة رواج</p>
        </div>
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Users className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث بالاسم، البريد، أو رقم الهاتف..." 
            className="h-12 pr-11 rounded-2xl bg-white border-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 rounded-2xl bg-white border-none shadow-sm gap-2 font-bold px-6">
          <Filter className="w-4 h-4" /> كل الأدوار
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {USERS_LIST.map((user) => (
          <Card key={user.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 w-full md:w-auto">
                   <Avatar className="w-14 h-14 border-2 border-primary/5">
                      <AvatarImage src={`https://picsum.photos/seed/u${user.id}/100/100`} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name[0]}</AvatarFallback>
                   </Avatar>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-base truncate">{user.name}</h3>
                        <Badge className={cn(
                          "text-[8px] font-bold px-2 py-0.5 border-none",
                          user.role === 'merchant' ? "bg-secondary text-white" : "bg-primary text-white"
                        )}>
                          {user.role === 'merchant' ? 'تاجر' : 'مشتري'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground font-medium">
                         <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email}</span>
                         <span className="flex items-center gap-1.5" dir="ltr"><Phone className="w-3 h-3" /> {user.phone}</span>
                         <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> انضم: {user.joined}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                   <div className="text-center hidden sm:block">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">الطلبات</p>
                      <p className="font-bold text-primary">{user.orders}</p>
                   </div>
                   <div className="text-center">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">الحالة</p>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold",
                        user.status === 'active' ? "text-green-600" : "text-destructive"
                      )}>
                        {user.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {user.status === 'active' ? 'نشط' : 'موقوف'}
                      </div>
                   </div>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-xl border-none">
                        <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-3">
                           <ShieldCheck className="w-4 h-4 text-primary" /> تعديل الصلاحيات
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-3 text-destructive">
                           <UserX className="w-4 h-4" /> {user.status === 'active' ? 'إيقاف الحساب' : 'تفعيل الحساب'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


'use client';

import { useState, useMemo } from "react"
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
  AlertCircle,
  X,
  UserCheck,
  ShieldAlert,
  Save,
  Type,
  LayoutGrid,
  ShoppingBag,
  ArrowUpRight
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const INITIAL_USERS = [
  { id: 1, name: "أحمد علي محمد", email: "ahmed@mail.com", phone: "775258830", joined: "24 مايو 2024", role: "customer", status: "active", orders: 12, image: "/user-1.png" },
  { id: 2, name: "فاطمة حسن القاضي", email: "fatima@mail.com", phone: "771234567", joined: "12 يونيو 2024", role: "customer", status: "active", orders: 8, image: "/user-2.png" },
  { id: 3, name: "خالد سعيد باوزير", email: "khaled@mail.com", phone: "770987654", joined: "05 يوليو 2024", role: "customer", status: "suspended", orders: 2, image: "/user-3.png" },
  { id: 4, name: "سارة عبدالله حسين", email: "sarah@mail.com", phone: "773456789", joined: "18 أغسطس 2024", role: "merchant", status: "active", orders: 25, image: "/user-4.png" },
  { id: 5, name: "محمد ناصر اليافعي", email: "mohammed@mail.com", phone: "774123987", joined: "30 أغسطس 2024", role: "admin", status: "active", orders: 0, image: "/user-5.png" },
];

export default function AdminUsers() {
  const { toast } = useToast()
  const [users, setUsers] = useState(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({ role: "", status: "" })

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm);
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    })
  }, [searchTerm, roleFilter, users])

  const handleOpenEdit = (user: any) => {
    setEditingUser(user)
    setEditFormData({ role: user.role, status: user.status })
    setIsEditOpen(true)
  }

  const handleSavePermissions = () => {
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? { 
      ...u, 
      role: editFormData.role, 
      status: editFormData.status 
    } : u))
    toast({ title: "تم تحديث الصلاحيات بنجاح" })
    setIsEditOpen(false)
  }

  const toggleUserStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u))
    toast({
      title: newStatus === 'active' ? "تم التفعيل" : "تم الإيقاف",
      variant: newStatus === 'active' ? "default" : "destructive"
    })
  }

  return (
    <div className="space-y-8">
      {/* Page Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 flex items-center justify-between bg-white p-8 rounded-[30px] border shadow-sm">
          <div>
            <h1 className="text-3xl font-headline font-bold text-primary">إدارة المستخدمين</h1>
            <p className="text-muted-foreground text-sm mt-1">التحكم في صلاحيات وحسابات أعضاء منصة رواج</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
            <Users className="w-8 h-8" />
          </div>
        </div>
        
        <Card className="border-none shadow-sm rounded-[30px] bg-primary text-white p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
           <div className="relative z-10 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-bold uppercase opacity-70">نشطون الآن</p>
                 <h4 className="text-2xl font-bold">1,240</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                 <ArrowUpRight className="w-6 h-6" />
              </div>
           </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[30px] bg-secondary text-white p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
           <div className="relative z-10 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-bold uppercase opacity-70">طلبات جديدة</p>
                 <h4 className="text-2xl font-bold">45</h4>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                 <ShoppingBag className="w-6 h-6" />
              </div>
           </div>
        </Card>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[24px] border shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث بالاسم، البريد، أو رقم الهاتف..." 
            className="h-12 pr-11 pl-10 rounded-xl bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {['all', 'customer', 'merchant', 'admin'].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "ghost"}
              onClick={() => setRoleFilter(role)}
              className={cn(
                "rounded-xl h-12 px-4 font-bold text-xs transition-all",
                roleFilter === role ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              {role === 'all' ? 'الكل' : role === 'customer' ? 'مشترين' : role === 'merchant' ? 'تجار' : 'مديرين'}
            </Button>
          ))}
        </div>
      </div>

      {/* Users List - Improved Visual Hierarchy */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Card key={user.id} className="border-none shadow-sm rounded-[24px] overflow-hidden group hover:shadow-md transition-all border border-transparent hover:border-primary/5 bg-white">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5 flex-1 w-full">
                     <div className="relative">
                        <Avatar className="w-16 h-16 border-2 border-primary/10 shadow-sm rounded-2xl">
                           <AvatarImage src={user.image} className="object-cover" />
                           <AvatarFallback className="bg-primary/5 text-primary font-bold">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -left-1 w-5 h-5 rounded-full border-4 border-white shadow-sm",
                          user.status === 'active' ? "bg-green-500" : "bg-red-500"
                        )} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors truncate">{user.name}</h3>
                          <Badge className={cn(
                            "text-[8px] font-bold px-2 py-0.5 border-none",
                            user.role === 'merchant' ? "bg-secondary text-white" : 
                            user.role === 'admin' ? "bg-red-600 text-white" : "bg-primary text-white"
                          )}>
                            {user.role === 'merchant' ? 'تاجر' : user.role === 'admin' ? 'مدير' : 'مشتري'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted-foreground font-bold">
                           <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary/50" /> {user.email}</span>
                           <span className="flex items-center gap-1.5" dir="ltr"><Phone className="w-3.5 h-3.5 text-primary/50" /> {user.phone}</span>
                           <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary/50" /> {user.joined}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                     <div className="text-center px-4">
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-1">الطلبات</p>
                        <div className="flex items-center gap-1 justify-center">
                           <ShoppingBag className="w-3 h-3 text-secondary" />
                           <span className="font-bold text-primary text-lg">{user.orders}</span>
                        </div>
                     </div>
                     <div className="h-10 w-px bg-muted hidden md:block" />
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-muted/20 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all">
                            <MoreVertical className="w-6 h-6" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl p-2 w-56 shadow-2xl border-none bg-white">
                          <DropdownMenuItem className="rounded-lg gap-3 font-bold text-xs py-3 cursor-pointer" onClick={() => handleOpenEdit(user)}>
                             <ShieldCheck className="w-4.5 h-4.5 text-primary" /> تعديل الصلاحيات
                          </DropdownMenuItem>
                          <DropdownMenuItem className={cn("rounded-lg gap-3 font-bold text-xs py-3 cursor-pointer", user.status === 'active' ? "text-destructive" : "text-green-600")} onClick={() => toggleUserStatus(user.id, user.status)}>
                             {user.status === 'active' ? <><UserX className="w-4.5 h-4.5" /> حظر المستخدم</> : <><UserCheck className="w-4.5 h-4.5" /> تفعيل الحساب</>}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-lg gap-3 font-bold text-xs py-3 cursor-pointer text-muted-foreground">
                             <ShieldAlert className="w-4.5 h-4.5" /> سجل النشاط
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-[40px] border border-dashed border-primary/20">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="w-10 h-10 text-primary opacity-20" />
             </div>
             <h3 className="font-bold text-lg text-primary">لا توجد نتائج</h3>
             <p className="text-muted-foreground text-xs">جرب كلمات بحث أخرى أو قم بتغيير الفلتر</p>
          </div>
        )}
      </div>

      {/* Edit Permissions Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="rounded-[40px] sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-6 [&>button]:right-auto">
          <DialogHeader className="p-8 bg-muted/30 border-b">
            <DialogTitle className="text-2xl font-headline font-bold text-primary text-right flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-secondary" /> تعديل الصلاحيات
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 space-y-8">
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-primary/5 border border-primary/10">
               <Avatar className="w-14 h-14 rounded-2xl">
                  <AvatarImage src={editingUser?.image} className="object-cover" />
                  <AvatarFallback className="rounded-2xl">{editingUser?.name[0]}</AvatarFallback>
               </Avatar>
               <div>
                  <h4 className="font-bold text-base">{editingUser?.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{editingUser?.email}</p>
               </div>
            </div>
            <div className="space-y-6">
               <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                     <Type className="w-4 h-4 text-primary" /> دور المستخدم
                  </Label>
                  <Select value={editFormData.role} onValueChange={(v) => setEditFormData({...editFormData, role: v})}>
                    <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border-none shadow-2xl">
                      <SelectItem value="customer" className="font-bold py-3">مشتري (Customer)</SelectItem>
                      <SelectItem value="merchant" className="font-bold py-3">تاجر (Merchant)</SelectItem>
                      <SelectItem value="admin" className="font-bold py-3">مدير (Admin)</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                     <LayoutGrid className="w-4 h-4 text-primary" /> حالة الحساب
                  </Label>
                  <Select value={editFormData.status} onValueChange={(v) => setEditFormData({...editFormData, status: v})}>
                    <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border-none shadow-2xl">
                      <SelectItem value="active" className="text-green-600 font-bold py-3">نشط (Active)</SelectItem>
                      <SelectItem value="suspended" className="text-destructive font-bold py-3">موقوف (Suspended)</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSavePermissions} className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 font-bold gap-2 shadow-xl shadow-primary/20">
                <Save className="w-5 h-5" /> حفظ الصلاحيات
              </Button>
              <Button variant="ghost" onClick={() => setIsEditOpen(false)} className="flex-1 h-14 rounded-2xl font-bold text-muted-foreground">إلغاء</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

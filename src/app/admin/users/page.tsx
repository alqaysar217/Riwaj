
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
  Loader2,
  Save,
  Type,
  LayoutGrid
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
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
  { id: 4, name: "سارة عبدالله حسين", email: "sarah@mail.com", phone: "773456789", joined: "18 أغسطس 2024", role: "customer", status: "active", orders: 25, image: "/user-4.png" },
  { id: 5, name: "محمد ناصر اليافعي", email: "mohammed@mail.com", phone: "774123987", joined: "30 أغسطس 2024", role: "admin", status: "active", orders: 0, image: "/user-5.png" },
  { id: 6, name: "ليلى محمود الصبري", email: "layla@mail.com", phone: "776543210", joined: "14 سبتمبر 2024", role: "customer", status: "active", orders: 15, image: "/user-6.png" },
  { id: 7, name: "عمر فاروق الشميري", email: "omar@mail.com", phone: "778899001", joined: "02 أكتوبر 2024", role: "customer", status: "active", orders: 5, image: "/user-7.png" },
  { id: 8, name: "نورة يوسف الحمادي", email: "noura@mail.com", phone: "772233445", joined: "21 أكتوبر 2024", role: "customer", status: "suspended", orders: 1, image: "/user-8.png" },
  { id: 9, name: "بدر خالد العولقي", email: "badr@mail.com", phone: "779988776", joined: "10 نوفمبر 2024", role: "customer", status: "active", orders: 9, image: "/user-9.png" },
  { id: 10, name: "منى إبراهيم المنصوري", email: "mona@mail.com", phone: "771122334", joined: "29 نوفمبر 2024", role: "customer", status: "active", orders: 18, image: "/user-10.png" }
];

export default function AdminUsers() {
  const { toast } = useToast()
  const [users, setUsers] = useState(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  
  // Edit State
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

    toast({
      title: "تم تحديث الصلاحيات",
      description: `تم تعديل بيانات المستخدم ${editingUser.name} بنجاح.`,
    })
    setIsEditOpen(false)
  }

  const toggleUserStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u))
    
    toast({
      title: newStatus === 'active' ? "تم التفعيل" : "تم الإيقاف",
      description: `تم ${newStatus === 'active' ? 'تفعيل' : 'إيقاف'} حساب المستخدم بنجاح.`,
      variant: newStatus === 'active' ? "default" : "destructive"
    })
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">إدارة المستخدمين</h1>
          <p className="text-muted-foreground text-sm mt-1">التحكم في صلاحيات وحسابات أعضاء منصة رواج</p>
        </div>
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-inner">
          <Users className="w-7 h-7" />
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="بحث بالاسم، البريد، أو رقم الهاتف..." 
            className="h-12 pr-11 pl-10 rounded-xl bg-white border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="w-full md:w-48">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-12 rounded-xl bg-white border-none shadow-sm font-bold text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-primary" />
                <SelectValue placeholder="تصفية الدور" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-xl">
              <SelectItem value="all">كل الأدوار</SelectItem>
              <SelectItem value="customer">مشتري</SelectItem>
              <SelectItem value="merchant">تاجر</SelectItem>
              <SelectItem value="admin">مدير</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Card key={user.id} className="border-none shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all border border-transparent hover:border-primary/10">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5 w-full md:w-auto">
                     <Avatar className="w-14 h-14 border-2 border-primary/5 shadow-sm rounded-xl">
                        <AvatarImage src={user.image} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-xl">{user.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base truncate">{user.name}</h3>
                          <Badge className={cn(
                            "text-[8px] font-bold px-2 py-0.5 border-none",
                            user.role === 'merchant' ? "bg-secondary text-white" : 
                            user.role === 'admin' ? "bg-red-600 text-white" : "bg-primary text-white"
                          )}>
                            {user.role === 'merchant' ? 'تاجر' : user.role === 'admin' ? 'مدير' : 'مشتري'}
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
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl p-2 w-56 shadow-xl border-none bg-white">
                          <DropdownMenuItem 
                            className="rounded-lg gap-3 font-bold text-xs py-3 cursor-pointer"
                            onClick={() => handleOpenEdit(user)}
                          >
                             <ShieldCheck className="w-4 h-4 text-primary" /> تعديل الصلاحيات
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className={cn(
                              "rounded-lg gap-3 font-bold text-xs py-3 cursor-pointer",
                              user.status === 'active' ? "text-destructive" : "text-green-600"
                            )}
                            onClick={() => toggleUserStatus(user.id, user.status)}
                          >
                             {user.status === 'active' ? (
                               <><UserX className="w-4 h-4" /> إيقاف الحساب</>
                             ) : (
                               <><UserCheck className="w-4 h-4" /> تفعيل الحساب</>
                             )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 bg-muted/20 rounded-xl border border-dashed border-primary/20">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="w-10 h-10 text-primary opacity-20" />
             </div>
             <h3 className="font-bold text-lg text-primary">لم يتم العثور على مستخدمين</h3>
             <p className="text-muted-foreground text-xs mt-1">جرب تغيير كلمات البحث أو نوع الدور في الفلاتر</p>
          </div>
        )}
      </div>

      {/* Edit Permissions Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="rounded-xl sm:max-w-md border-none shadow-2xl p-0 overflow-hidden [&>button]:left-6 [&>button]:right-auto">
          <DialogHeader className="p-8 bg-muted/30 border-b">
            <DialogTitle className="text-2xl font-headline font-bold text-primary text-right flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-secondary" />
              تعديل صلاحيات المستخدم
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-8 space-y-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
               <Avatar className="w-12 h-12 rounded-xl">
                  <AvatarImage src={editingUser?.image} className="object-cover" />
                  <AvatarFallback className="rounded-xl">{editingUser?.name[0]}</AvatarFallback>
               </Avatar>
               <div>
                  <h4 className="font-bold text-sm">{editingUser?.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{editingUser?.email}</p>
               </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                     <Type className="w-3.5 h-3.5 text-primary" /> دور المستخدم في النظام
                  </Label>
                  <Select 
                    value={editFormData.role} 
                    onValueChange={(v) => setEditFormData({...editFormData, role: v})}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none px-6 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="customer">مشتري (Customer)</SelectItem>
                      <SelectItem value="merchant">تاجر (Merchant)</SelectItem>
                      <SelectItem value="admin">مدير (Admin)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[9px] text-muted-foreground mr-2 italic">تغيير الدور يؤثر على الواجهات والوظائف المتاحة للمستخدم.</p>
               </div>

               <div className="space-y-3">
                  <Label className="text-xs font-bold text-muted-foreground pr-2 flex items-center gap-2">
                     <LayoutGrid className="w-3.5 h-3.5 text-primary" /> حالة الحساب الحالية
                  </Label>
                  <Select 
                    value={editFormData.status} 
                    onValueChange={(v) => setEditFormData({...editFormData, status: v})}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-none px-6 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-none shadow-2xl">
                      <SelectItem value="active" className="text-green-600 font-bold">نشط (Active)</SelectItem>
                      <SelectItem value="suspended" className="text-destructive font-bold">موقوف (Suspended)</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSavePermissions} 
                className="flex-[2] h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold gap-2 shadow-lg shadow-primary/20"
              >
                <Save className="w-5 h-5" /> حفظ الصلاحيات
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setIsEditOpen(false)} 
                className="flex-1 h-12 rounded-xl font-bold text-muted-foreground"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

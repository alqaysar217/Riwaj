'use client';

import { useState } from "react"
import { Search, Send, MoreVertical, Phone, User, CheckCheck, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const CHATS = [
  { id: 1, user: "أحمد علي", lastMsg: "هل يتوفر البن الخولاني حالياً؟", time: "10:30 ص", unread: 2, online: true, avatar: "https://picsum.photos/seed/u1/100/100" },
  { id: 2, user: "سارة محمد", lastMsg: "شكراً لك، المنتج رائع جداً", time: "أمس", unread: 0, online: false, avatar: "https://picsum.photos/seed/u2/100/100" },
  { id: 3, user: "خالد بن الوليد", lastMsg: "متى سيتم شحن الطلب رقم #9021؟", time: "24 مايو", unread: 0, online: true, avatar: "https://picsum.photos/seed/u3/100/100" },
]

export default function MerchantMessages() {
  const [activeChat, setActiveChat] = useState(CHATS[0])
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white rounded-3xl border shadow-sm mx-4 mb-4">
      {/* Sidebar - Chats List */}
      <div className="w-full md:w-80 border-l flex flex-col">
        <div className="p-6 border-b bg-muted/10">
          <h1 className="text-xl font-headline font-bold text-primary mb-4">المحادثات</h1>
          <div className="relative group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="بحث عن عميل..." className="h-10 pr-9 bg-white border-none rounded-xl shadow-sm" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
          {CHATS.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all",
                activeChat.id === chat.id ? "bg-primary text-white shadow-md" : "hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <Avatar className="w-12 h-12 border-2 border-white/20 shadow-sm">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{chat.user[0]}</AvatarFallback>
                </Avatar>
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-xs truncate">{chat.user}</h3>
                  <span className={cn("text-[9px]", activeChat.id === chat.id ? "text-white/70" : "text-muted-foreground")}>{chat.time}</span>
                </div>
                <p className={cn("text-[10px] truncate", activeChat.id === chat.id ? "text-white/80" : "text-muted-foreground")}>{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && activeChat.id !== chat.id && (
                <div className="w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-muted/5">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border shadow-sm">
              <AvatarImage src={activeChat.avatar} />
              <AvatarFallback>{activeChat.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-sm text-primary">{activeChat.user}</h3>
              <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> متصل الآن
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 text-primary">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 text-primary">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 text-primary">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <span className="text-[10px] font-bold bg-white px-3 py-1 rounded-full border text-muted-foreground uppercase tracking-widest">أمس</span>
            </div>
            
            {/* Customer Message */}
            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm border border-primary/5">
                <p className="text-xs leading-relaxed text-foreground">مرحباً، هل يتوفر لديكم بن خولاني محمص درجة أولى؟</p>
                <div className="flex items-center justify-end gap-1 mt-1 opacity-50">
                  <span className="text-[8px] font-bold">10:30 ص</span>
                </div>
              </div>
            </div>

            {/* Merchant Response */}
            <div className="flex items-end gap-2 max-w-[80%] mr-auto flex-row-reverse">
              <div className="bg-primary p-4 rounded-2xl rounded-bl-none shadow-lg shadow-primary/10">
                <p className="text-xs leading-relaxed text-white">أهلاً بك يا أحمد. نعم متوفر حالياً وبجودة عالية جداً، تم تحميصه بالأمس فقط.</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-white/50">
                  <span className="text-[8px] font-bold">10:32 ص</span>
                  <CheckCheck className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <form className="flex gap-2 items-center" onSubmit={(e) => e.preventDefault()}>
            <Button type="button" variant="ghost" size="icon" className="rounded-full text-primary hover:bg-primary/5">
              <Clock className="w-5 h-5" />
            </Button>
            <div className="relative flex-1">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..." 
                className="h-12 rounded-2xl bg-muted/30 border-none px-6 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
            <Button className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Send className="w-5 h-5 rotate-180" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

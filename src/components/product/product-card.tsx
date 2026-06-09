import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  title: string
  price: number
  image: string
  rating: number
  reviews: number
  storeName: string
  category: string
}

export function ProductCard({ id, title, price, image, rating, reviews, storeName, category }: ProductCardProps) {
  // Safe image source handling to prevent empty string error
  const imageSrc = image || "/products-1.png"

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/products/${id}`} className="block relative aspect-square">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-2 left-2 rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute bottom-2 right-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-medium text-primary shadow-sm border border-primary/10">
            {category}
          </span>
        </div>
      </Link>
      <CardContent className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 fill-secondary text-secondary" />
          <span className="text-[10px] font-semibold">{rating}</span>
          <span className="text-[10px] text-muted-foreground">({reviews})</span>
        </div>
        <Link href={`/products/${id}`}>
          <h3 className="text-sm font-bold line-clamp-1 mb-1 group-hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">{storeName}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">{price} ر.ي</span>
          <Button size="sm" variant="outline" className="h-7 text-[10px] px-2 border-primary/20 text-primary hover:bg-primary hover:text-white">أضف للسلة</Button>
        </div>
      </CardContent>
    </Card>
  )
}

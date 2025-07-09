"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react"
import Link from "next/link"

const featuredPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    excerpt: "Explore the latest trends and technologies shaping the future of web development.",
    image: "/fantasy-characters.jpg",
    author: "Sarah Johnson",
    readTime: "5 min read",
    category: "Technology",
  },
  {
    id: 2,
    title: "Building Sustainable Apps: A Developer's Guide",
    excerpt: "Learn how to create environmentally conscious applications that make a difference.",
    image: "/woman-punk.jpg",
    author: "Mike Chen",
    readTime: "8 min read",
    category: "Environment",
  },
  {
    id: 3,
    title: "The Art of Minimalist Design in Modern UX",
    excerpt: "Discover how less can be more when it comes to user experience design.",
    image: "/cyberpunk-kid.jpg",
    author: "Emma Davis",
    readTime: "6 min read",
    category: "Design",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
  }

  return (
    <div className="relative h-[500px] overflow-hidden w-full">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredPosts.map((post) => (
          <div key={post.id} className="w-full flex-shrink-0 relative">
            <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{post.category}</span>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>
                      <Link href={`/post/${post.id}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600">Read More</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredPosts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight,Heart, MessageCircle, Bookmark, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

const tabs = ["Feed", "Following", "Featured", "Popular", "Latest", "Topics"]

const posts = [
  {
    id: 1,
    publication: "Change Your Mind Change Your Life",
    author: "Olly J",
    avatar: "/vercel.svg",
    title: "The 1-Minute Introduction That Makes People Remember You Forever",
    subtitle: "How High-Performing Executives Can Build Connection, Authority, and Trust in 60 Seconds or Less",
    image: "/fantasy-characters.jpg",
    date: "May 19",
    readTime: "4 min read",
    claps: "1.7K",
    comments: "57",
    category: "Business",
  },
  {
    id: 2,
    publication: "Data Science Collective",
    author: "Egor Howell",
    avatar: "/vercel.svg",
    title: "STOP Taking Random AI Courses—Read These Books Instead",
    subtitle: "A comprehensive guide to the books and courses that helped me learn AI",
    image: "/placeholder.svg?height=120&width=120",
    date: "Jun 28",
    readTime: "6 min read",
    claps: "1.1K",
    comments: "25",
    category: "Technology",
  },
  {
    id: 3,
    publication: "LearnAItoprofit.com",
    author: "Raj Monetix",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "I Built a Side Hustle with AI. Now It Pays Me $900 every month",
    subtitle: "How I created a profitable AI-powered business in my spare time",
    image: "/placeholder.svg?height=120&width=120",
    date: "Jul 2",
    readTime: "8 min read",
    claps: "892",
    comments: "43",
    category: "Entrepreneurship",
  },
  {
    id: 4,
    publication: "UX Planet",
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "The Psychology Behind Addictive App Design",
    subtitle: "Understanding the dark patterns that keep users hooked and how to design ethically",
    image: "/placeholder.svg?height=120&width=120",
    date: "Jun 15",
    readTime: "7 min read",
    claps: "2.3K",
    comments: "89",
    category: "Design",
  },
]

export function BlogFeed() {
  const [activeTab, setActiveTab] = useState("For you")
  const tabListRef = useRef<HTMLDivElement>(null)

  const scrollTabsRight = () => {   
    if (tabListRef.current) {
        tabListRef.current.scrollBy({ left: 200, behavior: "smooth" })
    } 
}

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex items-center  border-b border-gray-200 mb-3 ">
        <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hidden " ref={tabListRef}>

        
        <Button variant="ghost" size="sm" className="p-2 flex-shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 w-20 text-sm font-light
                 border-b-2 transition-colors md:font-medium lg:font-medium ${
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
        </div>
    
        <button
        onClick={scrollTabsRight}
        className="absolute right-0 to-1 -translate-y-1 bg-white p-1 lg:hidden ">
        <ChevronRight 
        className="h-8 w-8 text-gray-500 flex lg:hidden
          " />
        </button>
    

      </div>

      {/* Posts Feed */}
      <div className="space-y-8 overflow-hidden ">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <div className="flex items-start space-x-2 mb-3">
              <Avatar className="h-5 w-5">
                <AvatarImage src={post.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs truncate">{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1 text-sm text-gray-600 truncate">
                <span className="font-medium truncate">{post.publication}</span>
                <span className=" sm:inline">by</span>
                <span className="font-medium truncate">{post.author}</span>
              </div>
            </div>

            <div className="flex justify-between items-start overflow-hidden">
              <div className="flex-1 pr-3">
                <Link href={`/post/${post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-base mb-4 line-clamp-3">{post.subtitle}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex">{post.date}</span>
                    <span>·</span>
                    <span className="hidden sm:hidden md:flex lg:flex">{post.readTime}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hidden">
                        {post.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="items-center  space-x-1 text-gray-500 hover:text-gray-700 hidden md:flex lg:flex ">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.claps}</span>
                    </button>
                    <button className="hidden items-center space-x-1 text-gray-500 hover:text-gray-700 md:flex lg:flex">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="hidden text-gray-500 hover:text-gray-700 md:flex lg:flex">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-20 h-20 md:w-33 md:h-33">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-20 w-20 md:w-33 md:h-30 object-cover rounded lg:w-33 lg:h-30"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

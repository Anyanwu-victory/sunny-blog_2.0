"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

const tabs = ["For you", "Following", "Featured"]

const posts = [
  {
    id: 1,
    publication: "Change Your Mind Change Your Life",
    author: "Olly J",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "The 1-Minute Introduction That Makes People Remember You Forever",
    subtitle: "How High-Performing Executives Can Build Connection, Authority, and Trust in 60 Seconds or Less",
    image: "/placeholder.svg?height=120&width=120",
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
    avatar: "/placeholder.svg?height=20&width=20",
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

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex items-center space-x-8 border-b border-gray-200 mb-8 ">
        <Button variant="ghost" size="sm" className="p-2">
          <Plus className="h-4 w-4" />
        </Button>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-8 ">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <div className="flex items-start space-x-2 mb-3">
              <Avatar className="h-5 w-5">
                <AvatarImage src={post.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span className="font-medium">{post.publication}</span>
                <span>by</span>
                <span className="font-medium">{post.author}</span>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-1 pr-6">
                <Link href={`/post/${post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-base mb-4 line-clamp-2">{post.subtitle}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{post.category}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.claps}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-28 h-28 object-cover rounded"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

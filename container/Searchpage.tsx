"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Mock search results
const mockResults = {
  stories: [
    {
      id: 1,
      title: "Apple's New Vision Pro: A Game Changer",
      author: "Tech Reviewer",
      excerpt: "An in-depth look at Apple's latest innovation...",
      readTime: "5 min read",
      claps: 234,
    },
    {
      id: 2,
      title: "The Apple Ecosystem: Why It Works",
      author: "Digital Nomad",
      excerpt: "Understanding the seamless integration...",
      readTime: "8 min read",
      claps: 156,
    },
  ],
  people: [
    {
      id: 1,
      name: "Apple Cider",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Voted worst videogame feminist. Writer, artist, professional bitch.",
      followers: "1.2k",
    },
    {
      id: 2,
      name: "apple pie",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "this world made me in a surviving mode, so I'm here! in a space where I just want peace",
      followers: "856",
    },
    {
      id: 3,
      name: "Apple Estrada",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Freelance SEO Copywriter for SAAS companies. Mom of 3. Introvert who loves coffee, gummy...",
      followers: "2.1k",
    },
  ],
  publications: [
    {
      id: 1,
      name: "Apple Insider",
      avatar: "/placeholder.svg?height=48&width=48",
      description: "Latest news and insights about Apple products",
      followers: "45k",
    },
    {
      id: 2,
      name: "Tech Apple",
      avatar: "/placeholder.svg?height=48&width=48",
      description: "Deep dives into Apple's technology and innovation",
      followers: "23k",
    },
  ],
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams?.get("q") || ""
  const [activeTab, setActiveTab] = useState("People")

  const tabs = ["Stories", "People", "Publications"]

  const renderContent = () => {
    switch (activeTab) {
      case "Stories":
        return (
          <div className="space-y-6">
            {mockResults.stories.map((story) => (
              <div key={story.id} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-2">{story.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {story.author}</span>
                  <span>·</span>
                  <span>{story.readTime}</span>
                  <span>·</span>
                  <span>{story.claps} claps</span>
                </div>
              </div>
            ))}
          </div>
        )
      case "People":
        return (
          <div className="space-y-6">
            {mockResults.people.map((person) => (
              <div key={person.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{person.name}</h3>
                    <p className="text-gray-600 mb-2">{person.bio}</p>
                    <p className="text-sm text-gray-500">{person.followers} followers</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full bg-transparent">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        )
      case "Publications":
        return (
          <div className="space-y-6">
            {mockResults.publications.map((pub) => (
              <div key={pub.id} className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={pub.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{pub.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{pub.name}</h3>
                    <p className="text-gray-600 mb-2">{pub.description}</p>
                    <p className="text-sm text-gray-500">{pub.followers} followers</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full bg-transparent">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            readOnly
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full bg-gray-50"
          />
        </div>

        {/* Results Header */}
        <h1 className="text-2xl font-bold mb-8 text-gray-600">
          Results for <span className="text-black">{query}</span>
        </h1>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
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

        {/* Results Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}

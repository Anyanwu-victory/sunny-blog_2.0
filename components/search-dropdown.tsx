"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock search data
const searchData = {
  people: [
    {
      id: 1,
      name: "Apple Cider",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Tech enthusiast and apple lover",
    },
    {
      id: 2,
      name: "apple pie",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Food blogger and recipe creator",
    },
    {
      id: 3,
      name: "Apple Estrada",
      avatar: "/placeholder.svg?height=32&width=32",
      bio: "Software engineer and writer",
    },
  ],
  publications: [
    {
      id: 1,
      name: "swiftist",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Swift programming publication",
    },
    {
      id: 2,
      name: "Blog 301",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Advanced blogging techniques",
    },
    {
      id: 3,
      name: "BrightDigit",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Digital marketing insights",
    },
  ],
  topics: [
    { id: 1, name: "Apple", icon: "📱" },
    { id: 2, name: "Apple Watch", icon: "⌚" },
    { id: 3, name: "Apple Music", icon: "🎵" },
  ],
}

interface SearchDropdownProps {
  isMobile?: boolean
}

export function SearchDropdown({ isMobile = false }: SearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredResults, setFilteredResults] = useState(searchData)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = {
        people: searchData.people.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase())),
        publications: searchData.publications.filter((pub) =>
          pub.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
        topics: searchData.topics.filter((topic) => topic.name.toLowerCase().includes(searchTerm.toLowerCase())),
      }
      setFilteredResults(filtered)
    } else {
      setFilteredResults(searchData)
    }
  }, [searchTerm])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setIsOpen(false)
    }
  }

  const handleMobileSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="flex items-center p-4 border-b">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <X className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSearch()}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {searchTerm && (
            <>
              {filteredResults.people.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PEOPLE</h3>
                  <div className="space-y-3">
                    {filteredResults.people.map((person) => (
                      <div key={person.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{person.name}</p>
                            <p className="text-sm text-gray-600">{person.bio}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.publications.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PUBLICATIONS</h3>
                  <div className="space-y-3">
                    {filteredResults.publications.map((pub) => (
                      <div key={pub.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={pub.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{pub.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{pub.name}</p>
                            <p className="text-sm text-gray-600">{pub.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          className="w-full max-w-sm pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchTerm ? (
            <div className="p-4">
              {filteredResults.people.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PEOPLE</h3>
                  <div className="space-y-2">
                    {filteredResults.people.map((person) => (
                      <Link
                        key={person.id}
                        href={`/profile/${person.id}`}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{person.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.publications.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PUBLICATIONS</h3>
                  <div className="space-y-2">
                    {filteredResults.publications.map((pub) => (
                      <Link
                        key={pub.id}
                        href={`/publication/${pub.id}`}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={pub.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{pub.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{pub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.topics.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">TOPICS</h3>
                  <div className="space-y-2">
                    {filteredResults.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/topic/${topic.name.toLowerCase()}`}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-sm">{topic.icon}</span>
                        </div>
                        <span className="font-medium text-gray-900">{topic.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Start typing to search for people, publications, and topics
            </div>
          )}
        </div>
      )}
    </div>
  )
}

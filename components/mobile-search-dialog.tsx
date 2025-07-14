"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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

interface SearchDialogProps {
  isMobile?: boolean
  trigger?: React.ReactNode
}
  
export function MobileSearchDialog({ isMobile = false }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredResults, setFilteredResults] = useState(searchData)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  useEffect(() => {
    if (isOpen && dialogInputRef.current) {
      // Focus the dialog input when dialog opens
      setTimeout(() => {
        dialogInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  

  const handleMobileSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setSearchTerm("")
  }


    return (
      <>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="p-0"
        >
          <Search className="w-6 h-6" />
        </Button>
  
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full h-full max-w-full p-0 m-0 rounded-none">
            <div className="flex items-center p-4 border-b">
               <DialogHeader>
                <DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="mr-2">
                <X className="h-5 w-5" />
              </Button>
                </DialogTitle>
               </DialogHeader>
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={dialogInputRef}
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
  
            <div className="overflow-y-auto flex-1 p-4">
              {/* Result rendering here (reuse your JSX) */}
              {searchTerm ? (
              <div className="space-y-6">
                {filteredResults.people.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PEOPLE</h3>
                    <div className="space-y-2">
                      {filteredResults.people.map((person) => (
                        <Link
                          key={person.id}
                          href={`/profile/${person.id}`}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={handleResultClick}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{person.name}</p>
                            <p className="text-sm text-gray-600">{person.bio}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredResults.publications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">PUBLICATIONS</h3>
                    <div className="space-y-2">
                      {filteredResults.publications.map((pub) => (
                        <Link
                          key={pub.id}
                          href={`/publication/${pub.id}`}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={handleResultClick}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={pub.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{pub.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{pub.name}</p>
                            <p className="text-sm text-gray-600">{pub.description}</p>
                          </div>
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
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={handleResultClick}
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">{topic.icon}</span>
                          </div>
                          <p className="font-medium text-gray-900">{topic.name}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredResults.people.length === 0 &&
                  filteredResults.publications.length === 0 &&
                  filteredResults.topics.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{searchTerm}"</p>
                      <p className="text-sm text-gray-400 mt-2">Try searching for something else</p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Start typing to search</p>
                <p className="text-sm text-gray-400">Search for people, publications, and topics</p>
              </div>
            )}

            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }


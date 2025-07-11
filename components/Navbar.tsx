"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, BookOpen, User, LibraryBig, Search } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchDropdown } from "@/components/search-dropdown"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const router = useRouter()

  const dropdownMenuItems = [
    { label: "Profile", icon: User, link: "/profile" },
    { label: "Reading List", icon: BookOpen, link: "/reading-list" },
    { label: "Write", icon: PenTool, link: "/create" },
    { label: "Stories", icon: LibraryBig, link: "/stories" },
    { label: "Signout", icon: null, link: "/signout" },
  ]

  const handleMobileSearchClick = () => {
    router.push("/search?q=")
  }

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              Sunny Blog
            </Link>

            {isSignedIn && (
              <>
              {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchDropdown />
            </div>  
              </>
            )}
            
          </div>

          <div className="flex items-center space-x-4">
         
            {isSignedIn ? (
              <>
               
            {/* Mobile Search Icon */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={handleMobileSearchClick}>
              <Search className="h-5 w-5" />
            </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <div className="h-8 w-8 rounded-full bg-gray-500 text-primary-foreground flex items-center justify-center font-bold">
                      A
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 p-4">
                  {dropdownMenuItems.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link
                        href={item.link!}
                        className="flex items-center space-x-2 text-gray-700 hover:text-orange-500"
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              </>
            ) : (
              <>
              <div className="flex items-center space-x-2">
                <Button variant="ghost">Sign In</Button>
                <Button>Sign Up</Button>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

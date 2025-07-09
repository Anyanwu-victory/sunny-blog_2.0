"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, Home, BookOpen, User, Book, LibraryBig} from "lucide-react"
import { useState } from "react"
import  { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true) // Replace with actual authentication logic
   const dropdownMenuItems = [
    { label: "Profile", icon: User, link: "/profile" },
    { label: "Reading List", icon: BookOpen, link: "/reading-list" },
    { label: "Write", icon: PenTool, link: "/create" },
    {label: "Stories", icon: LibraryBig, link: "/stories" }, // Add more items as needed
    { label: "Signout", icon: null, link: "/signout" } // Add more items as needed,  
    ];

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              Sunny Blog
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {isSignedIn && (
              <div className="hidden md:flex ml-[59rem]">
                <DropdownMenu >
                <DropdownMenuTrigger asChild >
                  <Button variant="ghost" size="sm" className="gap-1">
                    <div className="h-8 w-8 rounded-full bg-gray-500 text-primary-foreground flex items-center justify-center font-bold">
                      A {/* { String((user?.firstName as string)?.charAt(0))} */}
                    </div>
                 </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 p-[1rem]">
                    {dropdownMenuItems
                      .filter((item) => item.link) // Filter out items with undefined links
                      .map((item) => ( 
                        <DropdownMenuItem key={item.label} asChild>
                            <Link href={item.link!} className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                                {item.icon && <item.icon className="h-10 w-10" />}
                                <span>{item.label}</span>
                            </Link>
                        </DropdownMenuItem>
                     ))}
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isSignedIn && (
              <>
                <Button variant="ghost">Sign In</Button>
                <Button>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
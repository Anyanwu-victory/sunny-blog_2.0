"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  PenTool,
  BookOpen,
  User,
  LibraryBig,
} from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true) // Replace with actual auth logic

  const dropdownMenuItems = [
    { label: "Profile", icon: User, link: "/profile" },
    { label: "Reading List", icon: BookOpen, link: "/reading-list" },
    { label: "Write", icon: PenTool, link: "/create" },
    { label: "Stories", icon: LibraryBig, link: "/stories" },
    { label: "Signout", icon: null, link: "/signout" },
  ]

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-2">
          {/* Top Row: Logo and Dropdown */}
          <div className="w-full flex justify-between md:justify-start items-center space-x-4 md:space-x-8">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              Sunny Blog
            </Link>

             {/* Middle Row: Search Bar */}
          <div className="w-ful mt-2 md:mt-0 flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-sm border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

            {isSignedIn && (
              <div className="md:ml-auto">
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
              </div>
            )}
          </div>

         
          {/* Bottom Row (Right): Sign In/Up (Only if not signed in) */}
          {!isSignedIn && (
            <div className="w-full mt-2 md:mt-0 md:w-auto flex justify-end space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

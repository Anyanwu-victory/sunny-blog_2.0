import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, X } from "lucide-react"
import Link from "next/link"

const staffPicks = [
  {
    id: 1,
    author: "Aster Lately",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "The Introvert's Guide to Creating a Social Life",
    publication: "Zenite",
    date: "Mar 26",
    verified: true,
  },
  {
    id: 2,
    author: "Dan Piraro",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "Confessions of a Poorly Drawn Cartoonist",
    publication: "MuddyUm",
    date: "Apr 24",
  },
  {
    id: 3,
    author: "Nir Eyal",
    avatar: "/placeholder.svg?height=20&width=20",
    title: "Let's Not Decide Who Kids Are Before They Do",
    publication: "Psychology of Stuff",
    date: "Jun 27",
    verified: true,
  },
]

export function Sidebar() {
  return (
    <div className="space-y-8 border-l border-gray-200 px-[2rem] py-12 h-full">
      {/* Staff Picks */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Staff Picks</h3>
        <div className="space-y-6">
          {staffPicks.map((pick) => (
            <div key={pick.id} className="group">
              <div className="flex items-start space-x-2 mb-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={pick.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{pick.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <span className="font-medium">{pick.author}</span>
                  {pick.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  <span>in</span>
                  <span className="font-medium">{pick.publication}</span>
                </div>
              </div>

              <Link href={`/post/${pick.id}`}>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {pick.title}
                </h4>
              </Link>

              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{pick.date}</span>
              </div>
            </div>
          ))}
        </div>

        <Link href="/staff-picks">
          <Button variant="link" className="text-green-600 hover:text-green-700 p-0 mt-4">
            See the full list
          </Button>
        </Link>
      </div>

      {/* Writing on Medium Card */}
      <Card className="bg-blue-50 border-blue-200 mx-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-900">Writing on Sunny</h3>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <Link href="/help/new-writer" className="block text-gray-700 hover:text-gray-900">
              New writer FAQ
            </Link>
            <Link href="/help/expert-writing" className="block text-gray-700 hover:text-gray-900">
              Expert writing advice
            </Link>
            <Link href="/help/grow-readership" className="block text-gray-700 hover:text-gray-900">
              Grow your readership
            </Link>
          </div>

          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full">Start writing</Button>
        </CardContent>
      </Card>
    </div>
  )
}

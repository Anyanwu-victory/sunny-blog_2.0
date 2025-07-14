import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark, MessageCircle, Clock, User } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 4,
    title: "Getting Started with React Server Components",
    excerpt: "Learn how to leverage the power of React Server Components in your next project.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Alex Rodriguez",
    readTime: "7 min read",
    category: "Technology",
    likes: 42,
    comments: 8,
    publishedAt: "2 days ago",
  },
  {
    id: 5,
    title: "The Psychology of Color in Web Design",
    excerpt: "Understanding how colors affect user behavior and conversion rates.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Lisa Wang",
    readTime: "4 min read",
    category: "Design",
    likes: 38,
    comments: 12,
    publishedAt: "3 days ago",
  },
  {
    id: 6,
    title: "Sustainable Living: Small Changes, Big Impact",
    excerpt: "Simple lifestyle changes that can make a significant environmental difference.",
    image: "/placeholder.svg?height=200&width=300",
    author: "David Green",
    readTime: "6 min read",
    category: "Environment",
    likes: 56,
    comments: 15,
    publishedAt: "1 week ago",
  },
]

export function LatestPosts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest & Hottest</h2>
        <Button variant="outline">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">{post.category}</span>
              </div>
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Link href={`/post/${post.id}`}>
                <h3 className="text-xl font-semibold hover:text-orange-500 transition-colors">{post.title}</h3>
              </Link>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Edit, Heart, MessageCircle } from "lucide-react"
import { useState } from "react"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=96&width=96",
}

const userPosts = [
  {
    id: 1,
    title: "My Journey into Web Development",
    excerpt: "How I transitioned from marketing to becoming a full-stack developer.",
    likes: 24,
    comments: 6,
    publishedAt: "1 week ago",
  },
  {
    id: 2,
    title: "Building My First React App",
    excerpt: "Lessons learned while creating my first React application from scratch.",
    likes: 18,
    comments: 4,
    publishedAt: "2 weeks ago",
  },
]

const readingList = [
  {
    id: 3,
    title: "Advanced TypeScript Patterns",
    author: "John Doe",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "The Future of CSS",
    author: "Jane Smith",
    readTime: "5 min read",
  },
]

const followedAuthors = [
  { id: 1, name: "Sarah Johnson", followers: "2.3k", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Mike Chen", followers: "1.8k", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Emma Davis", followers: "3.1k", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    about: "Passionate developer and tech enthusiast. Love sharing knowledge and learning from the community.",
  })

  return (
    <div className="container mx-auto  px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                    <p className="text-gray-600">{mockUser.email}</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={profileData.about}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <Button onClick={() => setIsEditing(false)} className="bg-orange-500 hover:bg-orange-600">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-700">{profileData.about}</p>
                )}

                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{userPosts.length} Posts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{followedAuthors.length} Following</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="reading-list">Reading List</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {userPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.publishedAt}</span>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reading-list" className="space-y-4">
            {readingList.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>By {post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="following" className="space-y-4">
            {followedAuthors.map((author) => (
              <Card key={author.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{author.name}</h3>
                        <p className="text-sm text-gray-600">{author.followers} followers</p>
                      </div>
                    </div>
                    <Button variant="outline">Unfollow</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

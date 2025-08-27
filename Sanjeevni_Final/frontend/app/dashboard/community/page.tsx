"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Search,
  Filter,
  Send,
  ImageIcon,
  Smile,
  MoreHorizontal,
  UserPlus,
  Award,
  Target,
  Calendar,
  Clock,
  MessageSquare,
  BookOpen,
  HelpCircle,
} from "lucide-react"
import { HealthDashboardNav } from "@/components/health-dashboard-nav"

const communityPosts = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "/generic-user-avatar.png",
    timeAgo: "2 hours ago",
    content:
      "Just completed my 30-day meditation challenge! The mental health benefits have been incredible. My anxiety levels have decreased significantly, and I'm sleeping much better. Highly recommend starting with just 5 minutes a day.",
    likes: 24,
    comments: 8,
    category: "Mental Health",
    tags: ["meditation", "anxiety", "sleep"],
    isLiked: false,
  },
  {
    id: 2,
    author: "Dr. Rajesh K.",
    avatar: "/generic-user-avatar.png",
    timeAgo: "4 hours ago",
    content:
      "Quick tip for diabetes management: Always pair your carbohydrates with protein or healthy fats. This helps slow down glucose absorption and prevents blood sugar spikes. Great combinations include apple with almond butter or whole grain toast with avocado.",
    likes: 45,
    comments: 12,
    category: "Diabetes",
    tags: ["diabetes", "nutrition", "blood-sugar"],
    isLiked: true,
    isExpert: true,
  },
  {
    id: 3,
    author: "Priya S.",
    avatar: "/generic-user-avatar.png",
    timeAgo: "6 hours ago",
    content:
      "Sharing my weight loss journey progress! Down 15kg in 6 months through consistent meal prep and daily walks. The key was making small, sustainable changes rather than drastic diets. Happy to share my meal prep ideas if anyone's interested!",
    likes: 67,
    comments: 23,
    category: "Weight Management",
    tags: ["weight-loss", "meal-prep", "exercise"],
    isLiked: false,
    hasImage: true,
  },
]

const supportGroups = [
  {
    id: 1,
    name: "Diabetes Support Circle",
    members: 1247,
    description: "A supportive community for people managing diabetes and their families",
    category: "Chronic Conditions",
    isJoined: true,
    lastActivity: "2 minutes ago",
  },
  {
    id: 2,
    name: "Mental Wellness Warriors",
    members: 892,
    description: "Supporting each other through mental health challenges and celebrating victories",
    category: "Mental Health",
    isJoined: false,
    lastActivity: "15 minutes ago",
  },
  {
    id: 3,
    name: "Heart Health Heroes",
    members: 634,
    description: "Sharing tips, recipes, and encouragement for cardiovascular health",
    category: "Heart Health",
    isJoined: true,
    lastActivity: "1 hour ago",
  },
  {
    id: 4,
    name: "New Parent Support",
    members: 456,
    description: "Navigating parenthood together with health and wellness focus",
    category: "Family Health",
    isJoined: false,
    lastActivity: "3 hours ago",
  },
]

const challenges = [
  {
    id: 1,
    title: "30-Day Hydration Challenge",
    description: "Drink 8 glasses of water daily for 30 days",
    participants: 234,
    daysLeft: 12,
    progress: 60,
    isJoined: true,
  },
  {
    id: 2,
    title: "10,000 Steps Daily",
    description: "Walk 10,000 steps every day this month",
    participants: 567,
    daysLeft: 8,
    progress: 0,
    isJoined: false,
  },
  {
    id: 3,
    title: "Mindful Eating Week",
    description: "Practice mindful eating techniques for one week",
    participants: 189,
    daysLeft: 3,
    progress: 85,
    isJoined: true,
  },
]

const chatMessages = [
  {
    id: 1,
    sender: "Dr. Sarah P.",
    message: "Remember, consistency is key when managing blood pressure. Small daily actions make a big difference!",
    time: "10:30 AM",
    isExpert: true,
  },
  {
    id: 2,
    sender: "Mike R.",
    message: "Thanks for the reminder! I've been tracking my BP daily and it's really helping me stay motivated.",
    time: "10:32 AM",
    isExpert: false,
  },
  {
    id: 3,
    sender: "Lisa K.",
    message: "What's everyone's favorite healthy breakfast? Looking for new ideas to start my day right!",
    time: "10:35 AM",
    isExpert: false,
  },
]

export default function CommunityPage() {
  const [newPostContent, setNewPostContent] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory] = useState("all")

  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <HealthDashboardNav />

      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-sans">Community</h1>
              <p className="text-muted-foreground font-serif">
                Connect, share, and support each other on your health journey
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-sans">Share with Community</DialogTitle>
                  <DialogDescription className="font-serif">
                    Share your health journey, tips, or ask for support
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-content">What's on your mind?</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts, experiences, or questions..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="w-4 h-4 mr-2" />
                        Add Emoji
                      </Button>
                    </div>
                    <Button>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              {/* Search and Filter */}
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts, topics, or people..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium font-sans">{post.author}</p>
                              {post.isExpert && (
                                <Badge variant="secondary" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Expert
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground font-serif">{post.timeAgo}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground font-serif mb-4">{post.content}</p>
                      {post.hasImage && (
                        <div className="mb-4">
                          <img
                            src="/healthy-meal-prep.png"
                            alt="Post image"
                            className="rounded-lg w-full max-w-md"
                          />
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{post.category}</Badge>
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className={post.isLiked ? "text-red-500" : ""}>
                            <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {supportGroups.map((group) => (
                  <Card key={group.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-sans">{group.name}</CardTitle>
                          <CardDescription className="font-serif">{group.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">
                              {group.members.toLocaleString()} members
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">{group.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {group.isJoined ? (
                          <>
                            <Button className="flex-1">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              View Group
                            </Button>
                            <Button variant="outline">
                              <Users className="w-4 h-4 mr-2" />
                              Joined
                            </Button>
                          </>
                        ) : (
                          <Button className="flex-1">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Join Group
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-sans">{challenge.title}</CardTitle>
                          <CardDescription className="font-serif">{challenge.description}</CardDescription>
                        </div>
                        <Badge variant={challenge.isJoined ? "default" : "outline"}>
                          {challenge.daysLeft} days left
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">
                              {challenge.participants} participants
                            </span>
                          </div>
                          {challenge.isJoined && (
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium font-sans">{challenge.progress}% complete</span>
                            </div>
                          )}
                        </div>
                        {challenge.isJoined && (
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${challenge.progress}%` }}
                            />
                          </div>
                        )}
                        <div className="flex gap-2">
                          {challenge.isJoined ? (
                            <>
                              <Button className="flex-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                View Progress
                              </Button>
                              <Button variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </>
                          ) : (
                            <Button className="flex-1">
                              <Plus className="w-4 h-4 mr-2" />
                              Join Challenge
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="shadow-lg h-96">
                    <CardHeader>
                      <CardTitle className="font-sans">Community Live Chat</CardTitle>
                      <CardDescription className="font-serif">
                        Real-time support and discussions with community members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <ScrollArea className="flex-1 mb-4">
                        <div className="space-y-4">
                          {chatMessages.map((message) => (
                            <div key={message.id} className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {message.sender
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium font-sans">{message.sender}</p>
                                  {message.isExpert && (
                                    <Badge variant="secondary" className="text-xs">
                                      Expert
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground font-serif">{message.time}</span>
                                </div>
                                <p className="text-sm text-foreground font-serif">{message.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-sans">Active Now</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {["Dr. Sarah P.", "Mike R.", "Lisa K.", "John D.", "Emma S."].map((user) => (
                          <div key={user} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-serif">{user}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-sans">Quick Help</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          Ask Expert
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Health Tips
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Users className="w-4 h-4 mr-2" />
                          Find Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  Calendar,
  Activity,
  Brain,
  Pill,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Camera,
  Bell,
  Settings,
  Download,
  Trash2,
  LogOut,
  Bot,
  Stethoscope,
  Users,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function HealthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    email: string
    profilePhoto: string | null
  } | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.user_metadata?.name || user.email || "User",
        email: user.email,
        profilePhoto: user.user_metadata?.avatar_url || null,
      })
    } else {
      const storedUserData = localStorage.getItem("userData")
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
  }, [user])

  const handleDownloadData = () => {
    const data = {
      user: userData?.name || "User",
      email: userData?.email || "user@example.com",
      healthData: "Sample health data...",
      medications: "Sample medication data...",
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sanjeevni-health-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDeleteData = () => {
    if (confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
      localStorage.removeItem("userData")
      localStorage.removeItem("intendedFeature")
      alert("Data deletion completed. You will be redirected to the home page.")
      router.push("/")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("intendedFeature")
    router.push("/")
  }

  const navigateToFeature = (feature: string) => {
    router.push(`/dashboard/${feature}`)
  }

  const getFirstName = () => {
    if (!userData?.name) return "User"
    return userData.name.split(" ")[0]
  }

  const getUserInitials = () => {
    if (!userData?.name) return "U"
    const names = userData.name.split(" ")
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground font-sans">Sanjeevni</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={userData?.profilePhoto || "/generic-user-avatar.png"} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userData?.email || "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDownloadData}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download Data</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteData} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Data</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFeature("pills")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Pill className="w-4 h-4" />
              Pills
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFeature("analysis")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Activity className="w-4 h-4" />
              AI Analysis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFeature("mental-health")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Brain className="w-4 h-4" />
              Mental Health
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFeature("doctors")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4" />
              Doctors
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFeature("community")}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4" />
              Community
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 font-sans">Welcome back, {getFirstName()}!</h2>
          <p className="text-muted-foreground font-serif">Here's your health overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">Pill Adherence</CardTitle>
              <Pill className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">94%</div>
              <p className="text-xs text-muted-foreground font-serif">+2% from last week</p>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">Health Score</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8.2</div>
              <p className="text-xs text-muted-foreground font-serif">Excellent condition</p>
              <Progress value={82} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">Mental Wellness</CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Good</div>
              <p className="text-xs text-muted-foreground font-serif">Stable mood trend</p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-muted-foreground font-serif">days remaining</p>
              <Badge variant="secondary" className="mt-2">
                Dr. Sharma
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-sans">Today's Schedule</CardTitle>
                <CardDescription className="font-serif">Your medications and appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Pill className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium font-sans">Metformin 500mg</p>
                    <p className="text-sm text-muted-foreground font-serif">Take with breakfast</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">8:00 AM</Badge>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Pill className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium font-sans">Lisinopril 10mg</p>
                    <p className="text-sm text-muted-foreground font-serif">Blood pressure medication</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">2:00 PM</Badge>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium font-sans">Teleconsultation</p>
                    <p className="text-sm text-muted-foreground font-serif">Follow-up with Dr. Patel</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">4:30 PM</Badge>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Trends */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-sans">Health Trends</CardTitle>
                    <CardDescription className="font-serif">Your health metrics over time</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedPeriod === "week" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("week")}
                    >
                      Week
                    </Button>
                    <Button
                      variant={selectedPeriod === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("month")}
                    >
                      Month
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-sans">Blood Pressure</span>
                    <span className="text-sm text-muted-foreground font-serif">120/80 mmHg</span>
                  </div>
                  <Progress value={75} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-sans">Blood Sugar</span>
                    <span className="text-sm text-muted-foreground font-serif">95 mg/dL</span>
                  </div>
                  <Progress value={85} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium font-sans">Weight</span>
                    <span className="text-sm text-muted-foreground font-serif">72 kg</span>
                  </div>
                  <Progress value={70} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-sans">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => navigateToFeature("analysis")}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  AI Health Scan
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => navigateToFeature("mental-health")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Mood Check-in
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => navigateToFeature("doctors")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => navigateToFeature("community")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Community Chat
                </Button>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-sans">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium font-sans">Medication Taken</p>
                    <p className="text-xs text-muted-foreground font-serif">Metformin taken on time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
                  <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium font-sans">Health Improvement</p>
                    <p className="text-xs text-muted-foreground font-serif">Blood pressure trending down</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium font-sans">Appointment Reminder</p>
                    <p className="text-xs text-muted-foreground font-serif">Dr. Sharma in 2 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-sans">AI Insights</CardTitle>
                <CardDescription className="font-serif">Personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium font-sans mb-1">Medication Adherence</p>
                  <p className="text-xs text-muted-foreground font-serif">
                    Great job! You've maintained 94% adherence this week.
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium font-sans mb-1">Exercise Recommendation</p>
                  <p className="text-xs text-muted-foreground font-serif">
                    Consider 20 minutes of walking after dinner to improve blood sugar control.
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium font-sans mb-1">Mental Wellness</p>
                  <p className="text-xs text-muted-foreground font-serif">
                    Your mood has been stable. Keep up the meditation routine!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        onClick={() => setShowAIAssistant(true)}
      >
        <Bot className="w-6 h-6" />
      </Button>

      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-sans flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  AI Mental Health Assistant
                </CardTitle>
                <CardDescription className="font-serif">
                  Get personalized mental health support and guidance
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAIAssistant(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={() => {
                    setShowAIAssistant(false)
                    navigateToFeature("mental-health")
                  }}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Start Mood Assessment
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI Therapist
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  Breathing Exercises
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Mindfulness Session
                </Button>
              </div>
              <div className="text-xs text-muted-foreground text-center font-serif">
                This AI assistant provides support but is not a replacement for professional mental health care.
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
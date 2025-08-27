"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Shield,
  Brain,
  Calendar,
  Activity,
  Stethoscope,
  MessageCircle,
  Star,
  Quote,
  Play,
  Upload,
  AlertTriangle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const { login, signup } = useAuth()

  const _handleAuth = async (e: React.FormEvent<HTMLFormElement>, type: "login" | "signup") => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      if (type === "login") {
        await login(email, password)
      } else {
        await signup(email, password)
      }
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Authentication error:", error)
      setAuthError(error.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWatchDemo = () => {
    setShowDemo(true)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFeatureClick = (feature: string) => {
    localStorage.setItem("intendedFeature", feature)
    setShowAuth(true)
  }

  const handleAuthWithRedirect = async (e: React.FormEvent<HTMLFormElement>, type: "login" | "signup") => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string



    // Validate required fields
    if (!email || !email.trim()) {
      setAuthError("Email is required")
      setIsLoading(false)
      return
    }

    if (!password || !password.trim()) {
      setAuthError("Password is required")
      setIsLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setAuthError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      if (type === "login") {
        await login(email, password)
      } else {
        await signup(email, password)
      }

      const intendedFeature = localStorage.getItem("intendedFeature")
      if (intendedFeature) {
        localStorage.removeItem("intendedFeature")
        switch (intendedFeature) {
          case "AI Health Predictions":
            router.push("/dashboard/analysis")
            break
          case "Pill Reminders":
            router.push("/dashboard/pills")
            break
          case "Mental Health":
            router.push("/dashboard/mental-health")
            break
          case "Doctor Consultations":
            router.push("/dashboard/doctors")
            break
          case "Community Support":
            router.push("/dashboard/community")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      setAuthError(error.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <div className="container mx-auto flex items-center justify-center gap-2 text-amber-800">
          <AlertTriangle className="w-4 h-4" />
          <p className="text-sm font-medium">
            <strong>Medical Disclaimer:</strong> This is a prototype platform for demonstration purposes only. Always
            consult qualified healthcare professionals for medical advice and treatment.
          </p>
        </div>
      </div>

      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-sans">Sanjeevni</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setShowAuth(true)}>
              Login
            </Button>
            <Button onClick={() => setShowAuth(true)}>Sign Up</Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Healthcare Platform
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-sans">
            Your Complete Health Companion
          </h2>
          <p className="text-xl text-muted-foreground mb-8 font-serif leading-relaxed">
            Sanjeevni combines AI-powered health predictions, smart pill reminders, mental health tracking, and
            teleconsultation in one comprehensive platform designed for the Indian healthcare ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => setShowAuth(true)}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" onClick={handleWatchDemo}>
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
              Comprehensive Health Solutions
            </h3>
            <p className="text-lg text-muted-foreground font-serif">
              Everything you need to manage your health in one intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("pills")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Smart Pill Reminders</CardTitle>
                <CardDescription className="font-serif">
                  Never miss a dose with AI-powered notifications, voice alerts, and caregiver notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("analysis")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">AI Health Predictions</CardTitle>
                <CardDescription className="font-serif">
                  Upload medical images for AI analysis of skin conditions, chest X-rays, and eye scans
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("mental-health")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Mental Health Tracker</CardTitle>
                <CardDescription className="font-serif">
                  AI-powered mood analysis with CBT-based exercises and daily wellness tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("doctors")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Doctor Integration</CardTitle>
                <CardDescription className="font-serif">
                  Seamless teleconsultation with secure health record sharing and appointment booking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setShowAuth(true)}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Health Dashboard</CardTitle>
                <CardDescription className="font-serif">
                  Comprehensive view of your health metrics, trends, and personalized insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("community")}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-sans">Community Support</CardTitle>
                <CardDescription className="font-serif">
                  Connect with peers, join support groups, and access verified health information
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">Trusted by Thousands</h3>
            <p className="text-lg text-muted-foreground font-serif">
              See how Sanjeevni is transforming healthcare experiences across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground font-serif mb-6">
                  "Sanjeevni's pill reminders have been a game-changer for my elderly mother. The AI predictions caught
                  a skin condition early that we might have missed."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/indian-woman-smiling.png" />
                    <AvatarFallback>PR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-sans">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground font-serif">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground font-serif mb-6">
                  "The mental health tracking feature helped me understand my stress patterns. The teleconsultation with
                  doctors is seamless and convenient."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/indian-professional-man.png" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-sans">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground font-serif">Bangalore, Karnataka</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground font-serif mb-6">
                  "As a doctor, I appreciate how Sanjeevni helps my patients stay compliant with medications and
                  provides valuable health insights between visits."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/indian-female-doctor.png" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold font-sans">Dr. Sneha Patel</p>
                    <p className="text-sm text-muted-foreground font-serif">Delhi, NCR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-sans flex items-center gap-2">
                <Play className="w-6 h-6 text-primary" />
                Sanjeevni Platform Demo
              </CardTitle>
              <CardDescription className="font-serif">See how our AI-powered healthcare platform works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium font-sans">Interactive Demo</p>
                  <p className="text-muted-foreground font-serif">Experience all features in action</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    setShowDemo(false)
                    setShowAuth(true)
                  }}
                >
                  Try It Now
                </Button>
                <Button variant="outline" onClick={() => setShowDemo(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-sans">Join Sanjeevni Today</CardTitle>
              <CardDescription className="font-serif">
                Start your journey to better health with AI-powered insights
              </CardDescription>
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  This is a prototype platform. Always consult healthcare professionals for medical advice.
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {authError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={(e) => handleAuthWithRedirect(e, "signup")} className="space-y-4">
                    <div className="space-y-2 text-center">
                      <Label>Profile Photo (Optional)</Label>
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profilePhoto || undefined} />
                          <AvatarFallback>
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="photo-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" placeholder="Create a password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center font-serif">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </TabsContent>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={(e) => handleAuthWithRedirect(e, "login")} className="space-y-4">
                    <div className="space-y-2 text-center">
                      <Label>Update Profile Photo (Optional)</Label>
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profilePhoto || undefined} />
                          <AvatarFallback>
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="login-photo-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="login-photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center font-serif">
                    <button className="text-primary hover:underline">Forgot your password?</button>
                  </p>
                </TabsContent>
              </Tabs>
              <Button variant="ghost" className="w-full mt-4" onClick={() => setShowAuth(false)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}



      <section id="about-section" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">About Sanjeevni</h3>
          <p className="text-lg text-muted-foreground font-serif mb-6">
            Sanjeevni is an AI-powered healthcare platform designed to empower individuals and families across India with smart health management tools. Our mission is to make advanced healthcare accessible, personalized, and proactive for everyone. We combine cutting-edge technology with a deep understanding of the Indian healthcare ecosystem to deliver features like health predictions, pill reminders, mental health tracking, teleconsultation, and community support—all in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
            <div className="flex-1 bg-muted rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2 font-sans">Our Vision</h4>
              <p className="text-muted-foreground font-serif">To revolutionize healthcare delivery and empower users to take charge of their health journey.</p>
            </div>
            <div className="flex-1 bg-muted rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2 font-sans">Our Values</h4>
              <p className="text-muted-foreground font-serif">Innovation, accessibility, privacy, and compassion guide everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-sans flex items-center gap-2">
                <Play className="w-6 h-6 text-primary" />
                Sanjeevni Platform Demo
              </CardTitle>
              <CardDescription className="font-serif">See how our AI-powered healthcare platform works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium font-sans">Interactive Demo</p>
                  <p className="text-muted-foreground font-serif">Experience all features in action</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    setShowDemo(false)
                    setShowAuth(true)
                  }}
                >
                  Try It Now
                </Button>
                <Button variant="outline" onClick={() => setShowDemo(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-sans">Join Sanjeevni Today</CardTitle>
              <CardDescription className="font-serif">
                Start your journey to better health with AI-powered insights
              </CardDescription>
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  This is a prototype platform. Always consult healthcare professionals for medical advice.
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                {authError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={(e) => handleAuthWithRedirect(e, "signup")} className="space-y-4">
                    <div className="space-y-2 text-center">
                      <Label>Profile Photo (Optional)</Label>
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profilePhoto || undefined} />
                          <AvatarFallback>
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="photo-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" placeholder="Create a password" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center font-serif">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </TabsContent>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={(e) => handleAuthWithRedirect(e, "login")} className="space-y-4">
                    <div className="space-y-2 text-center">
                      <Label>Update Profile Photo (Optional)</Label>
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={profilePhoto || undefined} />
                          <AvatarFallback>
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <Label htmlFor="login-photo-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id="login-photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center font-serif">
                    <button className="text-primary hover:underline">Forgot your password?</button>
                  </p>
                </TabsContent>
              </Tabs>
              <Button variant="ghost" className="w-full mt-4" onClick={() => setShowAuth(false)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}



      <footer id="about" className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-bold font-sans">Sanjeevni</h4>
              </div>
              <p className="text-muted-foreground font-serif">
                AI-powered healthcare platform for comprehensive health management
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Features</h5>
              <ul className="space-y-2 text-muted-foreground font-serif">
                <li>
                  <button
                    onClick={() => handleFeatureClick("pills")}
                    className="hover:text-foreground transition-colors"
                  >
                    Pill Reminders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("analysis")}
                    className="hover:text-foreground transition-colors"
                  >
                    Health Predictions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("mental-health")}
                    className="hover:text-foreground transition-colors"
                  >
                    Mental Health
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("doctors")}
                    className="hover:text-foreground transition-colors"
                  >
                    Teleconsultation
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Support</h5>
              <ul className="space-y-2 text-muted-foreground font-serif">
                <li>
                  <button
                    onClick={() => alert("Help Center - Contact support@sanjeevni.com")}
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Contact Us - support@sanjeevni.com | +91-1234567890")}
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Privacy Policy - View our privacy policy")}
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Terms of Service - View our terms")}
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 font-sans">Company</h5>
              <ul className="space-y-2 text-muted-foreground font-serif">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-foreground transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Careers - Join our team! careers@sanjeevni.com")}
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Blog - Coming soon!")}
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Press - media@sanjeevni.com")}
                    className="hover:text-foreground transition-colors"
                  >
                    Press
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground font-serif">
            <p>&copy; 2025 Sanjeevni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
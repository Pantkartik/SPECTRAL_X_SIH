"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Brain,
  Heart,
  Smile,
  Frown,
  Meh,
  TrendingUp,
  BookOpen,
  Headphones,
  Target,
  Award,
  Phone,
  MessageCircle,
  Play,
  RotateCcw,
} from "lucide-react"
import { HealthDashboardNav } from "@/components/health-dashboard-nav"

export default function MentalHealthPage() {
  const [currentMood, setCurrentMood] = useState(4)
  const [stressLevel, setStressLevel] = useState(3)
  const [anxietyLevel, setAnxietyLevel] = useState(2)
  const [isJournaling, setIsJournaling] = useState(false)
  const [journalEntry, setJournalEntry] = useState("")
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState("inhale")
  interface MoodDay {
    date: string;
    mood: number;
    stress: number;
    anxiety: number;
  }
  const [moodData, setMoodData] = useState<MoodDay[]>([])
  interface JournalEntry {
    id: string;
    title?: string;
    date?: string;
    sentiment?: string;
    content?: string;
  }
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  interface CbtExercise {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    duration: string;
  }
  const [cbtExercises, setCbtExercises] = useState<CbtExercise[]>([])
  const [activeExercise, setActiveExercise] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/mental-health/stats")
      setMoodData(res.data.moodData || [])
      setJournalEntries(res.data.journalEntries || [])
      setCbtExercises(res.data.cbtExercises || [])
      setCurrentMood(res.data.currentMood)
      setStressLevel(res.data.stressLevel)
      setAnxietyLevel(res.data.anxietyLevel)
    } catch (err) {
      // handle error
    }
  }

  const handleSaveEntry = async () => {
    try {
      await axios.post("/api/mental-health/journal", {
        mood: currentMood,
        content: journalEntry,
      })
      setJournalEntry("")
      setIsJournaling(false)
      fetchStats()
    } catch (err) {
      // handle error
    }
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="w-6 h-6 text-primary" />
    if (mood >= 3) return <Meh className="w-6 h-6 text-accent" />
    return <Frown className="w-6 h-6 text-destructive" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "text-primary"
    if (mood >= 3) return "text-accent"
    return "text-destructive"
  }

  const startBreathingExercise = () => {
    setIsBreathingActive(true)
    const cycle = () => {
      setBreathingPhase("inhale")
      setTimeout(() => setBreathingPhase("hold"), 4000)
      setTimeout(() => setBreathingPhase("exhale"), 11000)
      setTimeout(() => setBreathingPhase("pause"), 19000)
    }
    cycle()
    const interval = setInterval(cycle, 20000)
    setTimeout(() => {
      clearInterval(interval)
      setIsBreathingActive(false)
      setBreathingPhase("inhale")
    }, 300000)
  }

  return (
    <div className="min-h-screen bg-background">
      <HealthDashboardNav />
      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-sans">Mental Health Tracker</h1>
              <p className="text-muted-foreground font-serif">Monitor your mental wellness and practice self-care</p>
            </div>
            <Dialog open={isJournaling} onOpenChange={setIsJournaling}>
              <DialogTrigger asChild>
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  New Journal Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-sans">Daily Journal</DialogTitle>
                  <DialogDescription className="font-serif">
                    Reflect on your day and track your mental wellness
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium font-sans">How are you feeling today?</Label>
                      <div className="flex items-center gap-4 mt-2">
                        {[1, 2, 3, 4, 5].map((mood) => (
                          <button
                            key={mood}
                            onClick={() => setCurrentMood(mood)}
                            className={`rounded-full p-2 border-2 ${currentMood === mood ? 'border-primary' : 'border-muted'} ${getMoodColor(mood)}`}
                          >
                            {getMoodIcon(mood)}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Label className="text-sm font-medium font-sans">Mood Slider</Label>
                        <Slider min={1} max={5} step={1} value={[currentMood]} onValueChange={([val]) => setCurrentMood(val)} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium font-sans">Stress Level</Label>
                      <div className="flex items-center gap-4 mt-2">
                        {[1, 2, 3, 4, 5].map((stress) => (
                          <button
                            key={stress}
                            onClick={() => setStressLevel(stress)}
                            className={`rounded-full p-2 border-2 ${stressLevel === stress ? 'border-primary' : 'border-muted'} text-accent`}
                          >
                            <Brain className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Label className="text-sm font-medium font-sans">Stress Slider</Label>
                        <Slider min={1} max={5} step={1} value={[stressLevel]} onValueChange={([val]) => setStressLevel(val)} />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium font-sans">Journal Entry</Label>
                      <Textarea
                        value={journalEntry}
                        onChange={e => setJournalEntry(e.target.value)}
                        placeholder="Write about your day..."
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveEntry} disabled={!journalEntry.trim()}>
                    Save Entry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* Mood, Stress, Anxiety Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mood</CardTitle>
                <CardDescription>Average mood this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {getMoodIcon(currentMood)}
                  <span className="text-2xl font-bold">{currentMood}</span>
                </div>
                <Progress value={currentMood * 20} className="mt-4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stress</CardTitle>
                <CardDescription>Average stress level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-accent" />
                  <span className="text-2xl font-bold">{stressLevel}</span>
                </div>
                <Progress value={stressLevel * 20} className="mt-4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Anxiety</CardTitle>
                <CardDescription>Average anxiety level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-destructive" />
                  <span className="text-2xl font-bold">{anxietyLevel}</span>
                </div>
                <Progress value={anxietyLevel * 20} className="mt-4" />
              </CardContent>
            </Card>
          </div>
          {/* CBT Exercises */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">CBT Exercises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(cbtExercises) && cbtExercises.length > 0 ? cbtExercises.map(ex => (
                <Card key={ex.id}>
                  <CardHeader>
                    <CardTitle>{ex.title}</CardTitle>
                    <CardDescription>{ex.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant={ex.completed ? "secondary" : "default"}>
                        {ex.completed ? "Completed" : "Pending"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{ex.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              )) : <p className="text-muted-foreground">No CBT exercises available.</p>}
            </div>
          </div>
          {/* Journal Entries */}
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Journal Entries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(journalEntries) && journalEntries.length > 0 ? journalEntries.map(entry => (
                <Card key={entry.id}>
                  <CardHeader>
                    <CardTitle>{entry.title || "Untitled"}</CardTitle>
                    <CardDescription>{entry.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{entry.content}</p>
                    <Badge variant={entry.sentiment === "positive" ? "secondary" : entry.sentiment === "neutral" ? "default" : "destructive"}>
                      {entry.sentiment}
                    </Badge>
                  </CardContent>
                </Card>
              )) : <p className="text-muted-foreground">No journal entries found.</p>}
            </div>
          </div>
          {/* Weekly Mental Health Tracker */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Weekly Mental Health Tracker</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-card rounded shadow">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Day</th>
                    <th className="px-4 py-2 text-left">Mood</th>
                    <th className="px-4 py-2 text-left">Stress</th>
                    <th className="px-4 py-2 text-left">Anxiety</th>
                  </tr>
                </thead>
                <tbody>
                  {moodData.map((day, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2 font-semibold">{day.date}</td>
                      <td className="px-4 py-2">
                        <span className={`font-bold ${getMoodColor(day.mood)}`}>{day.mood}</span>
                        {getMoodIcon(day.mood)}
                      </td>
                      <td className="px-4 py-2">{day.stress}</td>
                      <td className="px-4 py-2">{day.anxiety}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
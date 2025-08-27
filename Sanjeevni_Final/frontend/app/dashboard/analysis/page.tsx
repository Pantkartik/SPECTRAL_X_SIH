"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Camera,
  Upload,
  Eye,
  TreesIcon as Lungs,
  Scan,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileImage,
  Download,
  Share,
} from "lucide-react"
import { HealthDashboardNav } from "@/components/health-dashboard-nav"

const analysisHistory = [
  {
    id: 1,
    type: "Skin Analysis",
    date: "2024-01-15",
    result: "Low Risk",
    confidence: 92,
    findings: "No concerning lesions detected",
    recommendations: "Continue regular skin checks",
    status: "completed",
    image: "/skin-analysis-medical-scan.png",
  },
  {
    id: 2,
    type: "Chest X-Ray",
    date: "2024-01-10",
    result: "Normal",
    confidence: 88,
    findings: "Clear lung fields, normal heart size",
    recommendations: "Routine follow-up in 6 months",
    status: "completed",
    image: "/chest-xray-scan.png",
  },
  {
    id: 3,
    type: "Eye Scan",
    date: "2024-01-05",
    result: "Attention Needed",
    confidence: 85,
    findings: "Early signs of diabetic retinopathy",
    recommendations: "Consult ophthalmologist within 2 weeks",
    status: "completed",
    image: "/placeholder-xxb9m.png",
  },
]

const analysisTypes = [
  {
    id: "skin",
    name: "Skin Analysis",
    description: "Detect skin conditions, moles, and lesions",
    icon: Scan,
    color: "bg-primary",
    conditions: ["Melanoma", "Basal Cell Carcinoma", "Eczema", "Psoriasis"],
  },
  {
    id: "chest",
    name: "Chest X-Ray",
    description: "Analyze chest X-rays for lung conditions",
    icon: Lungs,
    color: "bg-secondary",
    conditions: ["Pneumonia", "Tuberculosis", "Lung Nodules", "Heart Enlargement"],
  },
  {
    id: "eye",
    name: "Eye Scan",
    description: "Detect eye diseases and retinal conditions",
    icon: Eye,
    color: "bg-accent",
    conditions: ["Diabetic Retinopathy", "Glaucoma", "Macular Degeneration", "Cataracts"],
  },
]

export default function AIAnalysisPage() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <HealthDashboardNav />

      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-sans">AI Health Analysis</h1>
              <p className="text-muted-foreground font-serif">
                Upload medical images for AI-powered health predictions
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Camera className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-sans">AI Health Analysis</DialogTitle>
                  <DialogDescription className="font-serif">
                    Upload a medical image for AI-powered analysis and recommendations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="analysis-type">Analysis Type</Label>
                    <Select value={selectedAnalysisType} onValueChange={setSelectedAnalysisType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select analysis type" />
                      </SelectTrigger>
                      <SelectContent>
                        {analysisTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedAnalysisType && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium font-sans mb-2">
                        {analysisTypes.find((t) => t.id === selectedAnalysisType)?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground font-serif mb-2">
                        {analysisTypes.find((t) => t.id === selectedAnalysisType)?.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {analysisTypes
                          .find((t) => t.id === selectedAnalysisType)
                          ?.conditions.map((condition) => (
                            <Badge key={condition} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded medical image"
                            className="max-w-full max-h-48 mx-auto rounded-lg"
                          />
                          <Button variant="outline" onClick={() => setUploadedImage(null)}>
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-sm font-medium font-sans">Upload medical image</p>
                            <p className="text-xs text-muted-foreground font-serif">
                              Supports JPG, PNG, DICOM files up to 10MB
                            </p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Additional Symptoms (Optional)</Label>
                    <Textarea id="symptoms" placeholder="Describe any symptoms or concerns..." className="min-h-20" />
                  </div>

                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium font-sans">Analyzing image...</span>
                      </div>
                      <Progress value={65} />
                      <p className="text-xs text-muted-foreground font-serif">
                        AI is processing your image. This may take a few moments.
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={startAnalysis}
                        disabled={!selectedAnalysisType || !uploadedImage}
                      >
                        Start Analysis
                      </Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Analysis Types */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {analysisTypes.map((type) => (
              <Card key={type.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-4`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="font-sans">{type.name}</CardTitle>
                  <CardDescription className="font-serif">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium font-sans">Detects:</p>
                    <div className="flex flex-wrap gap-1">
                      {type.conditions.slice(0, 2).map((condition) => (
                        <Badge key={condition} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                      {type.conditions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{type.conditions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analysis History */}
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Analysis</TabsTrigger>
              <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
              <TabsTrigger value="trends">Health Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              <div className="grid gap-6">
                {analysisHistory.map((analysis) => (
                  <Card key={analysis.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={analysis.image || "/placeholder.svg"}
                            alt={analysis.type}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <CardTitle className="font-sans">{analysis.type}</CardTitle>
                            <CardDescription className="font-serif">
                              {new Date(analysis.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Result</p>
                          <div className="flex items-center gap-2">
                            {analysis.result === "Normal" || analysis.result === "Low Risk" ? (
                              <CheckCircle className="w-4 h-4 text-primary" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                            )}
                            <span className="text-sm font-serif">{analysis.result}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={analysis.confidence} className="flex-1" />
                            <span className="text-sm text-muted-foreground font-serif">{analysis.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Findings</p>
                          <p className="text-sm text-muted-foreground font-serif">{analysis.findings}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Recommendations</p>
                          <p className="text-sm text-muted-foreground font-serif">{analysis.recommendations}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans">Analysis Summary</CardTitle>
                    <CardDescription className="font-serif">Overview of your AI health analyses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-sans">Total Analyses</span>
                        <span className="text-2xl font-bold text-foreground">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-sans">Normal Results</span>
                        <span className="text-lg font-semibold text-primary">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-sans">Attention Needed</span>
                        <span className="text-lg font-semibold text-destructive">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-sans">Follow-up Required</span>
                        <span className="text-lg font-semibold text-accent">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans">Risk Assessment</CardTitle>
                    <CardDescription className="font-serif">AI-powered health risk evaluation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium font-sans">Cardiovascular Risk</span>
                          <span className="text-sm text-primary font-serif">Low</span>
                        </div>
                        <Progress value={25} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium font-sans">Diabetes Risk</span>
                          <span className="text-sm text-accent font-serif">Moderate</span>
                        </div>
                        <Progress value={60} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium font-sans">Skin Cancer Risk</span>
                          <span className="text-sm text-primary font-serif">Low</span>
                        </div>
                        <Progress value={15} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-sans">Health Trend Analysis</CardTitle>
                  <CardDescription className="font-serif">
                    Track changes in your health metrics over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">92%</p>
                        <p className="text-sm text-muted-foreground font-serif">Overall Health Score</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <FileImage className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-sm text-muted-foreground font-serif">Images Analyzed</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">3</p>
                        <p className="text-sm text-muted-foreground font-serif">Months Tracking</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium font-sans">Recent Improvements</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm font-serif">Blood pressure readings improved by 15%</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm font-serif">Skin condition monitoring shows stable results</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-accent" />
                          <span className="text-sm font-serif">Eye health requires continued monitoring</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Stethoscope,
  Search,
  MapPin,
  Star,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CalendarIcon,
  User,
  Award,
  Building,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { HealthDashboardNav } from "@/components/health-dashboard-nav"
import { useEffect } from "react"
import { doctorService, Doctor } from "@/lib/supabase"

// REMOVE: const doctors = [
// ... all doctor objects ...
// ];

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Patel",
    specialty: "Cardiologist",
    date: "2024-01-20",
    time: "3:00 PM",
    type: "Teleconsultation",
    status: "confirmed",
    reason: "Follow-up consultation",
  },
  {
    id: 2,
    doctor: "Dr. Rajesh Kumar",
    specialty: "Endocrinologist",
    date: "2024-01-18",
    time: "10:00 AM",
    type: "In-person",
    status: "completed",
    reason: "Diabetes management",
  },
  {
    id: 3,
    doctor: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    date: "2024-01-25",
    time: "2:30 PM",
    type: "Teleconsultation",
    status: "pending",
    reason: "Skin condition check",
  },
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isBookingAppointment, setIsBookingAppointment] = useState(false)

  useEffect(() => {
    async function fetchDoctors() {
      const data = await doctorService.getAllDoctors()
      setDoctors(data)
    }
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      (doctor.name && typeof doctor.name === "string" && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doctor.specialty && typeof doctor.specialty === "string" && doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === "all" || (doctor.city && typeof doctor.city === "string" && doctor.city.includes(selectedLocation));
    return matchesSearch && matchesSpecialty && matchesLocation;
  })

  return (
    <div className="min-h-screen bg-background">
      <HealthDashboardNav />

      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-sans">Find Doctors</h1>
              <p className="text-muted-foreground font-serif">
                Book appointments and consult with healthcare professionals
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="font-sans">Search Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Doctor name or specialty"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All specialties</SelectItem>
                      <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="Endocrinologist">Endocrinologist</SelectItem>
                      <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                      <SelectItem value="Orthopedist">Orthopedist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="doctors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="teleconsultation">Teleconsultation</TabsTrigger>
            </TabsList>

            <TabsContent value="doctors" className="space-y-6">
              <div className="grid gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="font-sans">{doctor.name}</CardTitle>
                            <CardDescription className="font-serif">{doctor.specialty}</CardDescription>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="text-sm font-medium">{doctor.rating}</span>
                                <span className="text-sm text-muted-foreground font-serif">
                                  ({doctor.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground font-serif">{doctor.experience}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">₹{doctor.consultation_fee ?? "N/A"}</p>
                          <p className="text-sm text-muted-foreground font-serif">Consultation fee</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Hospital</p>
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">{doctor.hospital ?? "N/A"}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Location</p>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">{(doctor.city && doctor.address) ? `${doctor.city}, ${doctor.address}` : "N/A"}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Next Available</p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-serif">{doctor.nextAvailable}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Languages</p>
                          <div className="flex flex-wrap gap-1">
                            {(doctor.languages && Array.isArray(doctor.languages) ? doctor.languages.slice(0, 2) : []).map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={isBookingAppointment} onOpenChange={setIsBookingAppointment}>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => {
                                setSelectedDoctor(doctor)
                                setIsBookingAppointment(true)
                              }}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Book Appointment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-sans">Book Appointment</DialogTitle>
                              <DialogDescription className="font-serif">
                                Schedule a consultation with {selectedDoctor?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-sm font-medium font-sans">Select Date</Label>
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border mt-2"
                                  />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="appointment-type">Appointment Type</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="teleconsultation">Teleconsultation</SelectItem>
                                      <SelectItem value="in-person">In-person Visit</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="time-slot">Available Time Slots</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"].map(
                                      (time) => (
                                        <Button key={time} variant="outline" size="sm">
                                          {time}
                                        </Button>
                                      ),
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="reason">Reason for Visit</Label>
                                  <Textarea id="reason" placeholder="Describe your symptoms or concerns..." />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="patient-info">Patient Information</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select patient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="self">Myself</SelectItem>
                                      <SelectItem value="family">Family Member</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-2">
                                  <Button className="flex-1">Confirm Booking</Button>
                                  <Button variant="outline" onClick={() => setIsBookingAppointment(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {doctor.teleconsultation && (
                          <Button variant="outline">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                        )}
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <div className="space-y-6">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="font-sans">{appointment.doctor}</CardTitle>
                            <CardDescription className="font-serif">{appointment.specialty}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.status === "confirmed" && (
                            <Badge className="bg-primary">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Confirmed
                            </Badge>
                          )}
                          {appointment.status === "completed" && (
                            <Badge variant="secondary">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {appointment.status === "pending" && (
                            <Badge variant="outline">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Date</p>
                          <p className="text-sm text-muted-foreground font-serif">
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Time</p>
                          <p className="text-sm text-muted-foreground font-serif">{appointment.time}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Type</p>
                          <p className="text-sm text-muted-foreground font-serif">{appointment.type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium font-sans mb-1">Reason</p>
                          <p className="text-sm text-muted-foreground font-serif">{appointment.reason}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "confirmed" && appointment.type === "Teleconsultation" && (
                          <Button>
                            <Video className="w-4 h-4 mr-2" />
                            Join Video Call
                          </Button>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline">
                            <User className="w-4 h-4 mr-2" />
                            View Report
                          </Button>
                        )}
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message Doctor
                        </Button>
                        {appointment.status === "confirmed" && (
                          <Button variant="outline">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teleconsultation" className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-sans">Teleconsultation Center</CardTitle>
                  <CardDescription className="font-serif">
                    Connect with doctors through secure video consultations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold font-sans">Upcoming Consultations</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Video className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium font-sans">Dr. Sarah Patel</p>
                            <p className="text-sm text-muted-foreground font-serif">Today at 3:00 PM</p>
                          </div>
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold font-sans">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Video className="w-4 h-4 mr-2" />
                          Test Video & Audio
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Audio-only Consultation
                        </Button>
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat with Doctor
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-sans">Consultation History</CardTitle>
                  <CardDescription className="font-serif">Your past teleconsultation sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments
                      .filter((apt) => apt.type === "Teleconsultation")
                      .map((consultation) => (
                        <div
                          key={consultation.id}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                              <Video className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <p className="font-medium font-sans">{consultation.doctor}</p>
                              <p className="text-sm text-muted-foreground font-serif">
                                {new Date(consultation.date).toLocaleDateString()} at {consultation.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={consultation.status === "completed" ? "secondary" : "default"}>
                              {consultation.status}
                            </Badge>
                            {consultation.status === "completed" && (
                              <Button variant="outline" size="sm">
                                View Notes
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
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
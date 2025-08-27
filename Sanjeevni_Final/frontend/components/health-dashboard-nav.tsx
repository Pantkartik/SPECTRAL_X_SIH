"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import {
  Heart,
  LayoutDashboard,
  Pill,
  Activity,
  Brain,
  Calendar,
  MessageSquare,
  Stethoscope,
  Settings,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pill Reminders", href: "/dashboard/pills", icon: Pill },
  { name: "Health Analysis", href: "/dashboard/analysis", icon: Activity },
  { name: "Mental Health", href: "/dashboard/mental-health", icon: Brain },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Community", href: "/dashboard/community", icon: MessageSquare },
  { name: "Doctors", href: "/dashboard/doctors", icon: Stethoscope },
]

export function HealthDashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-card/50 lg:backdrop-blur-sm">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="ml-2 text-xl font-bold text-foreground font-sans">Sanjeevni</h1>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <div className="flex-1 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
          <div className="px-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={async () => {
                try {
                  await logout()
                  router.push('/')
                } catch (error) {
                  console.error('Logout error:', error)
                }
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, Clock, UserCheck, AlertCircle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/school-hero.jpg";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+5.2% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Active enrolled students"
    },
    {
      title: "Total Teachers",
      value: "87",
      change: "+2 new this month",
      changeType: "positive" as const,
      icon: GraduationCap,
      description: "Faculty members"
    },
    {
      title: "Active Classes",
      value: "156",
      change: "12 new courses",
      changeType: "positive" as const,
      icon: BookOpen,
      description: "Currently running"
    },
    {
      title: "Attendance Rate",
      value: "94.8%",
      change: "+1.2% from last week",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "Weekly average"
    }
  ];

  const recentActivities = [
    { action: "New student enrolled", time: "2 hours ago", type: "enrollment" },
    { action: "Math exam scheduled", time: "4 hours ago", type: "exam" },
    { action: "Parent-teacher meeting", time: "1 day ago", type: "meeting" },
    { action: "Science project submitted", time: "2 days ago", type: "assignment" }
  ];

  const upcomingEvents = [
    { title: "Science Fair", date: "March 15", time: "9:00 AM" },
    { title: "Parent-Teacher Conference", date: "March 18", time: "2:00 PM" },
    { title: "Spring Break", date: "March 25", time: "All Day" },
    { title: "Graduation Ceremony", date: "May 20", time: "10:00 AM" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to EduManage</h1>
          <p className="text-lg opacity-90 mb-6">
            Your comprehensive school management solution. Monitor student progress, 
            manage faculty, and streamline administrative tasks all in one place.
          </p>
          <Button variant="secondary" size="lg">
            Get Started
          </Button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <img 
            src={heroImage} 
            alt="School Management" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:shadow-card transition-all">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Add Student</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <GraduationCap className="h-6 w-6" />
              <span>Add Teacher</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <BookOpen className="h-6 w-6" />
              <span>Create Class</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>Schedule Event</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
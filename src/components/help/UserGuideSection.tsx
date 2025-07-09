
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, GraduationCap, Calendar, MessageSquare, Settings } from 'lucide-react';

const userGuideData = [
  {
    category: "Getting Started",
    icon: <User className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    sections: [
      {
        title: "First Time Login",
        content: "When you first log in, you'll see your personalized dashboard. Complete your profile by clicking on 'Profile' in the sidebar to ensure you receive all relevant information and notifications."
      },
      {
        title: "Navigating the Dashboard",
        content: "Your dashboard shows an overview of your academic progress, upcoming assignments, recent grades, and important announcements. Use the sidebar menu to access different sections of the system."
      },
      {
        title: "Updating Your Profile",
        content: "Go to Profile → Personal Information to update your contact details, emergency contacts, and profile picture. This information is important for school communications."
      }
    ]
  },
  {
    category: "Academic Features",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-green-100 text-green-700 border-green-200",
    sections: [
      {
        title: "Viewing Your Grades",
        content: "Navigate to 'Results' to view your current grades, previous term results, and performance analytics. You can filter by subject, term, or academic year."
      },
      {
        title: "Assignments & Homework",
        content: "The 'Assignments' section shows all your current and past assignments. Click 'Start Work' to begin an assignment, save your progress, and 'Submit' when complete."
      },
      {
        title: "Class Timetable",
        content: "Check your 'Timetable' for daily schedules, classroom locations, and teacher information. You can view by day, week, or month."
      },
      {
        title: "Attendance Tracking",
        content: "Monitor your attendance record in the 'Attendance' section. This shows your attendance percentage by subject and highlights any concerning patterns."
      }
    ]
  },
  {
    category: "Communication",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    sections: [
      {
        title: "Messaging Teachers",
        content: "Use the 'Communication' section to send messages to your teachers. Always include a clear subject line and be respectful in your communication."
      },
      {
        title: "Notifications",
        content: "Check the 'Notifications' section regularly for important announcements, assignment reminders, and school updates. You can customize notification preferences in Settings."
      },
      {
        title: "Parent Communication",
        content: "Parents can access the same system with their own login credentials to monitor your progress and communicate with teachers directly."
      }
    ]
  },
  {
    category: "Tools & Features",
    icon: <Settings className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    sections: [
      {
        title: "Calendar Integration",
        content: "The 'Calendar' shows all your assignments, exams, school events, and personal reminders in one place. You can add personal events and set reminders."
      },
      {
        title: "Reports & Analytics",
        content: "Generate detailed reports about your academic performance, attendance patterns, and progress over time in the 'Reports' section."
      },
      {
        title: "Settings & Preferences",
        content: "Customize your experience in 'Settings' by adjusting notification preferences, changing your password, and setting up your profile preferences."
      }
    ]
  },
  {
    category: "Tips for Success",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    sections: [
      {
        title: "Stay Organized",
        content: "Check your dashboard daily, use the calendar to track important dates, and submit assignments before the deadline. Set up notifications to remind you of upcoming tasks."
      },
      {
        title: "Communicate Effectively",
        content: "Don't hesitate to reach out to teachers if you're struggling. Use the messaging system appropriately and attend any scheduled meetings or consultations."
      },
      {
        title: "Monitor Your Progress",
        content: "Regularly check your grades and attendance. Use the analytics features to identify areas where you need improvement and celebrate your achievements."
      }
    ]
  }
];

export const UserGuideSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Complete User Guide
          </CardTitle>
          <p className="text-gray-600">
            Everything you need to know about using the Springing Stars School Management System
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userGuideData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {category.sections.map((section, sectionIndex) => (
                    <AccordionItem key={sectionIndex} value={`${categoryIndex}-${sectionIndex}`}>
                      <AccordionTrigger className="text-left hover:text-blue-600">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {section.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Need More Help?</h4>
            <p className="text-blue-700 text-sm">
              If you can't find what you're looking for in this guide, don't hesitate to contact our support team using the contact options at the top of this page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "Go to your Profile page and click on 'Change Password'. Enter your current password and your new password twice to confirm.",
    category: "account"
  },
  {
    question: "How do I view my grades?",
    answer: "Navigate to the 'Results' or 'My Grades' section from the sidebar. You can view your current grades, previous term results, and performance charts.",
    category: "academic"
  },
  {
    question: "How do I submit an assignment?",
    answer: "Go to the 'Assignments' page, find your assignment, click 'Start Work' to work on it, then click 'Submit' when you're ready to turn it in.",
    category: "academic"
  },
  {
    question: "How do I contact my teachers?",
    answer: "Use the 'Communication' page to send messages to your teachers or classmates. You can also check your notifications for updates.",
    category: "communication"
  },
  {
    question: "Why can't I access certain pages?",
    answer: "Some pages are role-specific. Students can't access teacher or admin features, and vice versa. This is normal behavior.",
    category: "technical"
  },
  {
    question: "How do I update my profile information?",
    answer: "Visit the 'Profile' page where you can edit your personal information, contact details, and other profile settings.",
    category: "account"
  }
];

export const FAQSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

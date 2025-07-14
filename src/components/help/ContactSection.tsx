
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message with form data
    const whatsappMessage = encodeURIComponent(
      `Hello Springing Stars Support Team!\n\n` +
      `Name: ${contactForm.name}\n` +
      `Email: ${contactForm.email}\n\n` +
      `Message: ${contactForm.message}\n\n` +
      `Sent from: Help & Support page`
    );

    // Open WhatsApp with prefilled message
    window.open(`https://wa.me/256123456789?text=${whatsappMessage}`, '_blank');

    toast({
      title: "Message prepared!",
      description: "Your message has been prepared in WhatsApp. Click send to submit it.",
    });

    // Reset form
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const handlePhoneCall = () => {
    window.open('tel:+256123456789', '_self');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Support Request - Springing Stars');
    const body = encodeURIComponent('Hello,\n\nI need help with...\n\nBest regards,');
    window.open(`mailto:support@school.edu?subject=${subject}&body=${body}`, '_self');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello Springing Stars admin, I need assistance with...');
    window.open(`https://wa.me/256123456789?text=${message}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <p className="text-sm text-gray-600">Fill out the form and we'll send it via WhatsApp</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <p className="text-sm text-gray-600">Get in touch through your preferred method</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors" onClick={handlePhoneCall}>
            <div className="p-2 bg-blue-50 rounded-full">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-gray-600">+256 123 456 789</p>
              <p className="text-xs text-gray-500">Mon-Fri 8AM-6PM EAT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors" onClick={handleEmailClick}>
            <div className="p-2 bg-purple-50 rounded-full">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-gray-600">support@school.edu</p>
              <p className="text-xs text-gray-500">Response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors" onClick={handleWhatsAppClick}>
            <div className="p-2 bg-green-50 rounded-full">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">WhatsApp Support</p>
              <p className="text-sm text-gray-600">+256 123 456 789</p>
              <p className="text-xs text-gray-500">Quick responses via WhatsApp</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <h4 className="font-semibold text-green-900 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-green-700">
              For fastest response, use WhatsApp or the contact form above. We're most active on WhatsApp during school hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

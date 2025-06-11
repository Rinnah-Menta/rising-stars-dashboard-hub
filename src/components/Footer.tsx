
import React from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Why Choose Us', href: '/why-us' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
                alt="Springing Stars Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold">Springing Stars</h3>
                <p className="text-sm text-blue-200">Junior School</p>
              </div>
            </div>
            <p className="text-sm text-blue-200">
              Nurturing young minds for a brighter tomorrow in Uganda.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+256 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@springingstars.ac.ug</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm text-blue-200 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6 text-center">
          <p className="text-sm text-blue-200">
            © {currentYear} Springing Stars Junior School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

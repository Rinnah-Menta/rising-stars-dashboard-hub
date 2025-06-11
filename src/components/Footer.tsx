
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
    <footer className="bg-blue-900 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* School Info */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <img 
                src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
                alt="Springing Stars Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <div>
                <h3 className="text-base sm:text-lg font-bold">Springing Stars</h3>
                <p className="text-xs sm:text-sm text-blue-200">Junior School</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-blue-200">
              Nurturing young minds for a brighter tomorrow in Uganda.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">+256 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm break-all">info@springingstars.ac.ug</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs sm:text-sm text-blue-200 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-blue-200">
            © {currentYear} Springing Stars Junior School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

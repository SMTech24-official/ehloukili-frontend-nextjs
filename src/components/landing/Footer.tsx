import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-neutral-900)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/logo.svg"
                alt="Dometerra"
                width={150}
                height={40}
                priority
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Our vision is to make all people the best place to live for them.
              Find your perfect home today.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center Column - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Stay Notified Of New Deals</h3>
            <p className="text-gray-300 mb-6">
              Get the latest property deals and market insights directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-600)] focus:border-transparent"
              />
              <Button className="bg-[var(--color-secondary-600)] hover:bg-[var(--color-secondary-700)] text-white px-6 py-3 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>

          {/* Right Column - Quick Links & Contact */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Property Services</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Property for Sale</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Property for Rent</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Property Valuation</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Market Report</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 - All rights reserved</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

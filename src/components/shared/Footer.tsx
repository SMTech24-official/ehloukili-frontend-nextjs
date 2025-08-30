import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181A20] text-white">
      <div className="container max-w-7xl min-[100rem]:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Top Row - Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 w-full">
          {/* Left Column - Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Image
                src="/logo.svg"
                alt="Dometerra"
                width={180}
                height={45}
                priority
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              All property details are directly submitted by hosts or sourced from public platforms. Transactions are securely managed independently between guests and hosts.
            </p>
            <div>
              <p className="text-white font-medium mb-3">Follow us on social media</p>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Keep Yourself Up to Date</h3>
              <div className="flex relative">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 rounded-r-none text-sm"
                />
                <Button color='outline' className='absolute right-0 top-0 h-full'>
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Popular Search Column */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Popular Search</h4>
                <ul className="space-y-3">
                  <li><Link href="/property" className="text-gray-400 hover:text-white transition-colors text-sm">Apartment for Sale</Link></li>
                  <li><Link href="/property" className="text-gray-400 hover:text-white transition-colors text-sm">Apartment for Rent</Link></li>
                  <li><Link href="/property" className="text-gray-400 hover:text-white transition-colors text-sm">Offices for Sale</Link></li>
                  <li><Link href="/property" className="text-gray-400 hover:text-white transition-colors text-sm">Offices for Rent</Link></li>
                </ul>
              </div>

              {/* Quick Links Column */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Use</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing Plans</Link></li>
                  <li><Link href="contact-us" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Contact</h4>
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">+(088) 123 456 789</p>
                  <p className="text-gray-400 text-sm">hi@homez.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Popular Search, Quick Links & Contact */}


        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© Homez - All rights reserved</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

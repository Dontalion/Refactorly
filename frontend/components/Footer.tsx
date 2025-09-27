import React from 'react';
import Link from 'next/link';
import { FiCode, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex items-center">
            <FiCode className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Refactorly</span>
          </div>
        </div>
        
        <nav className="mt-8 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href="/" className="text-base text-gray-500 hover:text-gray-900">
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <a href="/#features" className="text-base text-gray-500 hover:text-gray-900">
              Features
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="/#about" className="text-base text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <Link href="/dashboard" className="text-base text-gray-500 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/login" className="text-base text-gray-500 hover:text-gray-900">
              Sign In
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/register" className="text-base text-gray-500 hover:text-gray-900">
              Sign Up
            </Link>
          </div>
        </nav>
        
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>
            <FiGithub className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FiTwitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <FiLinkedin className="h-6 w-6" />
          </a>
        </div>
        
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {currentYear} Refactorly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

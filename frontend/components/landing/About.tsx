import React from 'react';
import Link from 'next/link';

const About: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Refactoring Tool
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            We're developers who understand the challenges of maintaining clean, efficient code.
          </p>
        </div>
        
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <p className="text-lg text-gray-500">
                  Our journey began when we realized how much time developers spend refactoring code instead of building new features. We set out to create a tool that would leverage AI to automate the refactoring process, making it faster and more effective.
                </p>
              </div>
              
              <div className="mt-5 prose prose-blue text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  Our mission is to help developers write better code and reduce technical debt. We believe that clean code is not just about aesthetics—it's about maintainability, efficiency, and collaboration.
                </p>
                <p>
                  By using our tool, you'll not only improve your current code but also learn best practices and patterns that will make you a better developer in the long run.
                </p>
                <h3>Our Technology</h3>
                <p>
                  We use state-of-the-art machine learning models trained on millions of code repositories to understand patterns, identify anti-patterns, and suggest improvements that align with industry best practices.
                </p>
                <p>
                  Our system continues to learn and improve based on feedback from users, ensuring that the suggestions become more accurate and helpful over time.
                </p>
                <div className="mt-6">
                  <Link
                    href="/register"
                    className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Refactoring Today
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <div className="w-full rounded-xl shadow-xl lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none bg-gradient-to-r from-blue-100 to-blue-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

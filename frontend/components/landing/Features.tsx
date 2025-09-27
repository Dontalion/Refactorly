import React from 'react';
import { FiCode, FiZap, FiAward, FiRefreshCw, FiClock, FiShield } from 'react-icons/fi';

const features = [
  {
    name: 'Smart Code Analysis',
    description: 'Our AI analyzes your code structure, patterns, and potential issues to suggest targeted improvements.',
    icon: FiCode,
  },
  {
    name: 'Real-time Refactoring',
    description: 'Get instant refactoring suggestions and see the improvements side by side with your original code.',
    icon: FiZap,
  },
  {
    name: 'Best Practices Enforcement',
    description: 'Learn industry best practices as our system helps you align your code with established standards.',
    icon: FiAward,
  },
  {
    name: 'Multiple Languages Support',
    description: 'Supports JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, and Go with more coming soon.',
    icon: FiRefreshCw,
  },
  {
    name: 'Time Saving',
    description: 'Save hours of manual refactoring with AI-powered suggestions that you can implement with one click.',
    icon: FiClock,
  },
  {
    name: 'Secure Processing',
    description: 'Your code is processed securely and never stored permanently without your explicit permission.',
    icon: FiShield,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to improve your code
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our powerful AI helps you write cleaner, more efficient code with intelligent suggestions.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

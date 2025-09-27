// src/components/auth/AuthCard.tsx
import React from 'react';
import { FiLock } from 'react-icons/fi';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title }) => {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
          <FiLock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
      </div>
      
      {children}
    </div>
  );
};

export default AuthCard;

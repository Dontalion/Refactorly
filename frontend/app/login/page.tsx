'use client';

import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}

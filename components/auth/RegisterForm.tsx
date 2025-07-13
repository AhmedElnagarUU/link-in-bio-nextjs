"use client"
import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
 
 const RegisterForm = () => {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, username: name.toLowerCase().replace(/\s/g, ''), links: [], socials: [] }),
        });
        toast.success("Registration Successful", {
          description: "You can now log in.",
        });
        router.push('/login');
      } else {
        const data = await response.json();
        toast.error("Registration Failed", {
          description: data.message || "An error occurred.",
        });
      }
    } catch {
      toast.error("An Error Occurred", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="p-8 bg-[linear-gradient(135deg,#fff5f0_0%,#ffe8f5_100%)] rounded-2xl shadow-2xl w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent">
          LinkHub
        </h1>
        <p className="text-slate-500">Create your account to get started.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              id="name"
              className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-orange-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              id="email"
              className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-orange-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              id="password"
              className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-orange-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-md font-semibold text-white bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:scale-105"
        >
          Register
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
   const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:4300/api/auth/register', { username, email, password });
      router.push('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white border border-gray-200 rounded-md h-full p-16 m-20">
    <h2 className="text-3xl font-bold my-8 text-black">Register</h2>
    <form  className="bg-purple-700 py-8 px-6 rounded-md flex flex-col items-center w-full max-w-md">
      <div className="w-full mb-4">
        <label className="block text-xl font-medium text-white mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full text-black outline-none rounded-md p-2"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-xl font-medium text-white mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-black outline-none rounded-md p-2"
        />
      </div>
      <div className="w-full mb-4">
        <label className="block text-xl font-medium text-white mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full text-black outline-none rounded-md p-2"
        />
      </div>
      <div className="w-full mb-6">
        <label className="block text-xl font-medium text-white mb-2">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full text-black outline-none rounded-md p-2"
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full border border-gray-400 bg-blue-600 p-3 rounded-md text-white text-lg font-bold transition-colors hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>
    </form>
    <p className="text-xl mt-4 font-medium text-black">
      Already have an account? <Link href="/login" className="text-violet-950 underline">Login here</Link>
    </p>
  </div>
  
  );
};

export default Register;

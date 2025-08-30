/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import Spinner from "@/components/ui/Spinner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await forgotPassword({ email }).unwrap();
      setSuccess("OTP sent to your email. Please check your inbox.");
      setTimeout(() => {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-primary-600 !text-white py-2 rounded disabled:opacity-60 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <div className="flex items-center">
          Sending...
          <Spinner color="white" />
          </div> : "Send OTP"}
        </button>
      </form>
    </div>
  );
}



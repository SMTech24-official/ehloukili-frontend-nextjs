/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import Spinner from "@/components/ui/Spinner";

export default function VerifyOtpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email") || "";
    const [email, setEmail] = useState(emailParam);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifyOtp] = useVerifyOtpMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res: any = await verifyOtp({ email, otp }).unwrap();
            setSuccess("OTP verified successfully. You can now reset your password.");
            setTimeout(() => {
                router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
            }, 1000);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to verify OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 rounded px-4 py-3 text-sm">
                Your code has been sent. Please check your inbox and enter the OTP below.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        readOnly={!!emailParam}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">OTP</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                        maxLength={6}
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
                        Verifying...
                        <Spinner color="white" />
                    </div> : "Verify OTP"}
                </button>
            </form>
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import Spinner from "@/components/ui/Spinner";
import PasswordInput from "@/components/ui/PasswordInput";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email") || "";
    const [email, setEmail] = useState(emailParam);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetPassword] = useResetPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email) {
            setError("Email is required.");
            return;
        }
        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const res: any = await resetPassword({
                email,
                password,
                password_confirmation: passwordConfirmation,
            }).unwrap();
            setSuccess("Password reset successfully. Redirecting to login...");
            setTimeout(() => {
                router.push("/auth/login");
            }, 1200);
        } catch (err: any) {
            setError(err?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
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
                    <PasswordInput
                        label="New Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength={8}
                        name="new-password"
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <PasswordInput
                        label="Confirm Password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        required
                        minLength={8}
                        name="confirm-password"
                        autoComplete="new-password"
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
                        Resetting...
                        <Spinner color="white" />
                    </div> : "Reset Password"}
                </button>
            </form>
        </div>
    );
}

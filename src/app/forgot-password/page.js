"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate email sending logic here
        router.push("/reset-password");
    };

    return (
        <>
            <header
                className=""
                style={{
                    height: "550px",
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="flex h-full flex-col items-center justify-center pt-20">
                    <h1 className="text-5xl font-bold text-[#005963] uppercase text-center">Forgot Password</h1>
                    <p className="mt-4 text-[#005963] uppercase">Home | Forgot Password</p>
                </div>
            </header>

            <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-10">
                <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-md">
                    {/* Heading */}
                    <h1 className="mb-6 text-3xl font-bold text-[#006c73]">
                        Forgot Password
                    </h1>

                    <form onSubmit={handleSubmit}>
                        {/* Input Field */}
                        <div className="relative mb-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-[#2E95A0] focus:outline-none"
                                required
                            />

                            <i className="fa-regular fa-user absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"></i>
                        </div>

                        {/* Helper Text */}
                        <p className="mb-6 text-xs text-gray-500">
                            please enter your email to reset password!
                        </p>

                        {/* Continue Button */}
                        <button type="submit" className="w-full rounded-lg bg-[#2E95A0] py-3 font-medium text-white shadow-sm transition hover:bg-[#23737b]">
                            Continue
                        </button>
                    </form>

                    {/* Back to signup */}
                    <p className="mt-6 text-sm text-gray-600">
                        don’t have an account?{" "}
                        <Link
                            href="/signup-email"
                            className="font-semibold text-[#2E95A0] hover:underline"
                        >
                            sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

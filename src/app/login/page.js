"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate login (Always allow in simulation)
        localStorage.setItem("isLoggedIn", "true");
        // Save user data
        localStorage.setItem("userEmail", loginData.email);

        // Notify other components (Navbar) about the change
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth-change"));
        }

        router.push("/");
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
                <div className="flex flex-col justify-center items-center h-full pt-20">
                    <h1 className="text-[#005963] font-bold text-4xl uppercase">
                        Login
                    </h1>
                    <p className="text-[#005963] mt-4 uppercase">Home | Login</p>
                </div>
            </header>

            <section className="bg-white flex items-center justify-center min-h-screen py-10">
                <main className="w-[90%] sm:w-[400px] bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                    <div className="flex justify-center gap-3 mb-6">
                        <button
                            type="button"
                            className="flex-1 py-2 px-4 rounded-lg bg-[#009c9c] text-white font-semibold shadow-md transition-all scale-105"
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/doctor-dashboard')}
                            className="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-600 font-medium border border-gray-200 hover:bg-gray-200 hover:text-[#009c9c] transition-all"
                        >
                            Doctor
                        </button>
                    </div>

                    <h1 className="text-[#006d6d] text-xl font-semibold mb-6">
                        User Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full outline-none text-sm"
                                required
                            />
                            <i className="fa-regular fa-envelope text-gray-400"></i>
                        </div>

                        {/* Password */}
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full outline-none text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#009c9c] text-white py-2 rounded-md font-medium hover:bg-[#007a7a] transition"
                        >
                            Log in
                        </button>
                    </form>

                    <div className="flex justify-end text-sm">
                        <Link href="/forgot-password" className="text-[#009c9c] hover:underline" aria-label="Forgot Password">
                            Forgot Password?
                        </Link>
                    </div>

                    <p className="mt-4 text-sm text-gray-700">
                        Don't have an account?{" "}
                        <Link
                            href="/signup-email"
                            className="text-[#009c9c] font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </main>
            </section>
        </>
    );
}

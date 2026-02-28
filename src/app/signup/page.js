"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate signup
        localStorage.setItem("isLoggedIn", "true");
        // Save user data if needed
        localStorage.setItem("userEmail", signupData.email);
        localStorage.setItem("userName", signupData.username);
        localStorage.setItem("userPassword", signupData.password);

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
                        SignUp
                    </h1>
                    <p className="text-[#005963] mt-4 uppercase">Home | SignUp</p>
                </div>
            </header>

            <section className="bg-white flex items-center justify-center min-h-screen py-10">
                <main className="w-[90%] sm:w-[400px] bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
                    <h1 className="text-[#006d6d] text-xl font-semibold mb-6">
                        Please Enter Your Details
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type="text"
                                name="username"
                                value={signupData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full outline-none text-sm"
                                required
                            />
                            <i className="fa-regular fa-user text-gray-400"></i>
                        </div>

                        {/* Email */}
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type="email"
                                name="email"
                                value={signupData.email}
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
                                value={signupData.password}
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

                        {/* Confirm Password */}
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={signupData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full outline-none text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#009c9c] text-white py-2 rounded-md font-medium hover:bg-[#007a7a] transition"
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 mt-4">
                        By creating an account, you agree to our{" "}
                        <Link href="#" className="text-[#009c9c] hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and have read and understood the{" "}
                        <Link href="#" className="text-[#009c9c] hover:underline">
                            Privacy Policy
                        </Link>
                        .
                    </p>

                    <p className="mt-4 text-sm text-gray-700">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#009c9c] font-semibold hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </main>
            </section>
        </>
    );
}

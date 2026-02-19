"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const router = useRouter();
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordData.password !== passwordData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Update password in localStorage
        localStorage.setItem("userPassword", passwordData.password);

        alert("Password reset successfully!");
        router.push("/login");
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
                    <h1 className="text-6xl font-bold text-[#005963] uppercase">login</h1>
                    <p className="mt-4 text-[#005963] uppercase">Home | login</p>
                </div>
            </header>

            <section className="flex min-h-screen items-center justify-center bg-white">
                <div className="w-full max-w-sm rounded-lg border border-gray-100 p-8 py-10 text-center shadow-sm">
                    <h1 className="mb-8 text-xl font-semibold text-teal-700">
                        Please Enter Your Details
                    </h1>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={passwordData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-teal-600 py-2 text-white transition hover:bg-teal-700"
                        >
                            Reset Password
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-600">
                        want to go back?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-teal-600 hover:underline"
                        >
                            login
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}

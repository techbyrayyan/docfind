"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignupEmail() {
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

            <section className="bg-white flex items-center justify-center min-h-screen">
                <main className="w-[90%] sm:w-[400px] bg-white p-6 rounded-xl shadow-md text-center">
                    <h1 className="text-[#006d6d] text-xl font-semibold mb-6">
                        Please Select Sign Up Options
                    </h1>

                    <div className="space-y-4">
                        {/* Google */}
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                            <Image
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                width={20}
                                height={20}
                                alt="Google Logo"
                            />
                            <span className="text-gray-700 text-sm font-medium">
                                Continue with Google
                            </span>
                        </button>

                        {/* Facebook */}
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                            <Image
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                                width={20}
                                height={20}
                                alt="Facebook Logo"
                            />
                            <span className="text-gray-700 text-sm font-medium">
                                Continue with Facebook
                            </span>
                        </button>

                        {/* Email */}
                        {/* Email */}
                        <Link href="/signup" className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M21.75 8.25v8.25a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V8.25m19.5 0L12 13.5 2.25 8.25m19.5 0A2.25 2.25 0 0019.5 6H4.5a2.25 2.25 0 00-2.25 2.25"
                                />
                            </svg>
                            <span className="text-gray-700 text-sm font-medium">
                                Continue with Email
                            </span>
                        </Link>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 md:px-5">
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
                        already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#009c9c] font-semibold hover:underline"
                        >
                            sign in
                        </Link>
                    </p>
                </main>
            </section>
        </>
    );
}

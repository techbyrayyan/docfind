"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctorlist" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Medicine", href: "/medicine" },
    { label: "Contact", href: "/contact" },
];

const DROPDOWN_ITEMS = [
    { label: "User Dashboard", href: "/user-panel", icon: "fa-solid fa-gauge-high" },
    { label: "Edit Profile", href: "/edit-profile", icon: "fa-solid fa-user-pen" },
];

export default function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", pic: "" });
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        // Handle scroll
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Initialize User State from localStorage
        const checkAuth = () => {
            const loggedIn = localStorage.getItem("isLoggedIn") === "true";
            setIsLoggedIn(loggedIn);
            if (loggedIn) {
                const email = localStorage.getItem("userEmail") || "";
                setUserData({
                    name: localStorage.getItem("userName") || email.split('@')[0] || "User",
                    email: email
                });
            }
        };

        checkAuth();
        window.addEventListener("scroll", handleScroll);
        // Also listen for storage changes (e.g. login/logout in other tabs)
        window.addEventListener("storage", checkAuth);
        // Custom event for same-tab updates
        window.addEventListener("auth-change", checkAuth);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("auth-change", checkAuth);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");

        // Notify other components (Navbar) about the change
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth-change"));
        }

        router.push("/login");
    };

    return (
        <>
            {/* Navbar */}
            <nav
                id="navbar"
                className={twMerge(
                    "fixed z-50 flex items-center justify-center bg-white transition-all duration-300 ease-in-out",
                    isScrolled
                        ? "top-0 left-0 w-full rounded-none shadow-lg py-4"
                        : "top-11 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] rounded-xl shadow-md px-8 py-4"
                )}
            >
                {/* Content Container */}
                <div
                    className={twMerge(
                        "flex w-full items-center justify-between transition-all duration-300 ease-in-out",
                        isScrolled ? "w-[90%] md:w-[80%]" : "w-full"
                    )}
                >
                    {/* Logo */}
                    <div className="flex flex-1 items-center gap-2">
                        <Link href="/">
                            <Image
                                src="/img/Logo Dark.png"
                                alt="Docfind Logo"
                                width={150}
                                height={40}
                                className="h-10 md:h-12 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu - Centered Links */}
                    <div className="hidden flex-grow justify-center items-center gap-6 font-semibold text-[#00464B] md:flex">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.label} href={item.href} className="hover:text-[#2E95A0] transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Dropdown / Login - Right Aligned */}
                    <div className="hidden flex-1 justify-end items-center md:flex">
                        <div className="relative mr-6">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                                        <div className="w-10 h-10 rounded-full border-2 border-[#2E95A0] overflow-hidden bg-teal-50 flex items-center justify-center transition-transform group-hover:scale-105">
                                            <i className="fa-solid fa-user text-[#2E95A0] text-lg"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-[#00464B] leading-none group-hover:text-[#2E95A0]">
                                                {userData.name}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium">Verified Profile</span>
                                        </div>
                                        <i className={twMerge("fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-300", isUserDropdownOpen && "rotate-180")}></i>
                                    </div>

                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-3 w-56 rounded-2xl bg-white shadow-2xl py-3 flex flex-col items-start z-50 border border-gray-100 animate-fade-in-up">
                                            <div className="px-4 py-2 border-b border-gray-50 w-full mb-2">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Menu</p>
                                            </div>

                                            <Link href="/user-panel" className="w-full px-4 py-2 text-left text-sm font-semibold text-[#00464B] hover:bg-teal-50 hover:text-[#2E95A0] flex items-center gap-3 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                                    <i className="fa-solid fa-gauge-high text-xs text-[#2E95A0]"></i>
                                                </div>
                                                User Dashboard
                                            </Link>

                                            <Link href="/edit-profile" className="w-full px-4 py-2 text-left text-sm font-semibold text-[#00464B] hover:bg-teal-50 hover:text-[#2E95A0] flex items-center gap-3 transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                                    <i className="fa-solid fa-user-pen text-xs text-[#2E95A0]"></i>
                                                </div>
                                                Edit Profile
                                            </Link>

                                            <div className="h-px w-full bg-gray-100 my-2"></div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                                    <i className="fa-solid fa-right-from-bracket text-xs text-red-500"></i>
                                                </div>
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/login"
                                        className="text-[#00464B] hover:text-[#2E95A0] transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup-email"
                                        className="bg-[#00464B] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#003333] transition-all"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        id="menu-btn"
                        className="text-[#00464B] focus:outline-none md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={clsx(
                    "fixed left-1/2 z-40 w-[90%] max-w-6xl -translate-x-1/2 rounded-b-xl bg-white shadow-md transition-all duration-300 md:hidden",
                    isScrolled
                        ? isMobileMenuOpen ? "top-[70px] opacity-100" : "top-[70px] hidden opacity-0"
                        : isMobileMenuOpen ? "top-[100px] opacity-100" : "top-[100px] hidden opacity-0"
                )}
            >
                <div className="flex flex-col items-start gap-4 px-6 py-6 font-semibold text-[#00464B]">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.label} href={item.href} className="hover:text-[#2E95A0] w-full py-1">
                            {item.label}
                        </Link>
                    ))}

                    <div className="w-full h-px bg-gray-100 my-2"></div>

                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-3 mb-2 w-full p-2 bg-teal-50 rounded-xl">
                                <div className="w-10 h-10 rounded-full border-2 border-[#2E95A0] overflow-hidden bg-white flex items-center justify-center">
                                    <i className="fa-solid fa-user text-[#2E95A0]"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#00464B]">
                                        {userData.name}
                                    </p>
                                    <p className="text-zxs text-gray-400 font-medium">Verified Profile</p>
                                </div>
                            </div>

                            {DROPDOWN_ITEMS.map((item) => (
                                <Link key={item.label} href={item.href} className="hover:text-[#2E95A0] py-2 text-sm flex items-center gap-3 w-full">
                                    <i className={`${item.icon} text-[#2E95A0] w-4`}></i>
                                    {item.label}
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="text-red-500 py-2 text-sm flex items-center gap-3 w-full"
                            >
                                <i className="fa-solid fa-right-from-bracket w-4"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 w-full">
                            <Link
                                href="/login"
                                className="w-full py-3 text-center border border-gray-200 rounded-xl text-sm font-bold"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup-email"
                                className="w-full py-3 text-center bg-[#00464B] text-white rounded-xl text-sm font-bold shadow-md shadow-gray-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    <div className="w-full pt-4">
                        <Link
                            href="/doctorlist"
                            className="w-full block rounded-xl bg-[#2E95A0] px-5 py-3 text-center text-white font-bold transition hover:bg-[#23737b] shadow-md shadow-teal-100"
                        >
                            Find A Doctor +
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}


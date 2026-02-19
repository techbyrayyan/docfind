"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function History() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const [userProfile, setUserProfile] = useState({
        name: "Rayyan Ansari",
        email: "techbyrayyan@gmail.com",
        phone: "+92 322 435323 23",
        address: "Gulshan-e-Ravi, Lahore"
    });

    useEffect(() => {
        // Fetch appointments
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        setAppointments(storedAppointments.reverse());

        // Fetch user profile
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedPhone = localStorage.getItem("userPhone");
        const storedAddress = localStorage.getItem("userAddress");

        if (storedName || storedEmail || storedPhone || storedAddress) {
            setUserProfile({
                name: storedName || "Rayyan Ansari",
                email: storedEmail || "techbyrayyan@gmail.com",
                phone: storedPhone || "+92 3264734251", 
                address: storedAddress || "Gulshan-e-Ravi, Lahore"
            }); 
        }
    }, []);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this appointment?")) {
            const updatedAppointments = appointments.filter(appt => appt.id !== id);
            setAppointments(updatedAppointments);
            localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        }
    };

    return (
        <>
            <header
                className="relative"
                style={{
                    height: "550px",
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute top-[280px] left-1/2 flex w-[90%] max-w-[600px] -translate-x-1/2 transform flex-col items-center gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:flex-row">
                    <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble.png')] bg-repeat opacity-10"></div>

                    <div className="relative z-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00A0A0] text-4xl font-bold text-[#00A0A0]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="z-10 text-center sm:text-left">
                        <h2 className="mb-1 text-xl font-semibold text-[#005963]">
                            {userProfile.name}
                        </h2>
                        <div className="mb-1 flex items-center justify-center space-x-2 text-sm text-gray-500 sm:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-[#00A0A0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12a4 4 0 01-8 0m8 0a4 4 0 11-8 0m8 0V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m8 0v6a2 2 0 002 2h4m-4-8h4m-4 0h4"
                                />
                            </svg>
                            <span>{userProfile.email}</span>
                            <span className="text-gray-400">•</span>
                            <span>{userProfile.phone}</span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500 sm:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4 text-[#00A0A0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 0c4.418 0 8 2.239 8 5v3H4v-3c0-2.761 3.582-5 8-5z"
                                />
                            </svg>
                            <span>{userProfile.address}</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="flex min-h-screen flex-col items-center justify-start bg-white py-12">
                <h1 className="mb-10 text-4xl font-semibold text-[#00a0a0]">
                    History Appointments
                </h1>

                <div className="w-[90%] max-w-7xl overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fcfc] border-b border-gray-200 text-[#00a0a0]">
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Patient Name</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Doctor</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.length > 0 ? (
                                    appointments.map((appt) => {
                                        // Helper to format time to AM/PM
                                        const formatTime = (time) => {
                                            if (!time) return "";
                                            // Check if already 12-hour format
                                            if (time.toLowerCase().includes("am") || time.toLowerCase().includes("pm")) return time;

                                            const [hours, minutes] = time.split(":");
                                            if (!hours || !minutes) return time;

                                            const h = parseInt(hours, 10);
                                            const m = parseInt(minutes, 10);
                                            const ampm = h >= 12 ? "PM" : "AM";
                                            const formattedH = h % 12 || 12;
                                            const formattedM = m < 10 ? `0${m}` : m;

                                            return `${formattedH}:${formattedM} ${ampm}`;
                                        };

                                        return (
                                            <tr key={appt.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    #{String(appt.id).slice(-4)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#005963]">
                                                    {appt.appointmentDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatTime(appt.appointmentTime)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                                                    {appt.patientName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {appt.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {appt.doctor}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                        {appt.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link
                                                            href={`/booking-eye-view?id=${appt.id}`}
                                                            className="text-gray-400 hover:text-[#00A0A0] transition-colors"
                                                            title="View Details"
                                                        >
                                                            <i className="fa-solid fa-eye text-lg"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(appt.id)}
                                                            className="text-black hover:text-[#00a0a0] transition-colors"
                                                            title="Delete Appointment"
                                                        >
                                                            <i className="fa-solid fa-trash text-lg"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <i className="fa-regular fa-calendar-xmark text-4xl text-gray-300 mb-3"></i>
                                                <p className="text-lg">No appointments found</p>
                                                <Link href="/book-appointment" className="mt-2 text-[#00A0A0] font-semibold hover:underline">
                                                    Book your first appointment now
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-14">
                    <button className="rounded bg-[#00A0A0] px-6 py-2 text-white transition hover:bg-[#007f7f]">
                        View Recent Appointments
                    </button>
                </div>
            </section>
        </>
    );
}

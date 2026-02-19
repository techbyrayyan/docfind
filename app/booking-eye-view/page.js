"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingEyeView() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
            // IDs are stored as numbers in BookAppointment (Date.now()), URL params are strings
            const foundAppointment = storedAppointments.find(appt => String(appt.id) === id);

            if (foundAppointment) {
                setAppointment(foundAppointment);
            }
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#015D63] text-white">
                Loading...
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#015D63] p-4 text-white">
                <h1 className="text-2xl font-bold">Appointment Not Found</h1>
                <Link href="/history" className="mt-4 rounded bg-white px-4 py-2 text-[#015D63]">
                    Back to History
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#015D63] p-4">
            {/* Appointment Card */}
            <div className="relative mt-30 w-full max-w-[700px] rounded-2xl bg-white p-8 shadow-lg">
                {/* Close Button */}
                <Link
                    href="/history"
                    className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    ✕
                </Link>

                {/* Title */}
                <h1 className="mb-0 text-center text-2xl font-semibold text-[#013A3F]">
                    Appointment Details
                </h1>
                <p className="mb-8 text-center text-sm text-gray-500">
                    View your appointment details below
                </p>

                {/* Header Info */}
                <div className="mb-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-700">
                        <span className="font-medium">Appt. ID: </span>
                        <span className="font-semibold text-[#00A0A0]">#{String(appointment.id).slice(-4)}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-medium">Status: </span>
                        <span className="font-semibold text-[#00A0A0]">{appointment.status || "Booked"}</span>
                    </p>
                </div>

                {/* Section Titles */}
                <div className="mb-2 flex justify-between px-2">
                    <h2 className="border-b-2 border-[#00A0A0] pb-1 text-center text-lg font-semibold text-[#00A0A0]">
                        Patient Details
                    </h2>
                    <h2 className="border-b-2 border-[#00A0A0] pb-1 text-center text-lg font-semibold text-[#00A0A0]">
                        Appt. Details
                    </h2>
                </div>

                {/* Details Section */}
                <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Name</span>
                            <span className="text-lg font-semibold text-[#005963]">
                                {appointment.patientName}
                            </span>
                        </div>
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">DOB</span>
                            <span className="text-base font-medium text-gray-700">
                                {appointment.dob || "N/A"}
                            </span>
                        </div>
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Email</span>
                            <span className="text-base font-medium text-gray-700 truncate block">
                                {appointment.email || "N/A"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Phone</span>
                            <span className="text-base font-medium text-gray-700">
                                {appointment.mobile || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Department</span>
                            <span className="text-lg font-semibold text-[#005963]">
                                {appointment.department}
                            </span>
                        </div>
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Doctor</span>
                            <span className="text-base font-medium text-gray-700">
                                {appointment.doctor}
                            </span>
                        </div>
                        <div className="border-b border-gray-100 pb-2">
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Date</span>
                            <span className="text-base font-medium text-gray-700">
                                {appointment.appointmentDate}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase">Time</span>
                            <span className="text-base font-medium text-gray-700">
                                {appointment.appointmentTime}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

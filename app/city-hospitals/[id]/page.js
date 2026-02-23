"use client";

import { useParams, useRouter } from "next/navigation";
import { cityHospitalsData } from "@/data/cityHospitalsData";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HospitalDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [hospitalsData, setHospitalsData] = useState(cityHospitalsData);

    useEffect(() => {
        // Load synchronized data
        const { getSyncedHospitals } = require("@/data/cityHospitalsData");
        setHospitalsData(getSyncedHospitals());

        // Listen for real-time updates
        const handleStorageChange = (e) => {
            if (e.key === "docfind_hospitals" && e.newValue) {
                setHospitalsData(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Find hospital by iterating through cities using state data
    const hospital = Object.values(hospitalsData)
        .flatMap(cityData => cityData.hospitals)
        .find(h => h.id === id);

    if (!hospital) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Hospital Not Found</h1>
                    <p className="text-gray-600 mb-6">The hospital you are looking for does not exist.</p>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="fa-solid fa-star text-yellow-400 text-sm"></i>);
            } else if (i === fullStars && hasHalf) {
                stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-yellow-400 text-sm"></i>);
            } else {
                stars.push(<i key={i} className="fa-regular fa-star text-gray-300 text-sm"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full bg-[#00464B] overflow-hidden">
                <div className="absolute inset-0  z-10"></div>
                {/* Background Pattern/Image Placeholder */}
                <div className="absolute inset-0 bg-[url('/img/pattern/grid.svg')] opacity-20 z-0"></div>

                {/* Content */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col justify-end pb-12">
                    <Link href="/city-hospitals" className="absolute top-50 text-[#00af9e] flex items-center gap-2 transition-colors bg-white backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 ml-250">
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Back to Hospitals</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-end gap-6 text-white">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl p-4 shadow-2xl flex items-center justify-center shrink-0">
                            <img src={hospital.image} alt={hospital.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    {hospital.type}
                                </span>
                                {hospital.emergency && (
                                    <span className="px-3 py-1 bg-[#00af9e] backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <i className="fa-solid fa-truck-medical"></i> Emergency 24/7
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight">{hospital.name}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-200">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot text-teal-400"></i>
                                    {hospital.address}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">{renderStars(hospital.rating)}</div>
                                    <span className="font-bold text-white">{hospital.rating}</span>
                                    <span className="text-gray-400">({hospital.reviews} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Doctors", value: hospital.doctors, icon: "fa-user-doctor", color: "text-blue-500", bg: "bg-blue-50" },
                                { label: "Beds", value: hospital.beds, icon: "fa-bed-pulse", color: "text-purple-500", bg: "bg-purple-50" },
                                { label: "Founded", value: hospital.established, icon: "fa-building-columns", color: "text-emerald-500", bg: "bg-emerald-50" },
                                { label: "Emergency", value: "Available", icon: "fa-truck-medical", color: "text-red-500", bg: "bg-red-50" },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center mb-2`}>
                                        <i className={`fa-solid ${stat.icon} ${stat.color}`}></i>
                                    </div>
                                    <div className="font-black text-xl text-gray-800">{stat.value}</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#00464B] mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-circle-info text-teal-500"></i>
                                About Hospital
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {hospital.description}
                            </p>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#00464B] mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-stethoscope text-teal-500"></i>
                                Medical Specialties
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {hospital.specialties.map((spec, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-semibold border border-teal-100 hover:bg-teal-100 transition-colors cursor-default flex items-center gap-2">
                                        <i className="fa-solid fa-check-circle text-teal-500 text-xs"></i>
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#00464B] mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-hospital text-teal-500"></i>
                                Major Facilities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hospital.facilities.map((facility, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-teal-600">
                                            <i className="fa-solid fa-notes-medical"></i>
                                        </div>
                                        <span className="font-medium text-gray-700">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
                            <div className="bg-gradient-to-br from-[#00464B] to-[#2E95A0] rounded-2xl p-6 text-white mb-6 text-center">
                                <h3 className="font-bold text-lg mb-1">Need an Appointment?</h3>
                                <p className="text-teal-100 text-sm mb-4">Contact the hospital directly or book online.</p>
                                <button className="w-full py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                                    Book Appointment
                                </button>
                            </div>

                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Information</h3>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-1">
                                        <i className="fa-solid fa-phone text-teal-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 font-bold block mb-0.5">Phone Number</span>
                                        <a href={`tel:${hospital.phone}`} className="text-gray-700 font-medium hover:text-teal-600 transition-colors">
                                            {hospital.phone}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-1">
                                        <i className="fa-solid fa-map-location text-teal-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 font-bold block mb-0.5">Address</span>
                                        <a
                                            href={`https://maps.google.com/?q=${encodeURIComponent(hospital.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-700 font-medium hover:text-teal-600 transition-colors leading-snug block"
                                        >
                                            {hospital.address}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-1">
                                        <i className="fa-solid fa-clock text-teal-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 font-bold block mb-0.5">Timing</span>
                                        <span className="text-gray-700 font-medium">
                                            Open 24 Hours
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

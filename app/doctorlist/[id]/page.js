"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const initialDoctors = [
    {
        id: "init-1",
        name: "Matthew Reyes",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "San Cristobal",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 5,
        reviews: 58,
        image: "/img/Mask Group 29.png",
    },
    {
        id: "init-2",
        name: "Kethryne Barlow",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "Zanzibar Town",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 4,
        reviews: 58,
        image: "/img/Mask Group 30.png",
    },
    {
        id: "init-3",
        name: "Robert Jawson",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "Cuzco",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 5,
        reviews: 58,
        image: "/img/Mask Group 31.png",
    },
    {
        id: "init-4",
        name: "Julie Cronk",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "Cuzco",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 5,
        reviews: 58,
        image: "/img/Mask Group 32.png",
    },
    {
        id: "init-5",
        name: "Jessica Lawson",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "Cuzco",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 5,
        reviews: 58,
        image: "/img/Mask Group 29.png",
    },
    {
        id: "init-6",
        name: "Jessica Lawson",
        specialty: "Obstetrics & Gynecology",
        hospital: "University of California San Francisco",
        location: "Cuzco",
        experience: "6–10 Yrs Experience",
        days: "Tue, Wed, Thu, Fri",
        rating: 5,
        reviews: 58,
        image: "/img/Mask Group 30.png",
    },
];

export default function DoctorDetails() {
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch doctor from localStorage using the ID from params
        if (params.id) {
            const doctorsList = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");
            // Combine with initial doctors
            const allDoctors = [...doctorsList, ...initialDoctors];

            // IDs are numbers in the saved object, but params.id is likely a string
            // initial IDs are strings "init-X"
            const foundDoctor = allDoctors.find((d) => d.id.toString() === params.id || d.id === params.id);
            setDoctor(foundDoctor);
        }
        setLoading(false);
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#005963] text-xl font-bold bg-gray-50">
                <i className="fa-solid fa-spinner fa-spin mr-3"></i> Loading Doctor Details...
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
                    <i className="fa-solid fa-user-slash text-6xl text-gray-300 mb-4"></i>
                    <h1 className="text-3xl font-bold mb-4">Doctor Not Found</h1>
                    <p className="text-gray-500 mb-6">The doctor you are looking for does not exist or has been removed.</p>
                    <a href="/doctorlist" className="bg-[#009c9c] text-white px-6 py-2 rounded-full font-bold hover:bg-[#007a7a] transition">
                        Back to Doctors List
                    </a>
                </div>
            </div>
        );
    }

    return (
        <>
            <header
                className="relative"
                style={{
                    height: "400px",
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute inset-0 text-[#005963] "></div>
                <div className="relative flex h-full flex-col items-center justify-center pt-10 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#025965]  drop-shadow-md">
                        Doctor Details
                    </h1>
                    <p className="mt-4 text-[#025965]  font-medium tracking-wide drop-shadow-sm">
                        Home | Doctors | {doctor.name}
                    </p>
                </div>
            </header>

            {/* Doctor Info Card */}
            <section className="flex flex-col items-center justify-center bg-gray-50 py-10 px-4 -mt-20 relative z-20">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-2xl border bg-white p-8 shadow-xl md:flex-row">
                    {/* Left: Doctor Image */}
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                        <div className="relative h-72 w-72 overflow-hidden rounded-xl border-4 border-[#009c9c] shadow-md group">
                            <Image
                                src={doctor.profileImage || "/img/Mask Goup 29.png"}
                                alt={doctor.name}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <h2 className="text-3xl font-bold text-[#005963]">
                                    {doctor.name}
                                </h2>
                                <span className={`px-4 py-1 rounded-full text-sm font-bold ${doctor.availabilityDays ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                    {doctor.availabilityDays ? "Available" : "Status Unknown"}
                                </span>
                            </div>
                            <p className="text-xl font-medium text-[#009c9c] mt-1">
                                {doctor.specialization}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-yellow-400 text-sm">
                                {Array(5).fill(0).map((_, i) => (
                                    <i key={i} className={`fa-solid fa-star ${i < (doctor.rating || 5) ? "" : "text-gray-300"}`}></i>
                                ))}
                                <span className="ml-2 text-gray-600 font-medium">({doctor.reviews || 0} reviews)</span>
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                    <i className="fas fa-venus-mars"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-[#009c9c] uppercase font-semibold">Gender</p>
                                    <span className="font-medium text-[#005963]">{doctor.gender || "Not Specified"}</span>
                                </div>
                            </div>

                            {doctor.dob && (
                                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                        <i className="fas fa-birthday-cake"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#009c9c] uppercase font-semibold">Date of Birth</p>
                                        <span className="font-medium text-[#005963]">{doctor.dob}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-[#009c9c] uppercase font-semibold">Contact</p>
                                    <span className="font-medium text-[#005963]">{doctor.phone || "N/A"}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-[#009c9c] uppercase font-semibold">Email</p>
                                    <span className="font-medium text-[#005963] truncate block">{doctor.email || "N/A"}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-[#009c9c] uppercase font-semibold">City</p>
                                    <span className="font-medium text-[#005963]">{doctor.city || "Online"}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-[#009c9c] uppercase font-semibold">Experience</p>
                                    <span className="font-medium text-[#005963]">{doctor.experience} Years</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>

                        {/* Professional & Clinic Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
                            <div>
                                <h4 className="font-bold text-[#009c9c] mb-4 uppercase text-xs tracking-wider border-b border-gray-200 pb-2">Education & Professional</h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <i className="fas fa-graduation-cap mt-1 text-teal-500"></i>
                                        <div>
                                            <span className="block font-bold text-[#009c9c]">Degree(s)</span>
                                            <span>{doctor.degrees}</span>
                                        </div>
                                    </li>
                                    {doctor.institute && (
                                        <li className="flex gap-3">
                                            <i className="fas fa-university mt-1 text-teal-500"></i>
                                            <div>
                                                <span className="block font-bold text-[#009c9c]">Institute</span>
                                                <span>{doctor.institute}</span>
                                            </div>
                                        </li>
                                    )}
                                    {doctor.licenseNumber && (
                                        <li className="flex gap-3">
                                            <i className="fas fa-id-card mt-1 text-teal-500"></i>
                                            <div>
                                                <span className="block font-bold text-[#009c9c]">License No (PMDC)</span>
                                                <span>{doctor.licenseNumber}</span>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-[#009c9c] mb-4 uppercase text-xs tracking-wider border-b border-gray-200 pb-2">Clinic & Availability</h4>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <i className="fas fa-hospital mt-1 text-teal-500"></i>
                                        <div>
                                            <span className="block font-bold text-[#009c9c]">Clinic Name</span>
                                            <span>{doctor.clinicName || doctor.hospital || "Private Clinic"}</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-location-dot mt-1 text-teal-500"></i>
                                        <div>
                                            <span className="block font-bold text-[#009c9c]">Address</span>
                                            <span>{doctor.clinicAddress || doctor.location || "Address not provided"}</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-calendar-check mt-1 text-teal-500"></i>
                                        <div>
                                            <span className="block font-bold text-[#009c9c]">Availability</span>
                                            <span className="text-[#009c9c] font-semibold">{doctor.availabilityDays || doctor.days}</span>
                                            <span className="block text-xs mt-1 text-gray-500">{doctor.availabilityTimings}</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <i className="fas fa-money-bill-wave mt-1 text-teal-500"></i>
                                        <div>
                                            <span className="block font-bold text-[#009c9c]">Consultation Fee</span>
                                            <span className="text-lg font-bold text-[#009c9c]">PKR {doctor.consultationFee || doctor.fees || "N/A"}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bio */}
                        {doctor.details && (
                            <div className="bg-gradient-to-r from-teal-50 to-white p-6 rounded-xl border border-teal-100 shadow-sm mt-4">
                                <h4 className="font-bold text-[#005963] mb-2 flex items-center gap-2">
                                    <i className="fas fa-user-md"></i> About Dr. {doctor.name}
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-md italic">
                                    "{doctor.details}"
                                </p>
                            </div>
                        )}

                        {/* Book Appointment Button */}
                        <div className="pt-4 flex justify-end">
                            <a href="/book-appointment" className="bg-[#009c9c] hover:bg-[#007a7a] text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300 flex items-center gap-2">
                                <i className="fa-regular fa-calendar-check"></i> Book Appointment
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

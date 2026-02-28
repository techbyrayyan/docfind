"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
        name: "Kethryne Barlow",
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

export default function DoctorList() {
    const [doctorList, setDoctorList] = useState(initialDoctors);

    useEffect(() => {
        const registeredDoctors = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");
        if (registeredDoctors.length > 0) {
            setDoctorList([...registeredDoctors, ...initialDoctors]);
        }
    }, []);

    const deleteDoctor = (id) => {
        if (confirm("Are you sure you want to delete this doctor profile?")) {
            // Update state
            const updatedList = doctorList.filter(doc => doc.id !== id);
            setDoctorList(updatedList);

            // Update localStorage (for registered doctors)
            const registeredDoctors = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");
            const newRegisteredList = registeredDoctors.filter(doc => doc.id !== id);

            // If the filtered list is different (meaning we deleted something from it), save it
            if (newRegisteredList.length !== registeredDoctors.length) {
                localStorage.setItem("registeredDoctors", JSON.stringify(newRegisteredList));
            }
        }
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
                    <h1 className="text-5xl font-bold text-[#005963] uppercase">
                        Doctors
                    </h1>
                    <p className="mt-4 text-[#005963] uppercase">Home | Doctors</p>
                </div>
            </header>

            <div className="container mx-auto px-6 pt-20 pb-20 md:px-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Left Sidebar Filters */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Specialty */}
                        <div className="rounded-md bg-[#FAF5FF] p-5">
                            <h3 className="mb-3 font-semibold text-gray-700">Specialty</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>
                                    <input type="checkbox" className="mr-2" />
                                    ENT
                                </li>
                                <li>
                                    <input type="checkbox" className="mr-2" />
                                    Gastrologist
                                </li>
                                <li>
                                    <input type="checkbox" className="mr-2" />
                                    Cardiologist
                                </li>
                                <li>
                                    <input type="checkbox" className="mr-2" />
                                    Pulmonologist
                                </li>
                                <li>
                                    <input type="checkbox" className="mr-2" />
                                    Urologist
                                </li>
                            </ul>
                        </div>

                        {/* Gender */}
                        <div className="rounded-md bg-[#FAF5FF] p-5">
                            <h3 className="mb-3 font-semibold text-gray-700">Gender</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="mr-2"
                                        defaultChecked
                                    />
                                    No Preference
                                </li>
                                <li>
                                    <input type="radio" name="gender" className="mr-2" />
                                    Male
                                </li>
                                <li>
                                    <input type="radio" name="gender" className="mr-2" />
                                    Female
                                </li>
                            </ul>
                        </div>

                        {/* Years of Experience */}
                        <div className="rounded-md bg-[#FAF5FF] p-5">
                            <h3 className="mb-4 font-semibold text-gray-700">
                                Years of Experience
                            </h3>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                defaultValue="10"
                                className="w-full accent-[#2E95A0]"
                            />
                            <p className="mt-2 text-sm text-gray-600">0 Years - 20 Years</p>
                        </div>
                    </div>

                    {/* Right Doctor Cards */}
                    <div className="space-y-6 lg:col-span-3">
                        {/* Top Section */}
                        <div className="flex items-center justify-between rounded-md bg-[#FAF5FF] px-6 py-3">
                            <p className="font-medium text-gray-600">
                                Showing 1–{doctorList.length > 6 ? 6 : doctorList.length} of {doctorList.length} Results
                            </p>
                            <select className="rounded border border-gray-300 px-3 py-1 text-gray-600">
                                <option>Sort By</option>
                                <option>Experience</option>
                                <option>Rating</option>
                            </select>
                        </div>

                        {/* Doctor Cards */}
                        {doctorList.map((doctor, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-6 rounded-lg bg-white p-5 shadow-sm md:flex-row md:items-start"
                            >
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    width={112}
                                    height={112}
                                    className="h-28 w-28 rounded-lg object-cover"
                                />
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm font-medium text-[#2E95A0]">
                                        {doctor.specialty}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {doctor.hospital}
                                        <br />
                                        {/* Parnassus Campus - removed hardcoded, or check if it exists */}
                                    </p>

                                    <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                                        <p>
                                            <i className="fa-solid fa-location-dot mr-1 text-[#2E95A0]"></i>{" "}
                                            {doctor.location}
                                        </p>
                                        <p>
                                            <i className="fa-solid fa-user-doctor mr-1 text-[#2E95A0]"></i>{" "}
                                            {doctor.experience}
                                        </p>
                                        <p>
                                            <i className="fa-solid fa-calendar-days mr-1 text-[#2E95A0]"></i>{" "}
                                            {doctor.days}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <Link
                                        href={`/doctorlist/${doctor.id}`}
                                        className="rounded bg-[#2E95A0] px-5 py-2 text-white transition hover:bg-[#23737b]"
                                    >
                                        View More
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <i className="fa-regular fa-heart cursor-pointer text-lg text-gray-400 hover:text-[#2E95A0]"></i>
                                        <button
                                            onClick={() => deleteDoctor(doctor.id)}
                                            className="text-[#00acb1] hover:text-black transition"
                                            title="Delete Profile"
                                        >
                                            <i className="fa-solid fa-trash text-lg"></i>
                                        </button>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="mr-1 text-[#facc15]">
                                            {"★".repeat(doctor.rating)}
                                            {"☆".repeat(5 - doctor.rating)}
                                        </div>{" "}
                                        ({doctor.reviews})
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               
            </div>
        </>
    );
}
 
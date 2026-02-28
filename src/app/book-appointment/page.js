"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function BookAppointment() {


    const [formData, setFormData] = useState({
        patientName: "",
        email: "",
        dob: "",
        mobile: "",
        gender: "Male",
        department: "General",
        appointmentDate: "",
        appointmentTime: "",
        doctor: "Dr. Random",
        note: ""
    });

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedPhone = localStorage.getItem("userPhone");

        if (storedName || storedEmail || storedPhone) {
            setFormData(prev => ({
                ...prev,
                patientName: storedName || "",
                email: storedEmail || "",
                mobile: storedPhone || ""
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (gender) => {
        setFormData(prev => ({
            ...prev,
            gender: gender
        }));
    };

    const handleBooking = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.patientName || !formData.appointmentDate || !formData.appointmentTime) {
            alert("Please fill in all required fields (Name, Date, Time).");
            return;
        }

        // Create booking object
        const newBooking = {
            id: Date.now(), // simple ID
            ...formData,
            status: "Booked",
            bookedAt: new Date().toISOString()
        };

        // Save to localStorage
        const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        existingAppointments.push(newBooking);
        localStorage.setItem("appointments", JSON.stringify(existingAppointments));

        alert("Appointment booked successfully!");
        window.location.href = "/history"; // Force reload to fetch fresh data
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
                    <h1 className="text-5xl font-bold text-[#005963]">
                        Book Appoinment
                    </h1>
                    <p className="mt-4 text-[#005963] ">
                        Home | Book Appoinment
                    </p>
                </div>
            </header>

            {/* next section */}
            <section className="flex h-auto w-full flex-col items-center justify-center gap-5 bg-white py-10 lg:flex-row lg:items-start lg:gap-10">
                <div className="mt-10 w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
                    <h2 className="mb-6 text-4xl font-semibold text-teal-800">
                        Your Information:
                    </h2>

                    <form onSubmit={handleBooking}>
                        {/* Row 1 */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    placeholder="Patient name"
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                    required
                                /> 
                                <i className="fa-solid fa-user absolute top-3.5 left-3 text-gray-400"></i>
                            </div>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                />
                                <i className="fa-solid fa-envelope absolute top-3.5 left-3 text-gray-400"></i>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="relative">
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    placeholder="Date of Birth"
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                />
                                <i className="fa-solid fa-calendar absolute top-3.5 left-3 text-gray-400"></i>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                />
                                <i className="fa-solid fa-phone absolute top-3.5 left-3 text-gray-400"></i>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="mb-6">
                            <label className="font-semibold text-gray-700">Gender :</label>
                            <label className="ml-4 text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={formData.gender === "Male"}
                                    onChange={() => handleGenderChange("Male")}
                                    className="mr-1 accent-teal-600"
                                />{" "}
                                Male
                            </label>
                            <label className="ml-4 text-gray-700 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={formData.gender === "Female"}
                                    onChange={() => handleGenderChange("Female")}
                                    className="mr-1 accent-teal-600"
                                />{" "}
                                Female
                            </label>
                        </div>

                        {/* Dropdowns */}
                        <div className="mb-6 space-y-4">
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-400 p-3 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            >
                                <option value="General">Select Category</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Gastrology">Gastrology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                            </select>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="appointmentDate"
                                        value={formData.appointmentDate}
                                        onChange={handleChange}
                                        placeholder="Select Date"
                                        className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                        required
                                    />
                                    <i className="fa-solid fa-calendar absolute top-3.5 left-3 text-gray-400"></i>
                                </div>

                                <div className="relative">
                                    <input
                                        type="time"
                                        name="appointmentTime"
                                        value={formData.appointmentTime}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                        required
                                    />
                                    <i className="fa-solid fa-clock absolute top-3.5 left-3 text-gray-400"></i>
                                </div>
                            </div>

                            <div className="relative">
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                >
                                    <option value="">Select Doctor</option>
                                    <option value="Dr. Beatrice Willis">Dr. Beatrice Willis</option>
                                    <option value="Dr. Muhammad Tufail">Dr. Muhammad Tufail</option>
                                    <option value="Dr. John Doe">Dr. John Doe</option>
                                </select>
                                <i className="fa-solid fa-user-doctor absolute top-3.5 left-3 text-gray-400"></i>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Note to the doctor for disease"
                                    rows={3}
                                    className="w-full rounded-md border border-gray-400 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                ></textarea>
                                <i className="fa-regular fa-clipboard absolute top-3.5 left-3 text-gray-400"></i>
                            </div>
                        </div>

                        {/* Checkbox + Button */}
                        <div className="mb-6 flex items-center">
                            <input type="checkbox" className="mr-2 text-teal-600" required />
                            <p className="text-sm text-gray-600">
                                I accept{" "}
                                <span className="cursor-pointer text-teal-600 underline">
                                    terms and conditions
                                </span>{" "}
                                and general policy
                            </p>
                        </div>

                        <button type="submit" className="w-full rounded-md bg-teal-600 py-3 font-semibold text-white transition-all hover:bg-teal-700">
                            Confirm Booking
                        </button>
                    </form>
                </div>

                {/* right section - Live Summary */}
                <div className="mt-10 h-auto w-full max-w-[300px] overflow-hidden rounded-lg bg-white shadow-md self-start">
                    {/* Header */}
                    <div className="bg-[#e6f1f3] px-4 py-2 font-semibold text-gray-700">
                        Booking Summary
                    </div>

                    {/* Body */}
                    <div className="space-y-2 p-4 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Name</span>
                            <span className="truncate max-w-[150px]">{formData.patientName || "Pending..."}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Date</span>
                            <span>{formData.appointmentDate || "Pending..."}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Time</span>
                            <span>
                                {formData.appointmentTime ? (() => {
                                    const [hours, minutes] = formData.appointmentTime.split(":");
                                    const h = parseInt(hours, 10);
                                    const m = parseInt(minutes, 10);
                                    const ampm = h >= 12 ? "PM" : "AM";
                                    const formattedH = h % 12 || 12;
                                    const formattedM = m < 10 ? `0${m}` : m;
                                    return `${formattedH}:${formattedM} ${ampm}`;
                                })() : "Pending..."}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Mobile</span>
                            <span>{formData.mobile || "Pending..."}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Gender</span>
                            <span>{formData.gender}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Department</span>
                            <span>{formData.department === "General" ? "Default" : formData.department}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Doctor</span>
                            <span className="truncate max-w-[150px]">{formData.doctor || "Any"}</span>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="px-4 pb-4">
                        <button
                            onClick={handleBooking}
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00b3b3] py-2 font-medium text-white transition hover:bg-[#009999]"
                        >
                            Booked
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

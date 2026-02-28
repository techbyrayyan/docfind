"use client";

import { useState } from "react";
import BookingSummary from "../../components/BookingSummary";

export default function Contact() {
    const [contactData, setContactData] = useState({
        patientName: "",
        email: "",
        dob: "",
        mobile: "",
        gender: "",
        category: "",
        appointmentDate: "",
        doctor: "",
        note: "",
        agreed: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox" && name === "gender") {
            // Handle gender checkboxes to act like radio buttons
            setContactData((prev) => ({
                ...prev,
                gender: checked ? value : ""
            }));
        } else if (type === "checkbox") {
            setContactData((prev) => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setContactData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Explicit handler for gender to ensure mutual exclusion if using two checkboxes
    const handleGenderChange = (genderValue) => {
        setContactData((prev) => ({
            ...prev,
            gender: genderValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!contactData.agreed) {
            alert("Please accept the terms and conditions.");
            return;
        }

        console.log("Submitting Contact Data:", contactData);
        localStorage.setItem("contactFormData", JSON.stringify(contactData));
        alert("Booking confirmed! Data saved to local storage.");

        // Reset form
        setContactData({
            patientName: "",
            email: "",
            dob: "",
            mobile: "",
            gender: "",
            category: "",
            appointmentDate: "",
            doctor: "",
            note: "",
            agreed: false
        });
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
                        Contact
                    </h1>
                    <p className="mt-4 text-[#005963] uppercase">Home | Contact</p>
                </div>
            </header>

            {/* Next Section */}
            <section className="h-220 flex w-full flex-col items-center justify-center gap-5 bg-white py-10 lg:flex-row lg:items-start">
                <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
                    <h2 className="mb-6 text-lg font-semibold text-teal-800">
                        Your Information:
                    </h2>

                    {/* Row 1 */}
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="relative">
                            <input
                                type="text"
                                name="patientName"
                                value={contactData.patientName}
                                onChange={handleChange}
                                placeholder="Patient name"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                required
                            />
                            <i className="fa-solid fa-user absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={contactData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                required
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
                                value={contactData.dob}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            />
                            <i className="fa-solid fa-calendar absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="mobile"
                                value={contactData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                required
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
                                value="Male"
                                checked={contactData.gender === "Male"}
                                onChange={handleChange}
                                className="rounded text-teal-600 focus:ring-0"
                            />{" "}
                            Male
                        </label>
                        <label className="ml-4 text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={contactData.gender === "Female"}
                                onChange={handleChange}
                                className="rounded text-teal-600 focus:ring-0"
                            />{" "}
                            Female
                        </label>
                    </div>

                    {/* Dropdowns */}
                    <div className="mb-6 space-y-4">
                        <select
                            name="category"
                            value={contactData.category}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 p-3 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="General">General</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dental">Dental</option>
                        </select>

                        <div className="relative">
                            <input
                                type="date"
                                name="appointmentDate"
                                value={contactData.appointmentDate}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            />
                            <i className="fa-solid fa-calendar absolute top-3.5 left-3 text-gray-400"></i>
                        </div>

                        <div className="relative">
                            <select
                                name="doctor"
                                value={contactData.doctor}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            >
                                <option value="">Select Doctor</option>
                                <option value="Dr. Smith">Dr. Smith</option>
                                <option value="Dr. Sarah">Dr. Sarah</option>
                            </select>
                            <i className="fa-solid fa-user-doctor absolute top-3.5 left-3 text-gray-400"></i>
                        </div>

                        <div className="relative">
                            <textarea
                                name="note"
                                value={contactData.note}
                                onChange={handleChange}
                                placeholder="Note to the doctor (optional)"
                                rows={3}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            ></textarea>
                            <i className="fa-regular fa-clipboard absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                    </div>

                    {/* Checkbox + Button */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            name="agreed"
                            className="mr-2 text-teal-600"
                            checked={contactData.agreed}
                            onChange={handleChange}
                        />
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

                {/* Right Section */}
                <BookingSummary className="mt-10 mb-10 w-[300px] lg:mb-0" />
            </section>
        </>
    );
}

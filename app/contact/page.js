"use client";

import { useState, useEffect } from "react";
import BookingSummary from "../../components/BookingSummary";

const initialDoctorsList = [
    { name: "Matthew Reyes" },
    { name: "Kethryne Barlow" },
    { name: "Robert Jawson" },
    { name: "Julie Cronk" },
    { name: "Jessica Lawson" }
];

export default function Contact() {
    const [contactData, setContactData] = useState({
        patientName: "",
        age: "",
        reference: "",
        mobile: "",
        address: "",
        gender: "",
        category: "",
        appointmentDate: "",
        doctor: "",
        note: "",
        agreed: false
    });
    const [availableDoctors, setAvailableDoctors] = useState([]);

    useEffect(() => {
        const registeredDoctors = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");
        const combinedDoctors = [...registeredDoctors, ...initialDoctorsList];
        
        // Ensure unique names in case of duplicates
        const uniqueDoctors = Array.from(new Set(combinedDoctors.map(doc => doc.name)))
                                   .map(name => ({ name }));
        setAvailableDoctors(uniqueDoctors);
    }, []);

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

        const generatedPatientNumber = "PN-" + Math.floor(100000 + Math.random() * 900000);
        const generatedCaseNumber = "CN-" + Math.floor(10000 + Math.random() * 90000);
        const finalReference = contactData.reference.trim() === "" ? "No reference" : contactData.reference;

        const dataToSave = {
            ...contactData,
            reference: finalReference,
            patientNumber: generatedPatientNumber,
            caseNumber: generatedCaseNumber
        };

        console.log("Submitting Contact Data:", dataToSave);
        localStorage.setItem("contactFormData", JSON.stringify(dataToSave));
        alert("Booking confirmed!\nPatient No: " + generatedPatientNumber + "\nCase No: " + generatedCaseNumber);

        // Reset form
        setContactData({
            patientName: "",
            age: "",
            reference: "",
            mobile: "",
            address: "",
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
                                placeholder="Patient Name"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                required
                            />
                            <i className="fa-solid fa-user absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                name="age"
                                value={contactData.age}
                                onChange={handleChange}
                                placeholder="Age"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                                required
                            />
                            <i className="fa-solid fa-child absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                        <div className="relative">
                            <input
                                type="text"
                                name="reference"
                                value={contactData.reference}
                                onChange={handleChange}
                                placeholder="Reference (Optional)"
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            />
                            <i className="fa-solid fa-users absolute top-3.5 left-3 text-gray-400"></i>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mb-4 relative">
                        <input
                            type="text"
                            name="address"
                            value={contactData.address}
                            onChange={handleChange}
                            placeholder="Home Address (Optional)"
                            className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                        />
                        <i className="fa-solid fa-location-dot absolute top-3.5 left-3 text-gray-400"></i>
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
                            <option value="ENT">ENT</option>
                            <option value="Gastrologist">Gastrologist</option>
                            <option value="Pulmonologist">Pulmonologist</option>
                            <option value="Urologist">Urologist</option>
                            <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                        </select>

                        <div className="relative">
                            <input
                                type="date"
                                name="appointmentDate"
                                value={contactData.appointmentDate}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none text-gray-500"
                                required
                            />
                            <i className="fa-solid fa-calendar-check absolute top-3.5 left-3 text-gray-400"></i>
                        </div>

                        <div className="relative">
                            <select
                                name="doctor"
                                value={contactData.doctor}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 pl-10 focus:ring-1 focus:ring-teal-600 focus:outline-none"
                            >
                                <option value="">Select Doctor</option>
                                {availableDoctors.map((doc, index) => (
                                    <option key={index} value={doc.name}>{doc.name}</option>
                                ))}
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

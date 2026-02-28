"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



const medicalDegrees = [
    "MBBS", "BDS", "BAMS", "BHMS", "BUMS", "Pharm-D", "DPT", "BS Nursing",
    "MD", "MS", "MDS", "FCPS", "MRCP", "FRCS", "MCPS", "DM", "MPhil",
    "MPH", "PhD", "DA", "DCH", "DGO", "DMRT", "DMRD", "FACC", "FACP", "FICS"
];

const medicalSpecializations = [
    "General Physician", "Internal Medicine", "Family Medicine", "Cardiology",
    "Interventional Cardiology", "Neurology", "Neurosurgery", "Orthopedics",
    "Orthopedic Surgery", "Dermatology", "Venereology", "ENT", "Otolaryngology",
    "Ophthalmology", "Gynecology", "Obstetrics", "Pediatrician", "Neonatology",
    "Psychiatry", "Psychology", "Dentistry", "Oral Surgery", "Endodontics",
    "Orthodontics", "Periodontology", "Prosthodontics", "Urology", "Nephrology",
    "Gastroenterology", "Hepatology", "Pulmonology", "Chest Specialist",
    "Endocrinology", "Diabetology", "Rheumatology", "Oncology", "Medical Oncology",
    "Surgical Oncology", "Radiation Oncology", "General Surgery", "Laparoscopic Surgery",
    "Plastic Surgery", "Cosmetic Surgery", "Reconstructive Surgery", "Cardiothoracic Surgery",
    "Vascular Surgery", "Pediatric Surgery", "Bariatric Surgery", "Anesthesiology",
    "Pain Management", "Radiology", "Interventional Radiology", "Nuclear Medicine",
    "Pathology", "Hematology", "Immunology", "Microbiology", "Infectious Disease",
    "Emergency Medicine", "Critical Care", "Intensive Care", "Sports Medicine",
    "Physical Medicine", "Rehabilitation Medicine", "Physiotherapy", "Occupational Therapy",
    "Speech Therapy", "Audiology", "Nutritionist", "Dietitian", "Public Health",
    "Preventive Medicine", "Geriatrics", "Palliative Care", "Forensic Medicine",
    "Sexual Health", "Andrology", "Reproductive Medicine", "Infertility Specialist",
    "IVF Specialist", "Allergy Specialist", "Asthma Specialist", "Sleep Medicine",
    "Genetic Medicine", "Tropical Medicine", "Travel Medicine", "Aesthetic Medicine",
    "Regenerative Medicine"
];

const medicalUniversities = [
    "Aga Khan University",
    "King Edward Medical University",
    "University of Health Sciences",
    "Dow University of Health Sciences",
    "Liaquat University of Medical & Health Sciences",
    "Khyber Medical University",
    "Shaheed Zulfiqar Ali Bhutto Medical University",
    "Peoples University of Medical & Health Sciences for Women",
    "Fatima Jinnah Medical University",
    "Nishtar Medical University",
    "Rawalpindi Medical University",
    "Faisalabad Medical University",
    "University of Child Health Sciences",
    "Ziauddin University",
    "Baqai Medical University",
    "Jinnah Sindh Medical University",
    "National University of Medical Sciences (NUMS)",
    "Gomal Medical College (University)",
    "Ayub Medical College",
    "Saidu Medical College",
    "Allama Iqbal Medical College",
    "Quaid-e-Azam Medical College",
    "Chandka Medical College",
    "Bolan Medical College",
    "Khawaja Muhammad Safdar Medical College",
    "Nawaz Sharif Medical College",
    "Sargodha Medical College",
    "Sheikh Zayed Medical College",
    "CMH Lahore Medical College",
    "Federal Medical & Dental College"
];

const availabilityOptions = [
    "Mon - Fri",
    "Mon - Sat",
    "Mon - Sun",
    "Weekends Only",
    "Daily",
    "Custom"
];

const initialFormState = {
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    city: "",
    degrees: "",
    institute: "",
    graduationYear: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
    consultationFee: "",
    availabilityDays: "",
    availabilityTimings: "",
    details: "",
    proofDocuments: [], // Array of { name, data }
    profileImage: null,
    profileImageName: ""
};

export default function DoctorDashboard() {
    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        // We are simulating a "Register New" flow mostly, but we can check if a "current doctor session" exists.
        // For simplicity in this demo, we will treat this form as "Create/Edit your profile".
        const storedDoctor = localStorage.getItem("currentDoctorProfile");
        if (storedDoctor) {
            const parsedData = JSON.parse(storedDoctor);
            // Ensure proofDocuments is an array (handle migration from old data)
            if (!parsedData.proofDocuments) {
                parsedData.proofDocuments = [];
                // If old single document exists, move it to array
                if (parsedData.proofDocument) {
                    parsedData.proofDocuments.push({
                        name: parsedData.proofDocumentName || "Degree Proof",
                        data: parsedData.proofDocument
                    });
                }
            }
            setFormData({ ...initialFormState, ...parsedData });
            setIsRegistered(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (name === "proofDocuments") {
                    setFormData(prev => ({
                        ...prev,
                        proofDocuments: [...prev.proofDocuments, { name: file.name, data: reader.result }]
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        [name]: reader.result,
                        [`${name}Name`]: file.name
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeProof = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            proofDocuments: prev.proofDocuments.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.proofDocuments.length === 0) {
            alert("Please upload at least one Medical Degree/License proof to register.");
            return;
        }

        // Create the doctor object in the format expected by the Doctor List page
        const newDoctorProfile = {
            id: Date.now(), // Simple unique ID
            name: formData.name,
            specialty: formData.specialization,
            hospital: formData.clinicName || formData.degrees, // Use Clinic Name or Degree as subtitle
            location: formData.city || formData.clinicAddress || "Online / Remote",
            experience: formData.experience,
            days: formData.availabilityDays || "Mon - Sat",
            fees: formData.consultationFee,
            rating: 5,
            reviews: 0,
            image: formData.profileImage || "/img/Mask Goup 29.png", // Use uploaded image or default
            ...formData // Keep original fields too
        };

        // Get existing doctors list
        const existingDoctors = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");

        // Add new doctor to the TOP of the list
        const updatedList = [newDoctorProfile, ...existingDoctors];

        // Save to localStorage
        localStorage.setItem("registeredDoctors", JSON.stringify(updatedList));

        // Also save as "current" for this dashboard view
        localStorage.setItem("currentDoctorProfile", JSON.stringify(formData));

        setIsRegistered(true);
        alert("Profile registered and published to Doctors List!");
        router.push("/doctorlist"); // Redirect to see the change
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans  ">
            <main className="container mx-auto px-6 py-10 ">
                <div className="max-w-4xl mx-auto mt-30 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-[#2e95a0]">
                                    {isRegistered ? "Manage Your Profile" : "Doctor Registration"}
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    {isRegistered
                                        ? "Update your professional details below."
                                        : "Join our platform to reach more patients."}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <i className="fa-solid fa-user-doctor text-6xl text-[#009c9c] opacity-20"></i>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Picture Upload */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative w-32 h-32 mb-4">
                                    {formData.profileImage ? (
                                        <img
                                            src={formData.profileImage}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover border-4 border-[#009c9c] shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-300">
                                            <i className="fa-solid fa-user text-4xl text-gray-400"></i>
                                        </div>
                                    )}
                                    <label className="absolute bottom-0 right-0 bg-[#009c9c] text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-[#007a7a] transition">
                                        <i className="fa-solid fa-camera text-sm"></i>
                                        <input
                                            type="file"
                                            name="profileImage"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500">Upload Profile Picture</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Doctor Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Dr. John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition bg-white"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Karachi"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="doctor@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+92 300 1234567"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Medical Degrees */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Degree(s) <span className="text-red-500">*</span></label>
                                    <select
                                        name="degrees"
                                        value={formData.degrees}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select your degree</option>
                                        {medicalDegrees.map((degree) => (
                                            <option key={degree} value={degree}>
                                                {degree}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Institute */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Institute / University</label>
                                    <select
                                        name="institute"
                                        value={formData.institute}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition bg-white"
                                    >
                                        <option value="">Select Institute / University</option>
                                        {medicalUniversities.map((uni) => (
                                            <option key={uni} value={uni}>
                                                {uni}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Specialization */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization <span className="text-red-500">*</span></label>
                                    <select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select your specialization</option>
                                        {medicalSpecializations.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years) <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="e.g. 10 Years"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                        required
                                    />
                                </div>

                                {/* License Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">PMDC / License Number</label>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        placeholder="e.g. 12345-P"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* Clinic Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic / Hospital Name</label>
                                    <input
                                        type="text"
                                        name="clinicName"
                                        value={formData.clinicName}
                                        onChange={handleChange}
                                        placeholder="e.g. City Care Clinic"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* Clinic Address */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic / Hospital Address</label>
                                    <input
                                        type="text"
                                        name="clinicAddress"
                                        value={formData.clinicAddress}
                                        onChange={handleChange}
                                        placeholder="Full address of your clinic"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* Consultation Fee */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee (PKR)</label>
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        value={formData.consultationFee}
                                        onChange={handleChange}
                                        placeholder="e.g. 2000"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* Availability Days */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Days</label>
                                    <select
                                        name="availabilityDays"
                                        value={formData.availabilityDays}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition bg-white"
                                    >
                                        <option value="">Select Availability</option>
                                        {availabilityOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Timings */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Timings</label>
                                    <input
                                        type="text"
                                        name="availabilityTimings"
                                        value={formData.availabilityTimings}
                                        onChange={handleChange}
                                        placeholder="e.g. 5:00 PM - 9:00 PM"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition"
                                    />
                                </div>

                                {/* Proof Document Uploads */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Medical Licenses / Degrees (Multiple) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center justify-center w-full mb-4">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-3"></i>
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF</p>
                                            </div>
                                            <input
                                                type="file"
                                                name="proofDocuments"
                                                className="hidden"
                                                accept="image/*,.pdf"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>

                                    {/* Uploaded Documents List */}
                                    {formData.proofDocuments.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-gray-700">Uploaded Degrees:</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {formData.proofDocuments.map((doc, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                                        <div className="flex items-center space-x-3 overflow-hidden">
                                                            <i className="fa-solid fa-file-invoice text-[#009c9c]"></i>
                                                            <span className="text-sm text-gray-600 truncate">{doc.name}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeProof(index)}
                                                            className="text-gray-400 hover:text-red-500 transition focus:outline-none"
                                                            title="Delete Degree"
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Any other necessary professional details */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Details / Bio</label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Briefly describe your professional background, achievements, and approach to patient care."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#009c9c] focus:ring-2 focus:ring-[#009c9c] focus:ring-opacity-20 outline-none transition resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#009c9c] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#007a7a] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {isRegistered ? "Save Changes" : "Register Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

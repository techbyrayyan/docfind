"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("personal");
    const [saveMessage, setSaveMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        emergencyContact: "",
        emergencyName: "",
        allergies: "",
        chronicConditions: "",
        currentMedications: "",
        insuranceProvider: "",
        insuranceNumber: "",
        bio: "",
    });

    const [displayData, setDisplayData] = useState({
        username: "Rayyan Ansari",
        email: "techbyrayyan@gmail.com",
        phone: "+92 322 435323 23",
        address: "Opposite Al Safina Mall Near Shadman Market, Lahore",
    });

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedPhone = localStorage.getItem("userPhone");
        const storedAddress = localStorage.getItem("userAddress");
        const storedFirstName = localStorage.getItem("userFirstName");
        const storedLastName = localStorage.getItem("userLastName");
        const storedCity = localStorage.getItem("userCity");
        const storedCountry = localStorage.getItem("userCountry");
        const storedPostalCode = localStorage.getItem("userPostalCode");
        const storedDOB = localStorage.getItem("userDOB");
        const storedGender = localStorage.getItem("userGender");
        const storedBloodGroup = localStorage.getItem("userBloodGroup");
        const storedEmergencyContact = localStorage.getItem("userEmergencyContact");
        const storedEmergencyName = localStorage.getItem("userEmergencyName");
        const storedAllergies = localStorage.getItem("userAllergies");
        const storedConditions = localStorage.getItem("userChronicConditions");
        const storedMedications = localStorage.getItem("userCurrentMedications");
        const storedInsuranceProvider = localStorage.getItem("userInsuranceProvider");
        const storedInsuranceNumber = localStorage.getItem("userInsuranceNumber");
        const storedBio = localStorage.getItem("userBio");

        const loadedData = {
            username: storedName || "Rayyan Ansari",
            firstName: storedFirstName || "Rayyan",
            lastName: storedLastName || "Ansari",
            email: storedEmail || "techbyrayyan@gmail.com",
            phone: storedPhone || "+92 322 435323 23",
            address: storedAddress || "Opposite Al Safina Mall Near Shadman Market, Lahore",
            city: storedCity || "Lahore",
            country: storedCountry || "Pakistan",
            postalCode: storedPostalCode || "54000",
            dateOfBirth: storedDOB || "",
            gender: storedGender || "",
            bloodGroup: storedBloodGroup || "",
            emergencyContact: storedEmergencyContact || "",
            emergencyName: storedEmergencyName || "",
            allergies: storedAllergies || "",
            chronicConditions: storedConditions || "",
            currentMedications: storedMedications || "",
            insuranceProvider: storedInsuranceProvider || "",
            insuranceNumber: storedInsuranceNumber || "",
            bio: storedBio || "",
        };

        setFormData(loadedData);
        setDisplayData({
            username: loadedData.username,
            email: loadedData.email,
            phone: loadedData.phone,
            address: loadedData.address,
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("userName", formData.username);
        localStorage.setItem("userFirstName", formData.firstName);
        localStorage.setItem("userLastName", formData.lastName);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userPhone", formData.phone);
        localStorage.setItem("userAddress", formData.address);
        localStorage.setItem("userCity", formData.city);
        localStorage.setItem("userCountry", formData.country);
        localStorage.setItem("userPostalCode", formData.postalCode);
        localStorage.setItem("userDOB", formData.dateOfBirth);
        localStorage.setItem("userGender", formData.gender);
        localStorage.setItem("userBloodGroup", formData.bloodGroup);
        localStorage.setItem("userEmergencyContact", formData.emergencyContact);
        localStorage.setItem("userEmergencyName", formData.emergencyName);
        localStorage.setItem("userAllergies", formData.allergies);
        localStorage.setItem("userChronicConditions", formData.chronicConditions);
        localStorage.setItem("userCurrentMedications", formData.currentMedications);
        localStorage.setItem("userInsuranceProvider", formData.insuranceProvider);
        localStorage.setItem("userInsuranceNumber", formData.insuranceNumber);
        localStorage.setItem("userBio", formData.bio);

        setDisplayData({
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
        });

        setSaveMessage("Profile updated successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
    };

    const handleBackToProfile = (e) => {
        e.preventDefault();
        router.push("/user-panel");
    };

    const sections = [
        { id: "personal", label: "Personal Info", icon: "fa-solid fa-user" },
        { id: "contact", label: "Contact & Address", icon: "fa-solid fa-address-book" },
        { id: "medical", label: "Medical Info", icon: "fa-solid fa-notes-medical" },
        { id: "insurance", label: "Insurance", icon: "fa-solid fa-shield-halved" },
    ];

    const inputClass =
        "mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-[#2E95A0] focus:outline-none bg-gray-50/50 hover:bg-white transition-colors";
    const labelClass = "text-xs font-semibold text-gray-500 uppercase tracking-wider";

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
                <div className="absolute top-70 left-1/2 flex w-[90%] max-w-[600px] -translate-x-1/2 transform flex-col items-center gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:flex-row">
                    <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble.png')] bg-repeat opacity-10"></div>

                    <div className="relative z-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00A0A0] bg-teal-50 text-4xl font-bold text-[#00A0A0]">
                            <span className="text-2xl">{formData.firstName?.[0]}{formData.lastName?.[0]}</span>
                        </div>
                    </div>

                    <div className="z-10 text-center sm:text-left">
                        <h2 className="mb-1 text-xl font-semibold text-[#005963]">
                            {displayData.username}
                        </h2>
                        <div className="mb-1 flex items-center justify-center space-x-2 text-sm text-gray-500 sm:justify-start">
                            <i className="fa-solid fa-envelope text-xs text-[#00A0A0]"></i>
                            <span>{displayData.email}</span>
                            <span className="text-gray-400">•</span>
                            <span>{displayData.phone}</span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500 sm:justify-start">
                            <i className="fa-solid fa-location-dot text-xs text-[#00A0A0] mr-1.5"></i>
                            <span>{displayData.address}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Edit Form Section */}
            <div className="w-full bg-gray-100 px-4 py-10">
                <div className="max-w-3xl mx-auto">

                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${activeSection === s.id
                                        ? "bg-[#2E95A0] text-white shadow-md shadow-teal-200"
                                        : "bg-white text-gray-500 border border-gray-200 hover:border-[#2E95A0] hover:text-[#2E95A0]"
                                    }`}
                            >
                                <i className={`${s.icon} text-[10px]`}></i>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Success Message */}
                    {saveMessage && (
                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-pulse">
                            <i className="fa-solid fa-check-circle"></i>
                            {saveMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">

                            {/* PERSONAL INFO */}
                            {activeSection === "personal" && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                            <i className="fa-solid fa-user text-xs text-[#2E95A0]"></i>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#00464B]">Personal Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelClass}>First Name</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} placeholder="Enter first name" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Last Name</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="Enter last name" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Display Name / Username</label>
                                        <input type="text" name="username" value={formData.username} onChange={handleChange} className={inputClass} placeholder="Enter display name" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelClass}>Date of Birth</label>
                                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                                <option value="prefer-not-to-say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows="3"
                                            className={inputClass + " resize-none"}
                                            placeholder="Tell us about yourself..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {/* CONTACT & ADDRESS */}
                            {activeSection === "contact" && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <i className="fa-solid fa-address-book text-xs text-blue-500"></i>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#00464B]">Contact & Address</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelClass}>Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="Enter email" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Phone Number</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Enter phone number" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Street Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="Enter your address" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div>
                                            <label className={labelClass}>City</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="City" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Country</label>
                                            <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClass} placeholder="Country" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Postal Code</label>
                                            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} placeholder="Postal Code" />
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <i className="fa-solid fa-phone-volume text-xs text-[#2E95A0]"></i>
                                            <span className="text-xs font-bold text-[#00464B]">Emergency Contact</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Contact Name</label>
                                                <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className={inputClass + " bg-white"} placeholder="Emergency contact name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Contact Number</label>
                                                <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className={inputClass + " bg-white"} placeholder="Emergency phone number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* MEDICAL INFO */}
                            {activeSection === "medical" && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                            <i className="fa-solid fa-notes-medical text-xs text-red-400"></i>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#00464B]">Medical Information</h2>
                                    </div>

                                    <div className="p-4 rounded-xl bg-red-50/30 border border-red-100 mb-2">
                                        <div className="flex items-start gap-2">
                                            <i className="fa-solid fa-circle-info text-xs text-red-400 mt-0.5"></i>
                                            <p className="text-[11px] text-gray-600 leading-relaxed">
                                                This information helps doctors provide better care. All medical data is kept strictly confidential.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Blood Group</label>
                                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={inputClass}>
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Known Allergies</label>
                                        <textarea
                                            name="allergies"
                                            value={formData.allergies}
                                            onChange={handleChange}
                                            rows="2"
                                            className={inputClass + " resize-none"}
                                            placeholder="e.g., Penicillin, Peanuts, Dust..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Chronic Conditions</label>
                                        <textarea
                                            name="chronicConditions"
                                            value={formData.chronicConditions}
                                            onChange={handleChange}
                                            rows="2"
                                            className={inputClass + " resize-none"}
                                            placeholder="e.g., Diabetes, Hypertension, Asthma..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Current Medications</label>
                                        <textarea
                                            name="currentMedications"
                                            value={formData.currentMedications}
                                            onChange={handleChange}
                                            rows="2"
                                            className={inputClass + " resize-none"}
                                            placeholder="List any medications you are currently taking..."
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            {/* INSURANCE */}
                            {activeSection === "insurance" && (
                                <div className="space-y-5">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <i className="fa-solid fa-shield-halved text-xs text-indigo-500"></i>
                                        </div>
                                        <h2 className="text-lg font-bold text-[#00464B]">Insurance Details</h2>
                                    </div>

                                    <div className="p-4 rounded-xl bg-indigo-50/30 border border-indigo-100 mb-2">
                                        <div className="flex items-start gap-2">
                                            <i className="fa-solid fa-circle-info text-xs text-indigo-400 mt-0.5"></i>
                                            <p className="text-[11px] text-gray-600 leading-relaxed">
                                                Adding your insurance details helps streamline the billing process during hospital visits.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Insurance Provider</label>
                                        <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} className={inputClass} placeholder="e.g., State Life, EFU, Jubilee" />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Insurance / Policy Number</label>
                                        <input type="text" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} className={inputClass} placeholder="Enter your policy number" />
                                    </div>

                                    <div className="bg-gradient-to-br from-[#00464B] to-[#2E95A0] rounded-xl p-5 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 opacity-10 scale-125">
                                            <i className="fa-solid fa-id-card text-6xl p-3"></i>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-[9px] text-teal-200 font-bold uppercase tracking-widest mb-2">Insurance Card</p>
                                            <h3 className="text-sm font-bold mb-1">{formData.insuranceProvider || "Not Provided"}</h3>
                                            <p className="text-[11px] text-teal-100">Policy: {formData.insuranceNumber || "N/A"}</p>
                                            <p className="text-[11px] text-teal-100 mt-1">Holder: {formData.username}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleBackToProfile}
                                    className="text-sm text-gray-500 hover:text-[#2E95A0] font-medium transition-colors"
                                >
                                    <i className="fa-solid fa-arrow-left mr-1.5"></i> Back to Dashboard
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <i className="fa-solid fa-rotate-left mr-1.5 text-xs"></i>Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-xl bg-[#2E95A0] text-white text-sm font-bold hover:bg-[#23848f] shadow-md shadow-teal-200 hover:shadow-lg transition-all"
                                    >
                                        <i className="fa-solid fa-check mr-1.5 text-xs"></i>Save Changes
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>

                    {/* Profile Completion */}
                    <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-[#00464B]">Profile Completion</h3>
                            <span className="text-xs font-bold text-[#2E95A0]">
                                {Math.round(
                                    (Object.values(formData).filter((v) => v && v.trim() !== "").length /
                                        Object.keys(formData).length) *
                                    100
                                )}%
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#2E95A0] to-[#5EC6CE] rounded-full transition-all duration-500"
                                style={{
                                    width: `${Math.round(
                                        (Object.values(formData).filter((v) => v && v.trim() !== "").length /
                                            Object.keys(formData).length) *
                                        100
                                    )}%`,
                                }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2">
                            Complete all fields for a better experience with your healthcare providers.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}

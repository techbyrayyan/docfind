"use client";

import { useEffect, useState } from "react";
import { cityHospitalsData, getSyncedHospitals } from "@/data/cityHospitalsData";

function HospitalDataPage() {
    const [hospitals, setHospitals] = useState(cityHospitalsData);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setHospitals(getSyncedHospitals());

        const handleStorageChange = (e) => {
            if (e.key === "docfind_hospitals" && e.newValue) {
                setHospitals(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 px-6 md:px-10 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-[#00464B] tracking-tight mb-2">
                        Hospital Data Page
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Complete dataset of top-rated medical facilities across major Pakistani cities.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {Object.entries(hospitals).map(([cityName, cityInfo]) => (
                        <div key={cityName} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-[#2E95A0] flex items-center justify-center text-white shadow-lg shadow-teal-100">
                                            <i className="fa-solid fa-city"></i>
                                        </div>
                                        <h2 className="text-3xl font-bold text-[#00464B]">{cityName}</h2>
                                    </div>
                                    <p className="text-gray-600 italic max-w-2xl leading-relaxed">
                                        {cityInfo.description}
                                    </p>
                                </div>
                                <div className="bg-teal-50 px-6 py-4 rounded-2xl border border-teal-100 text-center">
                                    <p className="text-[10px] font-black text-[#2E95A0] uppercase tracking-widest mb-1">Total Hospitals</p>
                                    <p className="text-3xl font-black text-[#00464B]">{cityInfo.hospitals.length}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cityInfo.hospitals.map((hospital) => (
                                    <div key={hospital.id} className="group/card bg-white p-5 rounded-2xl border border-gray-100 hover:border-[#2E95A0] hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-bold py-1 px-3 rounded-full bg-teal-50 text-[#2E95A0] uppercase tracking-wider">
                                                {hospital.type}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                                                <span className="text-xs font-bold text-gray-700">{hospital.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-[#00464B] mb-1 group-hover/card:text-[#2E95A0] transition-colors line-clamp-1">
                                            {hospital.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <span className="line-clamp-1">{hospital.address}</span>
                                        </div>

                                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-bed text-[#2E95A0]/50"></i>
                                                <span>{hospital.beds} Beds</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <i className="fa-solid fa-user-doctor text-[#2E95A0]/50"></i>
                                                <span>{hospital.doctors} Doctors</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HospitalDataPage;

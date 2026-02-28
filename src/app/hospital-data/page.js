"use client";

import React, { useEffect, useState } from "react";
import { cityHospitalsData, getSyncedHospitals } from "@/app/data/cityHospitalsData";

export default function HospitalDataPage() {
    const [hospitals, setHospitals] = useState(cityHospitalsData);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const data = getSyncedHospitals();
        if (data) setHospitals(data);

        const handleUpdate = (e) => {
            if (e.key === "docfind_hospitals" && e.newValue) {
                try {
                    setHospitals(JSON.parse(e.newValue));
                } catch (err) {
                    console.error(err);
                }
            }
        };

        window.addEventListener("storage", handleUpdate);
        return () => window.removeEventListener("storage", handleUpdate);
    }, []);

    if (!isClient) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 px-6 md:px-10 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-[#00464B] tracking-tight mb-2">
                        Hospital Data Page
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Complete dataset of top-rated medical facilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {Object.entries(hospitals).map(([cityName, cityInfo]) => (
                        <div key={cityName} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-[#00464B]">
                                        {cityName}
                                    </h2>
                                    <p className="text-gray-600 italic">
                                        {cityInfo.description}
                                    </p>
                                </div>

                                <div className="bg-teal-50 px-6 py-4 rounded-2xl border border-teal-100">
                                    <p className="text-xs font-bold text-[#2E95A0]">Hospitals</p>
                                    <p className="text-3xl font-black text-[#00464B]">
                                        {cityInfo.hospitals?.length || 0}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cityInfo.hospitals?.map((hospital) => (
                                    <div key={hospital.id} className="p-5 rounded-2xl border hover:border-[#2E95A0]">
                                        
                                        <div className="flex justify-between mb-3">
                                            <span className="text-xs bg-teal-50 px-2 py-1 rounded">
                                                {hospital.type}
                                            </span>
                                            <span>⭐ {hospital.rating}</span>
                                        </div>

                                        <h3 className="font-bold">{hospital.name}</h3>
                                        <p className="text-xs text-gray-400">
                                            {hospital.address}
                                        </p>

                                        <div className="flex justify-between text-xs mt-3">
                                            <span>{hospital.beds} Beds</span>
                                            <span>{hospital.doctors} Doctors</span>
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
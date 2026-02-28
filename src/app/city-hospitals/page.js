"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import HospitalCard from "@/components/HospitalCard";
import { cityHospitalsData, cities, getSyncedHospitals } from "@/data/cityHospitalsData";

export default function CityHospitalsPage() {
    const [hospitalsData, setHospitalsData] = useState(cityHospitalsData);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Load synchronized data (handles merges with new code)
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

    const hospitals = useMemo(() => {
        if (!selectedCity) return [];
        return hospitalsData[selectedCity]?.hospitals || [];
    }, [selectedCity, hospitalsData]);

    const filteredHospitals = useMemo(() => {
        if (!searchQuery) return hospitals;
        const query = searchQuery.toLowerCase();
        return hospitals.filter(
            (h) =>
                h.name.toLowerCase().includes(query) ||
                h.type.toLowerCase().includes(query) ||
                (h.specialties && h.specialties.some((s) => s.toLowerCase().includes(query)))
        );
    }, [hospitals, searchQuery]);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSearchQuery("");
    };

    const handleHospitalClick = (id) => {
        router.push(`/city-hospitals/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-10 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center mt-15 gap-2 bg-gradient-to-r from-[#00464B] to-[#2E95A0] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
                        <i className="fa-solid fa-city text-[10px]"></i>
                        City Best Hospitals
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#00464B] tracking-tight">
                        Top Hospitals Across Pakistan
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
                        Explore the best hospitals in Pakistan's top 10 cities. Select a city to discover world-class healthcare facilities.
                    </p>
                </div>

                {/* City Selector Grid */}
                <div className="mb-8">
                    <h2 className="text-xs font-bold text-[#00464B] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-map-marker-alt text-[#2E95A0]"></i>
                        Select a City
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => handleCitySelect(city)}
                                className={`relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 group border-2 ${selectedCity === city
                                    ? "bg-gradient-to-br from-[#00464B] to-[#2E95A0] text-white border-transparent shadow-lg shadow-teal-200/50 scale-[1.02]"
                                    : "bg-white border-gray-100 hover:border-[#2E95A0]/30 hover:shadow-md text-[#00464B]"
                                    }`}
                            >
                                <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-full -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className={`w-9 h-9 rounded-lg mb-2 flex items-center justify-center transition-all duration-300 ${selectedCity === city
                                        ? "bg-white/20 backdrop-blur-sm"
                                        : "bg-teal-50 group-hover:bg-teal-100"
                                        }`}>
                                        <i className={`fa-solid fa-city text-sm ${selectedCity === city ? "text-white" : "text-[#2E95A0]"}`}></i>
                                    </div>
                                    <h3 className="text-sm font-bold leading-tight">{city}</h3>
                                    <p className={`text-[9px] mt-0.5 font-medium ${selectedCity === city ? "text-teal-200" : "text-gray-400"
                                        }`}>
                                        {hospitalsData[city].hospitals.length} Hospitals
                                    </p>
                                </div>
                                {selectedCity === city && (
                                    <div className="absolute bottom-2 right-2">
                                        <i className="fa-solid fa-check-circle text-white/80 text-sm"></i>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* City Info Banner */}
                {selectedCity && (
                    <div className="mb-6 bg-gradient-to-r from-[#00464B] via-[#1a6b72] to-[#2E95A0] rounded-2xl px-6 py-5 text-white relative overflow-hidden shadow-lg shadow-teal-900/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-teal-400/10 rounded-full -mb-24 blur-2xl"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <i className="fa-solid fa-map-pin text-white text-sm"></i>
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight">{selectedCity}</h2>
                                </div>
                                <p className="text-sm text-teal-100 max-w-xl leading-relaxed font-medium opacity-90">
                                    {hospitalsData[selectedCity].description}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="bg-white/10 rounded-2xl px-5 py-3 backdrop-blur-md border border-white/10 flex-1 md:flex-none min-w-[120px]">
                                    <p className="text-[10px] uppercase tracking-wider text-teal-200 font-bold mb-0.5">Hospitals</p>
                                    <div className="flex items-end gap-2">
                                        <p className="text-3xl font-black leading-none">{hospitals.length}</p>
                                        <i className="fa-solid fa-hospital text-white/40 text-lg mb-1"></i>
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-2xl px-5 py-3 backdrop-blur-md border border-white/10 flex-1 md:flex-none min-w-[120px]">
                                    <p className="text-[10px] uppercase tracking-wider text-teal-200 font-bold mb-0.5">Total Beds</p>
                                    <div className="flex items-end gap-2">
                                        <p className="text-3xl font-black leading-none">
                                            {hospitals.reduce((sum, h) => sum + h.beds, 0).toLocaleString()}
                                        </p>
                                        <i className="fa-solid fa-bed-pulse text-white/40 text-lg mb-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search within city */}
                {selectedCity && (
                    <div className="mb-8">
                        <div className="relative max-w-lg mx-auto md:mx-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fa-solid fa-search text-gray-400 text-sm"></i>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search hospitals in ${selectedCity} by name, type, or specialty...`}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 sm:text-sm transition-all shadow-sm hover:border-gray-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fa-solid fa-times-circle"></i>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Grid View of Hospitals */}
                {selectedCity && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-[#00464B] uppercase tracking-widest flex items-center gap-2">
                                <i className="fa-solid fa-hospital text-[#2E95A0]"></i>
                                Available Hospitals ({filteredHospitals.length})
                            </h3>
                        </div>

                        {filteredHospitals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                                {filteredHospitals.map((hospital, idx) => (
                                    <HospitalCard
                                        key={hospital.id}
                                        hospital={hospital}
                                        index={idx}
                                        onClick={() => handleHospitalClick(hospital.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-search text-3xl text-gray-300"></i>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No hospitals found</h3>
                                <p className="text-sm text-gray-500">
                                    We couldn't find any hospitals matching "{searchQuery}" in {selectedCity}.
                                </p>
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="mt-4 text-teal-600 font-bold text-sm hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Initial State: No city selected */}
                {!selectedCity && (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center mt-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/img/pattern/grid.svg')] opacity-[0.03]"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative z-10">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#00464B] to-[#2E95A0] flex items-center justify-center mb-6 shadow-xl shadow-teal-200/50 mx-auto transform group-hover:scale-110 transition-transform duration-500">
                                <i className="fa-solid fa-map-location-dot text-4xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-black text-[#00464B] mb-3">Where are you looking for care?</h3>
                            <p className="text-sm text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
                                Please select a city from the list above to view the top-rated hospitals in that region.
                                We have curated the best medical facilities across Pakistan for your healthcare needs.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {["Lahore", "Karachi", "Islamabad"].map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => handleCitySelect(city)}
                                        className="group/btn relative px-6 py-3 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider overflow-hidden hover:text-white transition-colors duration-300"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-[#2E95A0] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        <div className="relative flex items-center gap-2">
                                            <span>Explore {city}</span>
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

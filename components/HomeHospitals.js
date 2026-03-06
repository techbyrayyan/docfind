import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cityHospitalsData } from "@/app/data/cityHospitalsData";

export default function HomeHospitals() {
    const router = useRouter();
    const [hospitalsData, setHospitalsData] = useState(cityHospitalsData);
    const [visibleHospitals, setVisibleHospitals] = useState(3);
    const [isClient, setIsClient] = useState(false);
    const [editingHospital, setEditingHospital] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Sync with localStorage for two-way synchronization
    useEffect(() => {
        setIsClient(true);
        setHospitalsData(cityHospitalsData);

        const handleStorageChange = (e) => {
            if (e.key === "docfind_hospitals" && e.newValue) {
                setHospitalsData(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const allHospitals = Object.keys(hospitalsData).flatMap(city =>
        hospitalsData[city].hospitals.map(h => ({ ...h, city }))
    );

    const filteredHospitals = allHospitals.filter(hospital =>
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateHospital = (city, id, newData) => {
        setHospitalsData(prev => {
            const updated = { ...prev };
            const idx = updated[city].hospitals.findIndex(h => h.id === id);
            if (idx !== -1) {
                updated[city].hospitals[idx] = { ...updated[city].hospitals[idx], ...newData };
            }
            localStorage.setItem("docfind_hospitals", JSON.stringify(updated));
            return updated;
        });
        setEditingHospital(null);
    };

    if (!isClient) {
        return null;
    }

    return (
        <section id="best-hospitals" className="py-16 bg-[#F8FCFC]">
            <div className="max-w-250 mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl  font-bold text-[#005963] tracking-tight">
                        Best Hospitals in Every City
                    </h2>
                    <div className="mt-2 h-1.5 w-24 bg-[#2E95A0] mx-auto rounded-full"></div>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        Discover top-rated medical facilities across major cities in Pakistan with real-time updates and world-class care.
                    </p>

                    <div className="mt-8 max-w-md mx-auto relative group">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2E95A0] transition-colors"></i>
                        <input
                            type="text"
                            placeholder="Search city or hospital name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-gray-100 shadow-sm focus:border-[#2E95A0] focus:ring-4 focus:ring-[#2E95A0]/10 outline-none font-medium text-[#00464B] transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredHospitals.slice(0, visibleHospitals).map((hospital, idx) => (
                        <div
                            key={hospital.id + idx}
                            onClick={() => router.push(`/city-hospitals/${hospital.id}`)}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                                    <span className="text-xs font-bold text-[#00464B]">{hospital.rating}</span>
                                </div>
                                <div className="absolute top-4 left-4 z-10 bg-[#2E95A0] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {hospital.city}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingHospital(hospital);
                                    }}
                                    className="absolute bottom-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                                    title="Quick Edit"
                                >
                                    <i className="fa-solid fa-pen-to-square text-xs"></i>
                                </button>
                                <img
                                    src={hospital.image || "/img/svg/hospital.svg"}
                                    alt={hospital.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <p className="text-white text-xs font-medium">Established in {hospital.established}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fa-solid fa-stethoscope text-[#2E95A0] text-xs"></i>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{hospital.type}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#00464B] mb-4 line-clamp-1">{hospital.name}</h3>
                                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Beds</span>
                                        <span className="text-sm font-bold text-[#00464B]">{hospital.beds}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Reviews</span>
                                        <span className="text-sm font-bold text-[#00464B]">{hospital.reviews.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => {
                            if (visibleHospitals > 3) {
                                document.getElementById('best-hospitals')?.scrollIntoView({ behavior: 'smooth' });
                                setTimeout(() => setVisibleHospitals(3), 500); // Wait for scroll to start
                            } else {
                                setVisibleHospitals(filteredHospitals.length);
                            }
                        }}
                        className="group relative inline-flex items-center gap-3 bg-[#00464B] text-white px-10 py-4 rounded-full font-bold overflow-hidden transition-all hover:bg-[#2E95A0] hover:shadow-[0_10px_30px_rgba(46,149,160,0.4)] active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 text-xs uppercase tracking-widest">
                            {visibleHospitals === 3 ? "Show More Hospitals" : "Show Less"}
                        </span>
                        <i className={`fa-solid ${visibleHospitals === 3 ? "fa-plus" : "fa-minus"} relative z-10 text-xs transition-transform group-hover:rotate-90`}></i>
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingHospital && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
                        <div className="bg-[#00464B] p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-bold">Update Hospital</h3>
                            <button onClick={() => setEditingHospital(null)} className="hover:rotate-90 transition-transform">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hospital Name</label>
                                <input
                                    type="text"
                                    defaultValue={editingHospital.name}
                                    id="edit-name"
                                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#2E95A0] focus:ring-2 focus:ring-[#2E95A0]/20 outline-none font-bold text-[#00464B] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Beds</label>
                                <input
                                    type="number"
                                    defaultValue={editingHospital.beds}
                                    id="edit-beds"
                                    className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#2E95A0] focus:ring-2 focus:ring-[#2E95A0]/20 outline-none font-bold text-[#00464B] transition-all"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    const name = document.getElementById('edit-name').value;
                                    const beds = parseInt(document.getElementById('edit-beds').value);
                                    updateHospital(editingHospital.city, editingHospital.id, { name, beds });
                                }}
                                className="w-full bg-linear-to-r from-[#2E95A0] to-[#00464B] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
                            >
                                Confirm Changes & Sync
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";

export default function HospitalCard({ hospital, index = 0, onClick }) {
    const [expanded, setExpanded] = useState(false);

    if (!hospital) return null;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <i key={i} className="fa-solid fa-star text-yellow-400 text-[10px]"></i>
                );
            } else if (i === fullStars && hasHalf) {
                stars.push(
                    <i key={i} className="fa-solid fa-star-half-stroke text-yellow-400 text-[10px]"></i>
                );
            } else {
                stars.push(
                    <i key={i} className="fa-regular fa-star text-gray-300 text-[10px]"></i>
                );
            }
        }
        return stars;
    };

    const handleCardClick = (e) => {
        if (onClick) {
            e.stopPropagation();
            onClick();
        }
    };

    return (
        <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group ${onClick ? "cursor-pointer" : ""}`}
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={onClick ? handleCardClick : undefined}
        >
            {/* Card Header Gradient */}
            <div className="relative bg-gradient-to-r from-[#00464B] via-[#2E95A0] to-[#5EC6CE] p-4 pb-5">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>

                <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-hospital text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm leading-tight max-w-[220px]">
                                {hospital.name}
                            </h3>
                            <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-teal-100 bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                {hospital.type}
                            </span>
                        </div>
                    </div>

                    {hospital.emergency && (
                        <div className="flex items-center gap-1 bg-[#00464B] text-white px-2 py-1 rounded-lg text-[9px] font-bold backdrop-blur-sm animate-pulse">
                            <i className="fa-solid fa-truck-medical text-[8px]"></i>
                            24/7
                        </div>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
                {/* Rating & Reviews */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">{renderStars(hospital.rating)}</div>
                        <span className="text-xs font-bold text-[#00464B]">{hospital.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                        <i className="fa-solid fa-message text-[8px] mr-1 text-[#2E95A0]"></i>
                        {hospital.reviews?.toLocaleString()} reviews
                    </span>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-teal-50/70 rounded-lg p-2 text-center group/stat hover:bg-teal-50 transition-colors">
                        <i className="fa-solid fa-bed text-[10px] text-[#2E95A0] block mb-0.5 group-hover/stat:scale-110 transition-transform"></i>
                        <p className="text-xs font-bold text-[#00464B]">{hospital.beds}</p>
                        <p className="text-[8px] text-gray-400 uppercase font-medium">Beds</p>
                    </div>
                    <div className="bg-blue-50/70 rounded-lg p-2 text-center group/stat hover:bg-blue-50 transition-colors">
                        <i className="fa-solid fa-user-doctor text-[10px] text-blue-500 block mb-0.5 group-hover/stat:scale-110 transition-transform"></i>
                        <p className="text-xs font-bold text-[#00464B]">{hospital.doctors}</p>
                        <p className="text-[8px] text-gray-400 uppercase font-medium">Doctors</p>
                    </div>
                    <div className="bg-purple-50/70 rounded-lg p-2 text-center group/stat hover:bg-purple-50 transition-colors">
                        <i className="fa-solid fa-calendar text-[10px] text-purple-500 block mb-0.5 group-hover/stat:scale-110 transition-transform"></i>
                        <p className="text-xs font-bold text-[#00464B]">{hospital.established}</p>
                        <p className="text-[8px] text-gray-400 uppercase font-medium">Since</p>
                    </div>
                </div>

                {/* Specialties Badges */}
                <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">
                        <i className="fa-solid fa-stethoscope text-[8px] mr-1 text-[#2E95A0]"></i>
                        Specialties
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {hospital.specialties?.slice(0, (expanded && !onClick) ? undefined : 3).map((spec, i) => (
                            <span
                                key={i}
                                className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 text-[#00464B] border border-teal-100/60"
                            >
                                {spec}
                            </span>
                        ))}
                        {!(expanded && !onClick) && hospital.specialties?.length > 3 && (
                            <span className="text-[9px] font-bold text-[#2E95A0] px-1.5 py-0.5">
                                +{hospital.specialties.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className={`text-[11px] text-gray-500 leading-relaxed ${(expanded && !onClick) ? "" : "line-clamp-2"}`}>
                    {hospital.description}
                </p>

                {/* Expanded Details - Only show if NO onClick handler is provided and expanded is true */}
                {expanded && !onClick && (
                    <div className="space-y-3 animate-fadeIn">
                        {/* Address */}
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50/70">
                            <i className="fa-solid fa-location-dot text-[10px] text-red-400 mt-0.5"></i>
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Address</p>
                                <p className="text-[11px] text-gray-700 font-medium">{hospital.address}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50/70">
                            <i className="fa-solid fa-phone text-[10px] text-green-500 mt-0.5"></i>
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Contact</p>
                                <p className="text-[11px] text-gray-700 font-semibold">{hospital.phone}</p>
                            </div>
                        </div>

                        {/* Facilities */}
                        <div>
                            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">
                                <i className="fa-solid fa-building text-[8px] mr-1 text-blue-500"></i>
                                Facilities
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {hospital.facilities?.map((facility, i) => (
                                    <span
                                        key={i}
                                        className="text-[9px] font-medium px-2 py-1 rounded-lg bg-blue-50/70 text-blue-700 border border-blue-100/60 flex items-center gap-1"
                                    >
                                        <i className="fa-solid fa-check text-[7px] text-green-500"></i>
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Toggle Button / View Details Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Always stop propagation on the button
                        if (onClick) {
                            onClick();
                        } else {
                            setExpanded(!expanded);
                        }
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-[10px] font-bold text-[#2E95A0] hover:from-teal-50 hover:to-cyan-50 transition-all duration-300 flex items-center justify-center gap-1"
                >
                    {onClick ? (
                        <>
                            <i className="fa-solid fa-arrow-right text-[8px]"></i>
                            View Full Details
                        </>
                    ) : expanded ? (
                        <>
                            <i className="fa-solid fa-chevron-up text-[8px]"></i>
                            Show Less
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-chevron-down text-[8px]"></i>
                            View Full Details
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

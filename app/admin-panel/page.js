"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cityHospitalsData as defaultCityHospitalsData, getSyncedHospitals } from "../hospital-data/page";
import HospitalCard from "@/components/HospitalCard";

export default function AdminPanel() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 142,
        totalDoctors: 0,
        totalAppointments: 0,
        totalRevenue: "124,500",
        pendingApprovals: 3,
    });

    const [recentAppointments, setRecentAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [activeTab, setActiveTab] = useState("overview");
    const [currentTime, setCurrentTime] = useState("");
    const [cityHospitalsData, setCityHospitalsData] = useState(defaultCityHospitalsData);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    // Smart Sync on Mount: Merges fresh code data with persisted user edits
    useEffect(() => {
        const synced = getSyncedHospitals();
        setCityHospitalsData(synced);
        // Update storage with the merged version to ensure it has new fields/hospitals
        localStorage.setItem("docfind_hospitals", JSON.stringify(synced));
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (cityHospitalsData !== defaultCityHospitalsData) {
            localStorage.setItem("docfind_hospitals", JSON.stringify(cityHospitalsData));
        }
    }, [cityHospitalsData]);

    const handleHospitalUpdate = (city, hospitalId, updatedData) => {
        setCityHospitalsData(prev => {
            const newData = { ...prev };
            const hospitalIndex = newData[city].hospitals.findIndex(h => h.id === hospitalId);
            if (hospitalIndex !== -1) {
                newData[city].hospitals[hospitalIndex] = {
                    ...newData[city].hospitals[hospitalIndex],
                    ...updatedData
                };
            }
            return newData;
        });
    };

    const cityNames = Object.keys(cityHospitalsData);
    const cityHospitals = useMemo(() => {
        if (!selectedCity) return [];
        return cityHospitalsData[selectedCity]?.hospitals || [];
    }, [selectedCity]);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "New doctor registration request", type: "info", time: "2 min ago" },
        { id: 2, text: "System backup completed", type: "success", time: "1 hr ago" },
        { id: 3, text: "5 new appointments today", type: "warning", time: "3 hr ago" },
    ]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        const registeredDoctors = JSON.parse(localStorage.getItem("registeredDoctors") || "[]");
        const contactData = JSON.parse(localStorage.getItem("contactFormData") || "null");
        const baseDoctorsCount = 6;

        setRecentAppointments(storedAppointments.slice(-5).reverse());
        setDoctors(registeredDoctors);

        if (contactData) {
            setRecentInquiries([contactData]);
        }

        setStats((prev) => ({
            ...prev,
            totalDoctors: registeredDoctors.length + baseDoctorsCount,
            totalAppointments: storedAppointments.length,
            pendingApprovals: Math.max(0, registeredDoctors.length - 2),
        }));

        // Live clock
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: "fa-solid fa-chart-line" },
        { id: "city", label: "City Hospitals", icon: "fa-solid fa-city" },
        { id: "doctors", label: "Manage Doctors", icon: "fa-solid fa-user-doctor", href: "/doctorlist" },
        { id: "appointments", label: "Bookings", icon: "fa-solid fa-calendar-check", href: "/history" },
        { id: "medicines", label: "Medicines", icon: "fa-solid fa-pills", href: "/medicine" },
        { id: "users", label: "Users", icon: "fa-solid fa-users", href: "/edit-profile" },
        { id: "news", label: "Manage News", icon: "fa-solid fa-newspaper", href: "/news" },
    ];

    const quickActions = [
        { label: "Add Doctor", icon: "fa-solid fa-user-plus", href: "/doctorlist", color: "from-teal-500 to-teal-600" },
        { label: "New Booking", icon: "fa-solid fa-calendar-plus", href: "/book-appointment", color: "from-teal-500 to-teal-600" },
        { label: "City Hospitals", icon: "fa-solid fa-hospital", href: "/city-hospitals", color: "from-teal-500 to-teal-600" },
        { label: "Messages", icon: "fa-solid fa-envelope", href: "/contact", color: "from-teal-500 to-teal-600" },
    ];

    const topDoctors = [
        { name: "Dr. Beatrice Willis", specialty: "Cardiologist", patients: 87, rating: 4.9 },
        { name: "Dr. Muhammad Tufail", specialty: "Neurologist", patients: 64, rating: 4.8 },
        { name: "Dr. John Doe", specialty: "Orthopedic", patients: 52, rating: 4.7 },
    ];

    const systemHealth = [
        { label: "Server Uptime", value: "99.9%", icon: "fa-solid fa-server", color: "text-green-500" },
        { label: "Response Time", value: "120ms", icon: "fa-solid fa-bolt", color: "text-yellow-500" },
        { label: "Error Rate", value: "0.02%", icon: "fa-solid fa-bug", color: "text-red-400" },
        { label: "Active Sessions", value: "34", icon: "fa-solid fa-signal", color: "text-blue-500" },
    ];

    const weeklyData = [
        { day: "Mon", value: 65 },
        { day: "Tue", value: 45 },
        { day: "Wed", value: 80 },
        { day: "Thu", value: 55 },
        { day: "Fri", value: 90 },
        { day: "Sat", value: 70 },
        { day: "Sun", value: 35 },
    ];
    const maxWeeklyValue = Math.max(...weeklyData.map((d) => d.value));

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 ">
                            {/* Total Bookings */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-calendar-check text-sm text-[#2E95A0]"></i>
                                    </div>
                                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">
                                        <i className="fa-solid fa-arrow-up text-[10px] mr-1"></i>12%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Bookings</p>
                                <h3 className="text-2xl font-bold text-[#00464B] mt-1">{stats.totalAppointments}</h3>
                            </div>

                            {/* Active Doctors */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-user-doctor text-sm text-[#00a696]"></i>
                                    </div>
                                    <span className="text-xs font-bold text-[#00a696] bg-blue-50 px-2 py-1 rounded">
                                        {stats.pendingApprovals} pending
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Doctors</p>
                                <h3 className="text-2xl font-bold text-[#00464B] mt-1">{stats.totalDoctors}</h3>
                            </div>

                            {/* Platform Users */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-users text-sm text-[#00a696]"></i>
                                    </div>
                                    <span className="text-xs font-bold text-[#00a696] bg-purple-50 px-2 py-1 rounded">
                                        <i className="fa-solid fa-arrow-up text-[10px] mr-1"></i>8%
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Platform Users</p>
                                <h3 className="text-2xl font-bold text-[#00464B] mt-1">{stats.totalUsers}</h3>
                            </div>

                            {/* Revenue */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-money-bill-trend-up text-sm text-[#00a696]"></i>
                                    </div>
                                    <span className="text-xs font-bold text-[#00a696] bg-orange-50 px-2 py-1 rounded">PKR</span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Est. Revenue</p>
                                <h3 className="text-2xl font-bold text-[#00464B] mt-1">{stats.totalRevenue}</h3>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <h3 className="text-sm font-bold text-[#00464B] uppercase tracking-wider mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action, idx) => (
                                    <Link
                                        key={idx}
                                        href={action.href}
                                        className={`bg-gradient-to-br ${action.color} text-white p-4 rounded-xl flex items-center gap-3 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
                                    >
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                            <i className={`${action.icon} text-sm`}></i>
                                        </div>
                                        <span className="text-sm font-semibold">{action.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                            {/* Weekly Analytics Chart */}
                            {/* Weekly Analytics Chart */}
                            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-base font-bold text-[#00464B]">Weekly Analytics</h3>
                                        <p className="text-xs text-gray-400 mt-1">Appointment trends this week</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-teal-50 text-[#2E95A0] px-2.5 py-1 rounded-md font-bold">This Week</span>
                                    </div>
                                </div>
                                <div className="p-5 pt-8">
                                    <div className="flex items-end justify-between gap-3 h-40">
                                        {weeklyData.map((data, idx) => (
                                            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                                                <span className="text-xs font-bold text-gray-500">{data.value}</span>
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#2E95A0] to-[#5EC6CE] rounded-t-md hover:from-[#00464B] hover:to-[#2E95A0] transition-all duration-300 cursor-pointer"
                                                    style={{
                                                        height: `${(data.value / maxWeeklyValue) * 100}%`,
                                                        minHeight: "8px",
                                                    }}
                                                ></div>
                                                <span className="text-xs text-gray-400 font-medium">{data.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                                    <h3 className="text-base font-bold text-[#00464B]">Notifications</h3>
                                    <span className="text-xs bg-red-50 text-[#00a696] px-2 py-0.5 rounded-full font-bold">{notifications.length}</span>
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.type === "info" ? "bg-blue-50 text-blue-500" :
                                                notif.type === "success" ? "bg-green-50 text-green-500" :
                                                    "bg-yellow-50 text-[#00a696]"
                                                }`}>
                                                <i className={`text-xs ${notif.type === "info" ? "fa-solid fa-info-circle" :
                                                    notif.type === "success" ? "fa-solid fa-check-circle" :
                                                        "fa-solid fa-exclamation-triangle"
                                                    }`}></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-700 font-medium leading-tight">{notif.text}</p>
                                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="text-xs text-[#2E95A0] font-bold text-center py-2 hover:underline">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                            {/* Recent Bookings Table */}
                            {/* Recent Bookings Table */}
                            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-[#F8FCFC]">
                                    <h3 className="text-base font-bold text-[#00464B]">Recent Bookings</h3>
                                    <Link href="/history" className="text-xs font-bold text-[#2E95A0] hover:underline">View All →</Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/50 text-xs text-[#2E95A0] uppercase tracking-wider font-bold">
                                                <th className="px-5 py-4">Patient</th>
                                                <th className="px-5 py-4">Doctor</th>
                                                <th className="px-5 py-4">Date</th>
                                                <th className="px-5 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {recentAppointments.length > 0 ? (
                                                recentAppointments.map((appt) => (
                                                    <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-xs font-bold text-[#2E95A0]">
                                                                    {appt.patientName?.[0]}
                                                                </div>
                                                                <span className="text-sm font-semibold text-gray-800">{appt.patientName}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-sm text-gray-600">{appt.doctor}</td>
                                                        <td className="px-5 py-4 text-sm text-gray-500">{appt.appointmentDate}</td>
                                                        <td className="px-5 py-4">
                                                            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-teal-50 text-teal-700">
                                                                {appt.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-5 py-10 text-center text-gray-400 text-xs italic">
                                                        No recent bookings found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Top Doctors */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                                    <h3 className="text-base font-bold text-[#00464B]">Top Doctors</h3>
                                    <Link href="/doctorlist" className="text-xs font-bold text-[#2E95A0] hover:underline">View All →</Link>
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    {topDoctors.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E95A0] to-[#00464B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {doc.name.split(" ").slice(-1)[0][0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-gray-800 truncate">{doc.name}</h4>
                                                <p className="text-xs text-gray-400">{doc.specialty}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-solid fa-star text-[10px] text-yellow-400"></i>
                                                    <span className="text-xs font-bold text-gray-700">{doc.rating}</span>
                                                </div>
                                                <p className="text-xs text-gray-400">{doc.patients} patients</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                            {/* Customer Inquiries */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 bg-orange-50/30 flex justify-between items-center">
                                    <h3 className="text-base font-bold text-[#00464B]">Customer Inquiries</h3>
                                    <span className="text-xs font-bold text-[#00a696] bg-orange-100 px-2 py-0.5 rounded">
                                        {recentInquiries.length} new
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    {recentInquiries.length > 0 ? (
                                        recentInquiries.map((inq, idx) => (
                                            <div key={idx} className="p-4 rounded-lg bg-orange-50/50 border border-orange-100/50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-sm font-bold text-orange-800">{inq.patientName}</span>
                                                    <span className="text-[10px] bg-orange-200 text-orange-900 px-2 py-0.5 rounded uppercase font-bold">New</span>
                                                </div>
                                                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                                                    {inq.note || "General medical inquiry regarding appointment availability."}
                                                </p>
                                                <div className="mt-2.5 text-xs font-bold text-orange-700 flex items-center gap-1.5">
                                                    <i className="fa-solid fa-phone text-[10px]"></i> {inq.mobile}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-400 text-xs italic">
                                            <i className="fa-solid fa-inbox text-3xl text-gray-200 block mb-3"></i>
                                            No pending inquiries.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* System Health + Security */}
                            <div className="flex flex-col gap-5">
                                {/* System Health */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="text-base font-bold text-[#00464B]">System Health</h3>
                                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded font-bold">
                                            <i className="fa-solid fa-circle text-[6px] mr-1.5 animate-pulse"></i>All Systems OK
                                        </span>
                                    </div>
                                    <div className="p-4 grid grid-cols-2 gap-3">
                                        {systemHealth.map((item, idx) => (
                                            <div key={idx} className="bg-gray-50/50 rounded-lg p-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                                                <i className={`${item.icon} text-sm ${item.color}`}></i>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                                                    <p className="text-sm font-bold text-[#00464B]">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Security Card */}
                                <div className="bg-gradient-to-br from-[#00464B] to-[#2E95A0] rounded-xl p-6 text-white overflow-hidden relative shadow-md">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 scale-125">
                                        <i className="fa-solid fa-shield-halved text-6xl"></i>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                                <i className="fa-solid fa-lock text-xs"></i>
                                            </div>
                                            <h4 className="text-sm font-bold">Security Status</h4>
                                        </div>
                                        <p className="text-xs text-teal-100 mb-4 leading-relaxed">
                                            Last scan: 2 hours ago. All systems secure. No threats detected.
                                        </p>
                                        <div className="flex gap-3">
                                            <button className="text-[10px] font-bold bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                                                <i className="fa-solid fa-rotate mr-1.5"></i>Re-Scan
                                            </button>
                                            <button className="text-[10px] font-bold bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                                                <i className="fa-solid fa-file-lines mr-1.5"></i>Full Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "city":
                return (
                    <div className="space-y-6">
                        {/* City Header */}
                        <div className="bg-gradient-to-r from-[#00464B] via-[#1a6b72] to-[#2E95A0] rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black flex items-center gap-3">
                                        <i className="fa-solid fa-city"></i>
                                        City Best Hospitals
                                    </h2>
                                    <p className="text-sm text-teal-200 mt-1">Top 10 cities in Pakistan & their best hospitals</p>
                                </div>
                                <Link href="/city-hospitals" className="text-xs font-bold bg-white/15 px-4 py-2.5 rounded-xl hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/10">
                                    <i className="fa-solid fa-external-link mr-2"></i>Full Page View
                                </Link>
                            </div>
                        </div>

                        {/* City Selector */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <h3 className="text-sm font-bold text-[#00464B] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-map-marker-alt text-[#2E95A0]"></i>Select a City
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {cityNames.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => { setSelectedCity(city); setSelectedHospital(null); }}
                                        className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${selectedCity === city
                                            ? "bg-gradient-to-br from-[#00464B] to-[#2E95A0] text-white border-transparent shadow-lg"
                                            : "bg-gray-50 border-gray-100 hover:border-[#2E95A0]/30 hover:shadow-sm text-[#00464B]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`fa-solid fa-city text-base ${selectedCity === city ? "text-white" : "text-[#2E95A0]"}`}></i>
                                            <div>
                                                <h4 className="text-sm font-bold leading-tight">{city}</h4>
                                                <p className={`text-[10px] font-medium mt-0.5 ${selectedCity === city ? "text-teal-200" : "text-gray-400"}`}>
                                                    {cityHospitalsData[city].hospitals.length} Hospitals
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hospitals List for Selected City */}
                        {selectedCity && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-[#00464B] uppercase tracking-widest flex items-center gap-2">
                                        <i className="fa-solid fa-hospital text-[#2E95A0]"></i>
                                        Hospitals in {selectedCity} ({cityHospitals.length})
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-teal-50 text-[#2E95A0] px-3 py-1.5 rounded-md font-bold">
                                            <i className="fa-solid fa-bed text-[10px] mr-1.5"></i>
                                            {cityHospitals.reduce((sum, h) => sum + h.beds, 0).toLocaleString()} Total Beds
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cityHospitals.map((hospital) => (
                                        <button
                                            key={hospital.id}
                                            onClick={() => setSelectedHospital(selectedHospital?.id === hospital.id ? null : hospital)}
                                            className={`text-left p-4 rounded-xl transition-all duration-300 border-2 ${selectedHospital?.id === hospital.id
                                                ? "bg-gradient-to-r from-teal-50 to-cyan-50 border-[#2E95A0] shadow-md"
                                                : "bg-gray-50/50 border-gray-100 hover:border-[#2E95A0]/30 hover:shadow-sm"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedHospital?.id === hospital.id
                                                    ? "bg-gradient-to-br from-[#00464B] to-[#2E95A0] text-white"
                                                    : "bg-teal-50 text-[#2E95A0]"
                                                    }`}>
                                                    <i className="fa-solid fa-hospital text-lg"></i>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm font-bold text-[#00464B] truncate">{hospital.name}</h4>
                                                    <p className="text-xs text-gray-400 font-medium">{hospital.type} · Est. {hospital.established}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center gap-1">
                                                            <i className="fa-solid fa-star text-[10px] text-yellow-400"></i>
                                                            <span className="text-xs font-bold text-[#00464B]">{hospital.rating}</span>
                                                        </div>
                                                        <span className="text-[10px] text-gray-400">·</span>
                                                        <span className="text-xs text-gray-400">{hospital.beds} beds</span>
                                                        <span className="text-[10px] text-gray-400">·</span>
                                                        <span className="text-xs text-gray-400">{hospital.doctors} doctors</span>
                                                    </div>
                                                </div>
                                                <i className={`fa-solid text-sm text-[#2E95A0] flex-shrink-0 transition-transform ${selectedHospital?.id === hospital.id ? "fa-chevron-down" : "fa-chevron-right"
                                                    }`}></i>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selected Hospital Full Details & Edit Form */}
                        {selectedHospital && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-[#00464B] uppercase tracking-widest flex items-center gap-2">
                                        <i className="fa-solid fa-clipboard-list text-[#2E95A0]"></i>
                                        Hospital Details — {selectedHospital.name}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setIsEditing(!isEditing);
                                            setEditForm(selectedHospital);
                                        }}
                                        className="text-xs font-bold bg-[#2E95A0] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                                    >
                                        <i className={`fa-solid ${isEditing ? 'fa-xmark' : 'fa-pen-to-square'} mr-2`}></i>
                                        {isEditing ? 'Cancel Edit' : 'Edit Hospital'}
                                    </button>
                                </div>

                                {isEditing ? (
                                    <div className="bg-white rounded-xl p-6 border-2 border-dashed border-[#2E95A0]/30 animate-pulse-slow">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Hospital Name</label>
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-100 focus:border-[#2E95A0] focus:ring-1 focus:ring-[#2E95A0] outline-none text-sm transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Rating</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={editForm.rating}
                                                    onChange={(e) => setEditForm({ ...editForm, rating: parseFloat(e.target.value) })}
                                                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-100 focus:border-[#2E95A0] focus:ring-1 focus:ring-[#2E95A0] outline-none text-sm transition-all"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleHospitalUpdate(selectedCity, editForm.id, editForm);
                                                setSelectedHospital(editForm);
                                                setIsEditing(false);
                                                alert("Hospital updated successfully! Shifts will reflect across the site.");
                                            }}
                                            className="mt-6 w-full bg-gradient-to-r from-[#00464B] to-[#2E95A0] text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
                                        >
                                            Save Changes & Sync Data
                                        </button>
                                    </div>
                                ) : (
                                    <HospitalCard hospital={selectedHospital} />
                                )}
                            </div>
                        )}

                        {/* No City Selected State */}
                        {!selectedCity && (
                            <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
                                    <i className="fa-solid fa-map-location-dot text-2xl text-[#2E95A0]"></i>
                                </div>
                                <h3 className="text-base font-bold text-[#00464B] mb-2">Select a City to Get Started</h3>
                                <p className="text-sm text-gray-500 max-w-sm">
                                    Choose a city from the grid above to view and manage its best-rated hospitals.
                                </p>
                            </div>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="bg-white rounded-xl p-16 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <i className="fa-solid fa-hourglass-start text-xl text-gray-300"></i>
                        </div>
                        <h3 className="text-sm font-bold text-[#00464B] mb-1">Section Under Construction</h3>
                        <p className="text-[11px] text-gray-500 max-w-sm">This module is being synchronized with the production database.</p>
                        <button
                            onClick={() => setActiveTab("overview")}
                            className="mt-4 text-[11px] text-[#2E95A0] font-bold hover:underline"
                        >
                            ← Return to Overview
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-10 px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full lg:w-60 flex flex-col gap-4">
                    <div className="bg-[#00464B] rounded-2xl p-6 shadow-xl text-white sticky top-28 overflow-hidden mt-10">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>

                        {/* Sidebar Header */}
                        <div className="relative z-10 flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-[#2E95A0] flex items-center justify-center shadow-lg border border-teal-400/30">
                                <i className="fa-solid fa-user-shield text-lg text-white"></i>
                            </div>
                            <div>
                                <h2 className="font-bold text-lg leading-tight">Admin Central</h2>
                                <p className="text-xs text-teal-300 font-bold uppercase tracking-widest mt-0.5">Control Panel</p>
                            </div>
                        </div>

                        {/* Nav Items */}
                        <div className="space-y-2 relative z-10">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href || "#"}
                                    onClick={() => !item.href && setActiveTab(item.id)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${activeTab === item.id && !item.href
                                        ? "bg-gradient-to-r from-[#2E95A0] to-[#23737b] text-white shadow-[0_6px_16px_rgba(46,149,160,0.3)] translate-x-0.5"
                                        : "text-teal-100/80 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <i className={`${item.icon} text-sm w-5`}></i>
                                    <span className="text-sm font-semibold">{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Live Clock */}
                        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                            <div className="flex items-center justify-center gap-2 text-teal-100 mb-4">
                                <i className="fa-regular fa-clock text-xs"></i>
                                <span className="text-sm font-mono font-bold tracking-wider">{currentTime || "--:--:--"}</span>
                            </div>
                            <button
                                onClick={() => router.push("/")}
                                className="w-full py-3.5 rounded-xl border border-teal-500/20 text-xs font-bold text-teal-300 hover:bg-teal-500 hover:text-white hover:border-transparent transition-all duration-300 group"
                            >
                                <i className="fa-solid fa-right-from-bracket mr-2 group-hover:-translate-x-0.5 transition-transform"></i>
                                Exit Admin
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-10">
                        <div>
                            <h1 className="text-3xl font-black text-[#00464B] tracking-tight">System Core</h1>
                            <p className="text-sm text-gray-500 font-medium mt-1">
                                Monitoring platform-wide activities and data.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex -space-x-1.5">
                                <div className="w-9 h-9 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-xs font-bold text-[#2E95A0]">R</div>
                                <div className="w-9 h-9 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-500">A</div>
                            </div>
                            <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-bold text-gray-700 tracking-wider">LIVE</span>
                            </div>
                        </div>
                    </div>

                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
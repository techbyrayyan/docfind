"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserPanel() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "Rayyan Ansari",
        email: "techbyrayyan@gmail.com",
        phone: "+92 322 435323 23",
        address: "Gulshan-e-Ravi, Lahore",
        avatar: null,
    });

    const [stats, setStats] = useState({
        appointments: 0,
        likes: 0,
        messages: 2,
        healthScore: 85,
    });

    const [recentAppointments, setRecentAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [greeting, setGreeting] = useState("Hello");

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedPhone = localStorage.getItem("userPhone");
        const storedAddress = localStorage.getItem("userAddress");
        const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        const storedLikes = JSON.parse(localStorage.getItem("favoriteDoctors") || "[]");

        if (storedName || storedEmail) {
            setUser((prev) => ({
                ...prev,
                name: storedName || prev.name,
                email: storedEmail || prev.email,
                phone: storedPhone || prev.phone,
                address: storedAddress || prev.address,
            }));
        }

        setRecentAppointments(storedAppointments.slice(-4).reverse());
        setStats({
            appointments: storedAppointments.length,
            likes: storedLikes.length || 4,
            messages: 2,
            healthScore: 85,
        });

        // Dynamic greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 17) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: "fa-solid fa-house" },
        { id: "appointments", label: "My Appointments", icon: "fa-solid fa-calendar-check", href: "/history" },
        { id: "likes", label: "Favorite Doctors", icon: "fa-solid fa-heart", href: "/likes" },
        { id: "profile", label: "Edit Profile", icon: "fa-solid fa-user-pen", href: "/edit-profile" },
        { id: "medicine", label: "My Medicines", icon: "fa-solid fa-pills", href: "/medicine" },
        { id: "faq", label: "Get Help", icon: "fa-solid fa-circle-question", href: "/faq" },
    ];

    const quickActions = [
        { label: "Book Appointment", icon: "fa-solid fa-calendar-plus", href: "/book-appointment", color: "from-teal-500 to-teal-600" },
        { label: "Find Doctors", icon: "fa-solid fa-user-doctor", href: "/doctorlist", color: "from-teal-500 to-teal-600" },
        { label: "My Medicines", icon: "fa-solid fa-pills", href: "/medicine", color: "from-teal-500 to-teal-600" },
        { label: "Contact Us", icon: "fa-solid fa-headset", href: "/contact", color: "from-teal-500 to-teal-600" },
    ];

    const healthTips = [
        { title: "Stay Hydrated!", desc: "Drink at least 8 glasses of water daily for optimal body function.", icon: "fa-solid fa-glass-water", color: "bg-teal-50 border-[#2E95A0] text-[#2E95A0]" },
        { title: "Checkup Reminder", desc: "Your annual physical checkup is due in 3 weeks. Schedule it now!", icon: "fa-solid fa-calendar-check", color: "bg-blue-50 border-blue-400 text-blue-500" },
        { title: "Sleep Well", desc: "Aim for 7-9 hours of quality sleep every night for better health.", icon: "fa-solid fa-moon", color: "bg-indigo-50 border-indigo-400 text-indigo-500" },
        { title: "Stay Active", desc: "30 minutes of daily exercise can significantly improve your health.", icon: "fa-solid fa-person-running", color: "bg-green-50 border-green-400 text-green-500" },
    ];

    return (
        <div className="min-h-screen bg-[#F3F4F6] pt-28 pb-10 px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

                {/* Sidebar */}
                <aside className="w-full lg:w-64 flex flex-col gap-4">
                    {/* Profile Card */}
                    <div className="bg-white mt-10 rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-br from-[#2E95A0] to-[#00464B]"></div>
                        <div className="relative z-10 mt-6 mb-3">
                            <div className="w-18 h-18 mx-auto">
                                <div className="w-[72px] h-[72px] rounded-full bg-[#E0F2F1] flex items-center justify-center border-[3px] border-white shadow-lg overflow-hidden mx-auto">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-[#2E95A0]">
                                            {user.name.split(" ").map((n) => n[0]).join("")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <h2 className="text-sm font-bold text-[#00464B] relative z-10">{user.name}</h2>
                        <p className="text-[10px] text-gray-400 mb-3 relative z-10">{user.email}</p>

                        <div className="w-full h-px bg-gray-100 mb-3"></div>

                        <div className="flex gap-6 w-full justify-center">
                            <div className="text-center">
                                <p className="text-sm font-bold text-[#2E95A0]">{stats.appointments}</p>
                                <p className="text-[8px] uppercase text-gray-400 font-bold tracking-wider">Bookings</p>
                            </div>
                            <div className="w-px h-7 bg-gray-100"></div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-[#2E95A0]">{stats.likes}</p>
                                <p className="text-[8px] uppercase text-gray-400 font-bold tracking-wider">Favorites</p>
                            </div>
                            <div className="w-px h-7 bg-gray-100"></div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-[#2E95A0]">{stats.healthScore}%</p>
                                <p className="text-[8px] uppercase text-gray-400 font-bold tracking-wider">Health</p>
                            </div>
                        </div>

                        <Link
                            href="/edit-profile"
                            className="mt-3 w-full py-2 rounded-xl border border-[#2E95A0]/20 text-[10px] font-bold text-[#2E95A0] hover:bg-[#2E95A0] hover:text-white transition-all duration-300 text-center block"
                        >
                            <i className="fa-solid fa-pen mr-1"></i> Edit Profile
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href || "#"}
                                onClick={() => !item.href && setActiveTab(item.id)}
                                className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 border-l-[3px] ${activeTab === item.id
                                        ? "bg-[#F8FCFC] border-[#2E95A0] text-[#2E95A0]"
                                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#2E95A0]"
                                    }`}
                            >
                                <i className={`${item.icon} text-xs w-5`}></i>
                                <span className="text-[11px] font-semibold">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                localStorage.removeItem("isLoggedIn");
                                router.push("/login");
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 border-l-[3px] border-transparent"
                        >
                            <i className="fa-solid fa-right-from-bracket text-xs w-5"></i>
                            <span className="text-[11px] font-semibold">Logout</span>
                        </button>
                    </nav>

                    {/* Health Score Card */}
                    <div className="bg-gradient-to-br from-[#00464B] to-[#2E95A0] rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
                        <div className="absolute top-0 right-0 opacity-10 scale-125">
                            <i className="fa-solid fa-heart-pulse text-5xl p-3"></i>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[9px] text-teal-200 font-bold uppercase tracking-widest mb-2">Health Score</p>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-black">{stats.healthScore}%</span>
                                <span className="text-[9px] text-green-300 font-bold mb-1">
                                    <i className="fa-solid fa-arrow-up text-[7px] mr-0.5"></i>Good
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${stats.healthScore}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-5">

                    {/* Welcome Banner */}
                    <div className="bg-white mt-10 rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2E95A0] opacity-[0.03] rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <p className="text-[10px] text-[#2E95A0] font-bold uppercase tracking-wider mb-1">{greeting}</p>
                                <h1 className="text-xl font-black text-[#00464B] tracking-tight">{user.name} 👋</h1>
                                <p className="text-[11px] text-gray-500 mt-1 max-w-md leading-relaxed">
                                    Track your health journey, manage appointments, and stay connected with your healthcare providers.
                                </p>
                            </div>
                            <Link
                                href="/book-appointment"
                                className="bg-[#2E95A0] text-white px-4 py-2.5 rounded-xl text-[11px] font-bold hover:bg-[#23848f] hover:shadow-lg transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                <i className="fa-solid fa-plus mr-1.5"></i>New Appointment
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-calendar-days text-xs text-[#2E95A0]"></i>
                                </div>
                                <span className="text-[9px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                                    <i className="fa-solid fa-arrow-up text-[8px] mr-0.5"></i>Active
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Appointments</p>
                            <h3 className="text-xl font-bold text-[#00464B] mt-0.5">{stats.appointments}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-heart text-xs text-[#2E95A0]"></i>
                                </div>
                                <span className="text-[9px] font-bold text-[#2E95A0] bg-teal-50 px-1.5 py-0.5 rounded">Total</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Favorites</p>
                            <h3 className="text-xl font-bold text-[#00464B] mt-0.5">{stats.likes}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-comment-medical text-xs text-[#2E95A0]"></i>
                                </div>
                                <span className="text-[9px] font-bold text-[#2E95A0] bg-teal-50 px-1.5 py-0.5 rounded">2 New</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Messages</p>
                            <h3 className="text-xl font-bold text-[#00464B] mt-0.5">{stats.messages}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-center mb-3">
                                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i className="fa-solid fa-stethoscope text-xs text-[#2E95A0]"></i>
                                </div>
                                <span className="text-[9px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">Good</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Health Score</p>
                            <h3 className="text-xl font-bold text-[#00464B] mt-0.5">{stats.healthScore}%</h3>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <h3 className="text-xs font-bold text-[#00464B] uppercase tracking-wider mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {quickActions.map((action, idx) => (
                                <Link
                                    key={idx}
                                    href={action.href}
                                    className={`bg-gradient-to-br ${action.color} text-white p-3 rounded-xl flex items-center gap-2.5 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
                                >
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <i className={`${action.icon} text-xs`}></i>
                                    </div>
                                    <span className="text-[11px] font-semibold">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                        {/* Recent Appointments */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-[#F8FCFC]">
                                <h3 className="text-sm font-bold text-[#00464B]">Recent Appointments</h3>
                                <Link href="/history" className="text-[10px] font-bold text-[#2E95A0] hover:underline">View All →</Link>
                            </div>
                            <div>
                                {recentAppointments.length > 0 ? (
                                    <div className="divide-y divide-gray-50">
                                        {recentAppointments.map((appt) => (
                                            <div key={appt.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-[#2E95A0]">
                                                        <i className="fa-solid fa-user-doctor text-xs"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-bold text-gray-800">{appt.doctor}</h4>
                                                        <p className="text-[9px] text-gray-400">{appt.appointmentDate} • {appt.appointmentTime}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${appt.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-teal-50 text-teal-600"
                                                    }`}>
                                                    {appt.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-400">
                                        <i className="fa-solid fa-calendar-xmark text-2xl mb-2 block text-gray-200"></i>
                                        <p className="text-[11px]">No recent appointments found.</p>
                                        <Link href="/book-appointment" className="text-[10px] text-[#2E95A0] font-bold hover:underline mt-1 inline-block">Book Now →</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Health Insights */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-sm font-bold text-[#00464B]">Health Insights</h3>
                                <span className="text-[9px] bg-teal-50 text-[#2E95A0] px-1.5 py-0.5 rounded font-bold">
                                    <i className="fa-solid fa-lightbulb text-[8px] mr-0.5"></i> Tips
                                </span>
                            </div>
                            <div className="p-3 flex flex-col gap-2">
                                {healthTips.map((tip, idx) => (
                                    <div key={idx} className={`p-3 rounded-lg ${tip.color.split(" ")[0]} border-l-[3px] ${tip.color.split(" ")[1]} flex items-start gap-3`}>
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tip.color.split(" ")[0]}`}>
                                            <i className={`${tip.icon} text-[10px] ${tip.color.split(" ")[2]}`}></i>
                                        </div>
                                        <div>
                                            <h5 className="text-[11px] font-bold text-[#00464B] mb-0.5">{tip.title}</h5>
                                            <p className="text-[10px] text-gray-500 leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User Info & Activity Summary */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                        {/* Profile Summary */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-50">
                                <h3 className="text-sm font-bold text-[#00464B]">Profile Details</h3>
                            </div>
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50/50">
                                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-user text-[10px] text-[#2E95A0]"></i>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-medium">Full Name</p>
                                        <p className="text-[11px] font-semibold text-gray-700">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50/50">
                                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-envelope text-[10px] text-[#2E95A0]"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-gray-400 font-medium">Email</p>
                                        <p className="text-[11px] font-semibold text-gray-700 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50/50">
                                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-phone text-[10px] text-[#2E95A0]"></i>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-medium">Phone</p>
                                        <p className="text-[11px] font-semibold text-gray-700">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50/50">
                                    <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                                        <i className="fa-solid fa-location-dot text-[10px] text-[#2E95A0]"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-gray-400 font-medium">Address</p>
                                        <p className="text-[11px] font-semibold text-gray-700 truncate">{user.address}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/edit-profile"
                                    className="mt-1 text-center py-2 rounded-lg border border-[#2E95A0]/20 text-[10px] font-bold text-[#2E95A0] hover:bg-[#2E95A0] hover:text-white transition-all"
                                >
                                    <i className="fa-solid fa-pen-to-square mr-1"></i>Update Profile
                                </Link>
                            </div>
                        </div>

                        {/* Activity Summary */}
                        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-50">
                                <h3 className="text-sm font-bold text-[#00464B]">Your Activity</h3>
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-3">
                                <Link href="/history" className="p-4 rounded-xl bg-gray-50/50 hover:bg-teal-50/50 border border-gray-100 hover:border-[#2E95A0]/20 transition-all group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-clock-rotate-left text-xs text-[#2E95A0]"></i>
                                        <span className="text-[10px] font-bold text-[#00464B]">Booking History</span>
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-relaxed">View all your past and upcoming appointments</p>
                                    <span className="text-[9px] text-[#2E95A0] font-bold mt-2 inline-block group-hover:translate-x-0.5 transition-transform">View →</span>
                                </Link>

                                <Link href="/likes" className="p-4 rounded-xl bg-gray-50/50 hover:bg-teal-50/50 border border-gray-100 hover:border-[#2E95A0]/20 transition-all group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-heart text-xs text-[#2E95A0]"></i>
                                        <span className="text-[10px] font-bold text-[#00464B]">Saved Doctors</span>
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-relaxed">Quickly access your favorite healthcare providers</p>
                                    <span className="text-[9px] text-[#2E95A0] font-bold mt-2 inline-block group-hover:translate-x-0.5 transition-transform">View →</span>
                                </Link>

                                <Link href="/medicine" className="p-4 rounded-xl bg-gray-50/50 hover:bg-teal-50/50 border border-gray-100 hover:border-[#2E95A0]/20 transition-all group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-capsules text-xs text-[#2E95A0]"></i>
                                        <span className="text-[10px] font-bold text-[#00464B]">Medicine Store</span>
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-relaxed">Browse and find medicines for your needs</p>
                                    <span className="text-[9px] text-[#2E95A0] font-bold mt-2 inline-block group-hover:translate-x-0.5 transition-transform">Browse →</span>
                                </Link>

                                <Link href="/news" className="p-4 rounded-xl bg-gray-50/50 hover:bg-teal-50/50 border border-gray-100 hover:border-[#2E95A0]/20 transition-all group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-newspaper text-xs text-[#2E95A0]"></i>
                                        <span className="text-[10px] font-bold text-[#00464B]">Health News</span>
                                    </div>
                                    <p className="text-[9px] text-gray-400 leading-relaxed">Stay updated with the latest health news</p>
                                    <span className="text-[9px] text-[#2E95A0] font-bold mt-2 inline-block group-hover:translate-x-0.5 transition-transform">Read →</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
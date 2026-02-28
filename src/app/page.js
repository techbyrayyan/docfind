"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Counter from "../components/Counter";
import TeamSection from "../components/TeamSection";
import TestimonialSection from "../components/TestimonialSection";
import ServiceCard from "../components/ServiceCard";
import { cityHospitalsData } from "@/data/cityHospitalsData";

const SERVICES = [
  { img: "/img/034-hospital.png", title: "Therapiya", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium.", imgClassName: "mt-[-30px]" },
  { img: "/img/028-clipboard.png", title: "Dentistry", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium.", imgClassName: "mt-[-30px]" },
  { img: "/img/005-medical app.png", title: "Virosology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
  { img: "/img/asset-3.png", title: "Pharmacology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
  { img: "/img/asset-4.png", title: "Cardology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
  { img: "/img/024-stethoscope.png", title: "Researches", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
];

export default function Home() {
  const router = useRouter();
  const [getInTouchData, setGetInTouchData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [hospitalsData, setHospitalsData] = useState(cityHospitalsData);
  const [visibleHospitals, setVisibleHospitals] = useState(3);
  const [isClient, setIsClient] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with localStorage for two-way synchronization
  useEffect(() => {
    setIsClient(true);

    // Use top-level imported cityHospitalsData

    // FORCE RESET: Always use the master data from the file to ensure the UI matches the code.
    // This overwrites any previous local edits (like "Doctor Hospital" vs "Mayo Hospital").
    console.log("Forcing reset to master dataset to resolve mismatches.");
    localStorage.setItem("docfind_hospitals", JSON.stringify(cityHospitalsData));
    setHospitalsData(cityHospitalsData);

    // Listen for storage changes (real-time sync between tabs)
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

  const handleGetInTouchChange = (e) => {
    const { name, value } = e.target;
    setGetInTouchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetInTouchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("getInTouchData", JSON.stringify(getInTouchData));
    alert("Message sent successfully! Data saved to local storage.");
    setGetInTouchData({ name: "", email: "", message: "" });
  };

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
  return (
    <>
      {/* ✅ Header */}
      <header
        className="pt-20 h-auto md:h-[700px]"
        style={{
          width: "100%",
          backgroundImage: "url('/img/Mask Group 16.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <main className="grid place-items-center">
          <div className="mt-10 md:mt-25 flex h-fit w-full max-w-250 flex-col items-center justify-between md:flex-row">
            <div className="text-center md:text-left">
              <h5 className="mt-10 font-semibold text-[#2E95A0]">
                Markets and Resources{" "}
              </h5>
              <h1 className="mt-[30px] text-4xl md:text-5xl font-bold leading-tight md:leading-[60px] text-[#005963]">
                Find The Best <br />
                Doctor Near By You
              </h1>
              <div className="mt-10 flex justify-center md:justify-start">
                <Link
                  href=""
                  className="rounded-sm bg-[#2E95A0] px-7 py-2 text-[13px] text-white"
                >
                  Get A Quote{" "}
                </Link>
                <Link
                  href=""
                  className="mx-3 rounded-sm border border-[#537174] px-7 py-2 text-[13px]"
                >
                  Read More{" "}
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:ml-30">
              <Image
                src="/img/Mask Group 19.png"
                alt="Banner"
                width={350}
                height={350}
                className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
              />
            </div>
          </div>
        </main>
      </header>



      {/* ✅ Section 1 */}
      <section
        className="grid h-auto md:h-[400px] w-full place-items-center"
        style={{ backgroundImage: "url('/img/Group 9478.png')" }}
      >
        <div className="mt-[50px] md:mt-[-150px] ml-0 md:ml-2 h-auto md:h-[300px] w-full max-w-250 bg-white p-6 md:p-10 md:px-20 shadow-lg mx-4 md:mx-0">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 md:gap-0">
            <h1 className="text-2xl md:text-3xl font-bold text-[#005963]">
              Present Tempor Dictom <br /> Tellus ut mollestie
            </h1>
            <Link
              href=""
              className="rounded-sm bg-[#2E95A0] px-7 py-2 text-white"
            >
              Get A Quote <i className="fa-solid fa-arrow-right mx-3"></i>{" "}
            </Link>
          </div>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center shadow-2xl">
                <img src="/img/034-hospital.png" alt="" />
              </div>
              <div className="">
                <h2 className="font-bold text-[#005963]">Therepiya</h2>
                <p className="mt-4 text-[#005963]">
                  Lorem, ipsum dolor sit <br /> amet consectetur adipisicing
                  elit. Sed, optio.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center shadow-2xl">
                <img src="/img/034-hospital.png" alt="" />
              </div>
              <div className="">
                <h2 className="font-bold text-[#005963]">Dentistry</h2>
                <p className="mt-4 text-[#005963]">
                  Lorem, ipsum dolor sit amet <br /> consectetur adipisicing
                  elit. Sed, optio.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center shadow-2xl">
                <img src="/img/034-hospital.png" alt="" />
              </div>
              <div className="">
                <h2 className="font-bold text-[#005963]">Virosology</h2>
                <p className="mt-4 text-[#005963]">
                  Lorem, ipsum dolor sit amet <br />
                  consectetur adipisicing elit. Sed, optio.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-300 flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-10 px-4 md:px-10 text-center sm:flex-row sm:px-20 pb-10 md:pb-0">
          <div className="w-1/2 sm:w-auto">
            <img
              className="mx-auto mb-2 h-[50px] w-[50px]"
              src="/img/001-hospital bed.png"
              alt=""
            />
            <Counter
              end={3500}
              className="text-4xl md:text-5xl font-bold text-white block"
            />
            <p className="text-white">Happy Customers</p>
          </div>
          <div className="w-1/2 sm:w-auto">
            <img
              className="mx-auto mb-2 h-[50px] w-[50px]"
              src="/img/asset-10.png"
              alt=""
            />
            <Counter
              end={541}
              className="text-4xl md:text-5xl font-bold text-white block"
            />
            <p className="text-white">Project Done</p>
          </div>
          <div className="w-1/2 sm:w-auto">
            <img
              className="mx-auto mb-2 h-[50px] w-[60px]"
              src="/img/020-heart.png"
              alt=""
            />
            <Counter end={40} className="text-4xl md:text-5xl font-bold text-white block" />
            <p className="text-white">Awards Win</p>
          </div>
          <div className="w-1/2 sm:w-auto">
            <img
              className="mx-auto mb-2 h-[50px] w-[50px]"
              src="/img/asset-9.png"
              alt=""
            />
            <Counter
              end={678}
              className="text-4xl md:text-5xl font-bold text-white block"
            />
            <p className="text-white">Client Works</p>
          </div>
        </div>
      </section>

      {/* hospital section */}
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

        {/* ✅ Edit Modal for Real-time Two-way Sync Test */}
        {editingHospital && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
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
                  className="w-full bg-gradient-to-r from-[#2E95A0] to-[#00464B] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
                >
                  Confirm Changes & Sync
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ✅ Next Section */}
      <section className="gap-10 md:gap-30 flex flex-col md:flex-row h-auto md:h-150 w-full items-center justify-center bg-white py-10 md:py-0 px-4">
        <div>
          <Image
            className="h-[300px] w-[300px] md:h-[400px] md:w-[400px]"
            src="/img/Mask Group 18.png"
            alt="Essential Services"
            width={400}
            height={400}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-[#005963]">
            We Provide <br /> Essential Services <br /> For Your Health
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
            <div>
              <h5 className="mt-10 font-bold text-[#005963]">
                Quality Control System
              </h5>
              <p>
                Lorem ipsum, dolor <br /> sit amet consectetur <br />{" "}
                adipisicing elit. Natus,
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:ml-10">
              <h5 className="mt-0 md:mt-10 font-bold text-[#005963]">
                High Professional Staff
              </h5>
              <p>
                Lorem ipsum, dolor <br /> sit amet consectetur <br />{" "}
                adipisicing elit. Natus,
              </p>
            </div>
          </div>
          <div className="mt-7">
            <Link
              href=""
              className="rounded-sm bg-[#2E95A0] px-7 py-2 text-white"
            >
              Get A Quote <i className="fa-solid fa-arrow-right"></i>{" "}
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Our Team */}
      <TeamSection className="mb-20 md:mb-0" />

      {/* ✅ Services Section */}
      <section
        className="h-auto md:h-170 w-full"
        style={{ backgroundImage: "url('/img/Group 9478.png')" }}
      >
        <div className="flex items-center justify-center">
          <p className="mt-10 text-[20px] font-bold text-white">What We Do</p>
        </div>
        <div className="flex items-center justify-center">
          <h3 className="mt-5 text-4xl font-bold text-white">
            Services For You
          </h3>
        </div>
        <div className="px-4 md:px-30 grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-6 py-10">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              img={service.img}
              title={service.title}
              description={service.description}
              imgClassName={service.imgClassName}
            />
          ))}
        </div>
      </section>

      {/* ✅ Testimonial Section */}
      <TestimonialSection className="py-10 md:py-0" />

      {/* ✅ Get In Touch Section */}
      <section className="mx-auto h-130 flex flex-col md:flex-row w-full max-w-6xl items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md my-10 px-4 md:px-0">
        {/* Left Image */}
        <div className="h-64 md:h-120 w-full md:w-110">
          <Image
            src="/img/Mask Group 24.png"
            alt="Doctors"
            width={440}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="  h-auto md:h-120 w-full md:w-130   bg-teal-500 p-10 text-white">
          <h2 className="mb-2 text-3xl font-bold">Get In Touch</h2>
          <p className="mb-6 text-sm text-gray-100">
            We will be happy to answer your questions
          </p>

          <form onSubmit={handleGetInTouchSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={getInTouchData.name}
                onChange={handleGetInTouchChange}
                placeholder="Name"
                className="w-full rounded-md border border-white/60 bg-transparent px-4 py-3 text-white placeholder-gray-100 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <i className="fa-solid fa-user absolute top-3.5 right-4 text-gray-200"></i>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={getInTouchData.email}
                onChange={handleGetInTouchChange}
                placeholder="Email"
                className="w-full rounded-md border border-white/60 bg-transparent px-4 py-3 text-white placeholder-gray-100 focus:ring-2 focus:ring-white focus:outline-none"
                required
              />
              <i className="fa-solid fa-envelope absolute top-3.5 right-4 text-gray-200"></i>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={getInTouchData.message}
                onChange={handleGetInTouchChange}
                placeholder="Message"
                rows={3}
                className="w-full rounded-md border border-white/60 bg-transparent px-4 py-3 text-white placeholder-gray-100 focus:ring-2 focus:ring-white focus:outline-none"
                required
              ></textarea>
              <i className="fa-solid fa-message absolute top-3.5 right-4 text-gray-200"></i>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-teal-700 py-3 font-semibold text-white transition hover:bg-teal-800"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* ✅ Insights Section */}
      <section className="bg-white px-6 py-20 md:px-20">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="font-semibold tracking-wide text-teal-600 uppercase">
            Latest News
          </p>
          <h2 className="mt-2 text-4xl font-bold text-[#005963]">
            Our Insights & Articles
          </h2>
        </div>

        {/* Cards Container */}
        <div className="grid justify-center gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-lg border border-gray-100 overflow-hidden bg-white shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative">
              <Image
                src="/img/Mask Group 21.png"
                alt="Article"
                width={400}
                height={224}
                className="h-56 w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                28 January, 2020
              </span>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center space-x-4 text-xs text-gray-500 uppercase">
                <span>
                  <i className="fa-regular fa-user mr-1"></i>By Admin
                </span>
                <span>
                  <i className="fa-solid fa-plane mr-1"></i>Air Transport
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#005963dc]">
                Having overweight and depression can
              </h3>
              <Link
                href="#"
                className="font-semibold text-teal-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border border-gray-100 overflow-hidden bg-white shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative">
              <Image
                src="/img/Mask Group 22.png"
                alt="Article"
                width={400}
                height={224}
                className="h-56 w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                28 January, 2020
              </span>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center space-x-4 text-xs text-gray-500 uppercase">
                <span>
                  <i className="fa-regular fa-user mr-1"></i>By Admin
                </span>
                <span>
                  <i className="fa-solid fa-plane mr-1"></i>Air Transport
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#005963dc]">
                The connection between post-traumatic
              </h3>
              <Link
                href="#"
                className="font-semibold text-teal-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border border-gray-100 overflow-hidden bg-white shadow-md transition duration-300 hover:shadow-lg">
            <div className="relative">
              <Image
                src="/img/Mask Group 23.png"
                alt="Article"
                width={400}
                height={224}
                className="h-56 w-full object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                28 January, 2020
              </span>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center space-x-4 text-xs text-gray-500 uppercase">
                <span>
                  <i className="fa-regular fa-user mr-1"></i>By Admin
                </span>
                <span>
                  <i className="fa-solid fa-plane mr-1"></i>Air Transport
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#005963dc]">
                Adjusting to life with a spinal cord injury
              </h3>
              <Link
                href="#"
                className="font-semibold text-teal-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

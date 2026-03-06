"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Counter from "../components/Counter";
import TeamSection from "../components/TeamSection";
import TestimonialSection from "../components/TestimonialSection";
import ServiceCard from "../components/ServiceCard";
import HomeHospitals from "../components/HomeHospitals";
import { cityHospitalsData } from "@/app/data/cityHospitalsData";

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
      <HomeHospitals />

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

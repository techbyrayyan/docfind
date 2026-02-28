"use client";

import Image from "next/image";
import Link from "next/link";
import Counter from "../../components/Counter";
import TeamSection from "../../components/TeamSection";

export default function About() {
    return (
        <>
            <header
                className="pt-20 md:pt-0"
                style={{
                    height: "auto",
                    minHeight: "550px", // Use minHeight for responsiveness
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div
                    className="flex w-full flex-col items-center justify-center h-[300px] md:h-[550px]"
                    style={{
                        // height handled by class
                    }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-[#005963]">ABOUT US</h1>
                    <p className="mt-4 text-[#005963]">Home | About Us</p>
                </div>
            </header>

            {/* Next Section */}
            <section
                className="bg-cover bg-center"
                style={{ backgroundImage: "url('/img/Group 9478.png')" }}
            >
                {/* Background pattern optional */}
                <div className="absolute inset-0 bg-[url('/img/bg-pattern.png')] bg-cover bg-center opacity-10"></div>

                <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 w-full max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div className="flex items-center justify-center py-10 md:py-20">
                        <div className="px-6 md:px-10 text-white lg:px-20 text-center md:text-left">
                            <h2 className="mb-4 text-3xl md:text-4xl font-extrabold leading-tight sm:text-5xl">
                                Why Choose <br /> Docfind Clinic?
                            </h2>
                            <p className="mb-10 max-w-[550px] mx-auto md:mx-0 text-[15px] leading-relaxed text-gray-200">
                                Amet onsetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat, sed diam
                                voluptua. At vero eos et accusam et justo duo dolores et ea
                            </p>

                            {/* Feature 1 */}
                            <div className="mb-6 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                <div className="rounded-full bg-[#00BFA6] bg-opacity-20 p-3">
                                    <img src="/img/asset-1.png" alt="icon1" className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-bold text-white">
                                        Quality Control System
                                    </h3>
                                    <p className="max-w-[450px] text-[14px] leading-relaxed text-gray-200">
                                        Sonsetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                        invidunt ut labore sadipscing
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                                <div className="rounded-full bg-[#00BFA6] bg-opacity-20 p-3">
                                    <img src="/img/asset-2.png" alt="icon2" className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-bold text-white">
                                        Highly Professional Staff
                                    </h3>
                                    <p className="max-w-[450px] text-[14px] leading-relaxed text-gray-200">
                                        Lorem ipsum dolor sit amet, consectetur sadipscing elitr,
                                        sed diam nonumy eirmod tempor
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="relative flex justify-center py-10 md:py-20 lg:justify-end lg:pr-20 px-4 md:px-0">
                        {/* Top Image */}
                        <Image
                            src="/img/Mask Group 21.png"
                            alt="Doctors"
                            width={380}
                            height={300}
                            className="w-[280px] sm:w-[320px] md:w-[320px] rounded-lg object-cover shadow-xl"
                        />

                        {/* Bottom Overlapping Image */}
                        <Image
                            src="/img/Mask Group 34.png"
                            alt="Surgery"
                            width={300}
                            height={200}
                            className="absolute right-auto bottom-0 md:right-10 md:bottom-10 w-[240px] sm:w-[300px] md:w-[240px] rounded-lg border-4 border-[#006D6D] shadow-xl translate-y-1/2 md:translate-y-0"
                        />
                    </div>
                </div>
            </section>

            {/* Counter Strip */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-5 bg-[#00aab0] p-10 text-center px-4 md:px-20 mt-20 md:mt-0">
                <div>
                    <Counter
                        end={3500}
                        className="block text-4xl md:text-5xl font-bold text-white"
                    />
                    <p className="text-white">Happy Customers</p>
                </div>
                <div>
                    <Counter end={541} className="block text-4xl md:text-5xl font-bold text-white" />
                    <p className="text-white">Project Done</p>
                </div>
                <div>
                    <Counter end={40} className="block text-4xl md:text-5xl font-bold text-white" />
                    <p className="text-white">Awards Win</p>
                </div>
                <div>
                    <Counter end={678} className="block text-4xl md:text-5xl font-bold text-white" />
                    <p className="text-white">Client Works</p>
                </div>
            </div>

            {/* ✅ Our Team */}
            <TeamSection className="py-20" />
        </>
    );
}

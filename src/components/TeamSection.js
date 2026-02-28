"use client";

import Image from "next/image";

export default function TeamSection({ className = "" }) {
    // Default classes that are common.
    // We'll append the passed className.
    // Original page.js: bg-[#FCF7FF] mb-20 md:mb-0
    // Original about/page.js: bg-[#FCF7FF] py-20
    // So bg color is common. Layout (h-auto md:h-140) is common.

    return (
        <section className={`h-auto md:h-140 w-full bg-[#FCF7FF] ${className}`}>
            <div className="flex items-center justify-center">
                <p className="mt-10 md:mt-2 font-bold text-[#2E95A0]">Meet Our Team</p>
            </div>
            <div className="flex items-center justify-center">
                <h3 className="mt-5 md:mt-3 text-4xl md:text-3xl lg:text-4xl font-bold text-[#005963]">
                    Our Creative Team
                </h3>
            </div>

            <div className="mt-15 md:mt-10 flex flex-wrap items-center justify-center gap-20 pb-20 md:pb-0 px-4">
                {/* Team Member 1 */}
                <div className="relative mb-20 md:mb-0">
                    <div className="h-[200px] w-[180px]">
                        <Image
                            src="/img/Mask Group 29.png"
                            alt="Mega Nelson"
                            width={180}
                            height={200}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-[170px] md:top-[150px] left-3.5 h-[130px] w-[150px] bg-white shadow-lg">
                        <h5 className="ml-7 mt-3 text-[15px] text-[#005963]">Mega Nelson</h5>
                        <p className="ml-5 text-[#005963]">Loareet Gravita</p>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <i className="fa-brands fa-facebook text-[#005963]"></i>
                            <i className="fa-brands fa-instagram text-[#005963]"></i>
                            <i className="fa-brands fa-twitter text-[#005963]"></i>
                        </div>
                    </div>
                </div>

                {/* Team Member 2 */}
                <div className="relative mb-20 md:mb-0">
                    <div className="h-[200px] w-[180px]">
                        <Image
                            src="/img/Mask Group 30.png"
                            alt="Doris Griffin"
                            width={180}
                            height={200}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-[170px] md:top-[150px] left-3.5 h-[130px] w-[150px] bg-white shadow-lg">
                        <h5 className="ml-7 mt-3 text-[15px] text-[#005963]">Doris Griffin</h5>
                        <p className="ml-5 text-[#005963]">Agdydju Ftriun</p>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <i className="fa-brands fa-facebook text-[#005963]"></i>
                            <i className="fa-brands fa-instagram text-[#005963]"></i>
                            <i className="fa-brands fa-twitter text-[#005963]"></i>
                        </div>
                    </div>
                </div>

                {/* Team Member 3 */}
                <div className="relative mb-20 md:mb-0">
                    <div className="h-[200px] w-[180px]">
                        <Image
                            src="/img/Mask Group 31.png"
                            alt="Adam Gilbert"
                            width={180}
                            height={200}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-[170px] md:top-[150px] left-3.5 h-[130px] w-[150px] bg-white shadow-lg">
                        <h5 className="ml-7 mt-3 text-[15px] text-[#005963]">Adam Gilbert</h5>
                        <p className="ml-5 text-[#005963]">Lirefbg Descrivre</p>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <i className="fa-brands fa-facebook text-[#005963]"></i>
                            <i className="fa-brands fa-instagram text-[#005963]"></i>
                            <i className="fa-brands fa-twitter text-[#005963]"></i>
                        </div>
                    </div>
                </div>

                {/* Team Member 4 */}
                <div className="relative mb-20 md:mb-0">
                    <div className="h-[200px] w-[180px]">
                        <Image
                            src="/img/Mask Group 32.png"
                            alt="Steve Cooper"
                            width={180}
                            height={200}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-[170px] md:top-[150px] left-3.5 h-[130px] w-[150px] bg-white shadow-lg">
                        <h5 className="ml-7 mt-3 text-[15px] text-[#005963]">Steve Cooper</h5>
                        <p className="ml-5 text-[#005963]">Versatile Nonies</p>
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <i className="fa-brands fa-facebook text-[#005963]"></i>
                            <i className="fa-brands fa-instagram text-[#005963]"></i>
                            <i className="fa-brands fa-twitter text-[#005963]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

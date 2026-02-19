"use client";

import Image from "next/image";

export default function TestimonialSection({ className = "" }) {
    return (
        <section className={`h-auto md:h-110 w-full bg-[#FCF7FF] ${className}`}>
            <div className="flex items-center justify-center">
                <p className="mt-10 text-[15px] font-bold text-[#2E95A0]">
                    Clients Testimonial
                </p>
            </div>
            <div className="flex items-center justify-center">
                <h3 className="mt-5 text-4xl font-bold text-[#005963]">
                    What Our Clients Say
                </h3>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10 md:mt-0 pb-10 md:pb-0 px-4 md:px-0">
                <div className="h-50 w-full md:w-100 mt-8 bg-white py-10 shadow-sm mx-4 md:mx-0 px-8">
                    <div className="relative flex items-center justify-center gap-3">
                        <Image
                            src="/img/Mask Group -2.png"
                            className=""
                            height={50}
                            width={50}
                            alt="Eugene Freeman"
                        />
                        <i className="fa-solid fa-quote-left absolute top-[30px] left-[140px] md:left-[110px] rounded-full bg-[#005963] p-1 text-[11px] text-white"></i>
                        <div>
                            <h4 className="ml-2 font-semibold">Eugene Freeman</h4>
                            <h6 className="ml-2 text-[10px] text-gray-700">Tincident</h6>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="text-[#005963] text-center">
                            Lorem ipsum dolor sit amet <br /> consectetur adipisicing <br />
                            elit. Excepturi, eos?
                        </p>
                    </div>
                </div>

                <div className="h-50 w-full md:w-100 mt-8 bg-white py-10 shadow-sm mx-4 md:mx-0 px-8">
                    <div className="relative flex items-center justify-center gap-3">
                        <Image
                            src="/img/Mask Group -3.png"
                            className=""
                            height={50}
                            width={50}
                            alt="Kelly Colman"
                        />
                        <i className="fa-solid fa-quote-left absolute top-[30px] left-[140px] md:left-[110px] ml-3 rounded-full bg-[#005963] p-1 text-[11px] text-white"></i>
                        <div>
                            <h4 className="ml-2 font-semibold">Kelly Colman</h4>
                            <h6 className="ml-2 text-[10px] text-gray-700">Nully nec</h6>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <p className="text-[#005963] text-center">
                            Lorem ipsum dolor sit amet <br /> consectetur adipisicing <br />
                            elit. Excepturi, eos?
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

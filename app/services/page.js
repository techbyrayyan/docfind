"use client";

import Image from "next/image";
import ServiceCard from "../../components/ServiceCard";
import TestimonialSection from "../../components/TestimonialSection";

const SERVICES = [
    { img: "/img/034-hospital.png", title: "Therapiya", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium.", imgClassName: "mt-[-30px]" },
    { img: "/img/028-clipboard.png", title: "Dentistry", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium.", imgClassName: "mt-[-30px]" },
    { img: "/img/005-medical app.png", title: "Virosology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
    { img: "/img/asset-3.png", title: "Pharmacology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
    { img: "/img/asset-4.png", title: "Cardology", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
    { img: "/img/024-stethoscope.png", title: "Researches", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque perferendis ducimus accusantium." },
];

export default function Services() {
    return (
        <>
            <header
                className=""
                style={{
                    height: "550px",
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="flex flex-col justify-center items-center h-full pt-20">
                    <h1 className="text-[#005963] text-5xl font-bold uppercase">
                        Services
                    </h1>
                    <p className="text-[#005963] mt-4 uppercase">Home | Services</p>
                </div>
            </header>

           {/* ✅ Services Section */}
                 <section
                   className="h-auto md:h-170 w-full"
                   style={{ backgroundImage: "url('/img/Group 9478.png')" }}
                 >
                   <div className="flex items-center justify-center">
                     <p className="mt-10 text-[15px] font-bold text-white">What We Do</p>
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

            <section className="flex flex-wrap justify-center items-center gap-10 bg-white py-10">
                <div className="">
                    <Image
                        src="/img/Mask Group 39.png"
                        className="w-55 h-auto"
                        width={240}
                        height={100}
                        alt="Client"
                    />
                </div>
                <div className="">
                    <Image
                        src="/img/Mask Group 37.png"
                        className="w-55 h-auto"
                        width={240}
                        height={100}
                        alt="Client"
                    />
                </div>
                <div className="">
                    <Image
                        src="/img/Mask Group 38.png"
                        className="w-55 h-auto"
                        width={240}
                        height={100}
                        alt="Client"
                    />
                </div>
                <div className="">
                    <Image
                        src="/img/Mask Group 35.png"
                        className="w-55 h-auto"
                        width={240}
                        height={100}
                        alt="Client"
                    />
                </div>
                <div className="">
                    <Image
                        src="/img/Mask Group 36.png"
                        className="w-55 h-auto"
                        width={240}
                        height={100}
                        alt="Client"
                    />
                </div>
            </section>

            {/* Testimonial Section */}
            <TestimonialSection />
        </>
    );
}

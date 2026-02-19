"use client";

import Accordion from "../../components/Accordion";

const faqItems = [
    {
        title: "Can I make an appointment online with White Plains Hospital Kendi?",
        content:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata.",
    },
    {
        title: "Does White Plains Hospital Kendi offer telehealth?",
        content: "Telehealth services are available for certain departments.",
    },
    {
        title: "White Plains Hospital Kendi accepts insurance",
        content: "Yes, most major insurance plans are accepted.",
    },
    {
        title: "Where is White Plains Hospital Kendi's office located?",
        content: "The hospital is located in White Plains, NY.",
    },
    {
        title: "What are White Plains Hospital Kendi's areas of care?",
        content: "The hospital provides gastroenterology, cardiology, and more.",
    },
];

export default function FAQ() {
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
                <div className="flex h-full flex-col items-center justify-center pt-20">
                    <h1 className="text-6xl font-bold text-[#005963] uppercase">FAQ</h1>
                    <p className="mt-4 text-[#005963] uppercase">Home | Faq</p>
                </div>
            </header>

            <section className="flex h-auto w-full flex-col items-center justify-center gap-5 bg-white py-10 lg:flex-row lg:items-start lg:gap-10">
                {/* Accordion */}
                <Accordion items={faqItems} />

                {/* Right Section - Sidebar Booking Widget */}
                <div className="mt-10 h-60 w-full max-w-[300px] overflow-hidden rounded-lg bg-white shadow-md">
                    {/* Header */}
                    <div className="bg-[#e6f1f3] px-4 py-2 font-semibold text-gray-700">
                        Booking Summary
                    </div>

                    {/* Body */}
                    <div className="space-y-2 p-4 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-medium">Date</span>
                            <span>07/10/2020</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Time</span>
                            <span>08:30 PM</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Department</span>
                            <span>Gastrolo­gist</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-medium">Doctor name</span>
                            <span>Dr. Beatrice Willis</span>
                        </div>
                    </div>

                    {/* Footer Button */}
                    <div className="px-4 pb-4">
                        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#00b3b3] py-2 font-medium text-white transition hover:bg-[#009999]">
                            Booked
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

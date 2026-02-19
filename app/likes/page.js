"use client";

import Image from "next/image";

const favoriteDoctors = [
    {
        name: "Matthew Reyes",
        specialty: "Obstetrics & Gynecology",
        institution: "University of California San Francisco",
        campus: "Parnassus Campus",
        location: "San Cristobal",
        experience: "6 - 10 Yrs Experience",
        availability: "Tue, Wed, Thu, Fri",
        rating: 368,
        image: "/img/Mask Group 29.png",
    },
    {
        name: "Matthew Fox",
        specialty: "Obstetrics & Gynecology",
        institution: "University of California San Francisco",
        campus: "Parnassus Campus",
        location: "Zanzibar Town",
        experience: "6 - 10 Yrs Experience",
        availability: "Tue, Wed, Thu, Fri",
        rating: 368,
        image: "/img/Mask Group 30.png",
    },
    {
        name: "Matthew Reyes",
        specialty: "Obstetrics & Gynecology",
        institution: "University of California San Francisco",
        campus: "Parnassus Campus",
        location: "San Cristobal",
        experience: "6 - 10 Yrs Experience",
        availability: "Tue, Wed, Thu, Fri",
        rating: 368,
        image: "/img/Mask Group 32.png",
    },
    {
        name: "Matthew Fox",
        specialty: "Obstetrics & Gynecology",
        institution: "University of California San Francisco",
        campus: "Parnassus Campus",
        location: "Zanzibar Town",
        experience: "6 - 10 Yrs Experience",
        availability: "Tue, Wed, Thu, Fri",
        rating: 368,
        image: "/img/Mask Group 31.png",
    },
];

export default function Likes() {
    return (
        <>
            <header
                className="relative"
                style={{
                    height: "550px",
                    width: "100%",
                    backgroundImage: "url('/img/Mask Group 16.png')",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute top-[280px] left-1/2 flex w-[90%] max-w-[600px] -translate-x-1/2 transform flex-col items-center gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:flex-row">
                    <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble.png')] bg-repeat opacity-10"></div>

                    <div className="relative z-10">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00A0A0] text-4xl font-bold text-[#00A0A0]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="z-10 text-center sm:text-left">
                        <h2 className="mb-1 text-xl font-semibold text-[#005963]">
                            Rayyan Ansari
                        </h2>
                        <div className="mb-1 flex items-center justify-center space-x-2 text-sm text-gray-500 sm:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-[#00A0A0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12a4 4 0 01-8 0m8 0a4 4 0 11-8 0m8 0V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m8 0v6a2 2 0 002 2h4m-4-8h4m-4 0h4"
                                />
                            </svg>
                            <span>techbyrayyan@gmail.com</span>
                            <span className="text-gray-400">•</span>
                            <span>+92 3264734251</span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-500 sm:justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4 text-[#00A0A0]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 0c4.418 0 8 2.239 8 5v3H4v-3c0-2.761 3.582-5 8-5z"
                                />
                            </svg>
                            <span> New Shalimar Colony, Lahore</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="flex h-auto min-h-[500px] flex-col items-center bg-white py-10">
                <h2 className="mb-10 text-2xl font-bold text-[#00464B]">
                    My Favorites
                </h2>

                <div className="grid w-[90%] max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
                    {favoriteDoctors.map((doc, index) => (
                        <div
                            key={index}
                            className="flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
                        >
                            <Image
                                src={doc.image}
                                alt="Doctor"
                                width={150}
                                height={150}
                                className="h-[150px] w-[150px] object-cover"
                            />
                            <div className="flex w-full flex-col justify-between p-5">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#00464B]">
                                        {doc.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                                    <p className="mb-2 text-sm text-gray-400">
                                        {doc.institution} <br /> {doc.campus}
                                    </p>
                                    <div className="flex flex-col gap-1 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
                                        <span>
                                            <i className="fa-solid fa-location-dot mr-1 text-[#00A0A0]"></i>{" "}
                                            {doc.location}
                                        </span>
                                        <span>
                                            <i className="fa-solid fa-user-doctor mr-1 text-[#00A0A0]"></i>{" "}
                                            {doc.experience}
                                        </span>
                                        <span>
                                            <i className="fa-regular fa-calendar mr-1 text-[#00A0A0]"></i>{" "}
                                            {doc.availability}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <button className="rounded bg-[#00A0A0] px-4 py-2 text-sm text-white transition hover:bg-[#008585]">
                                        View More
                                    </button>
                                    <div className="flex items-center gap-2 text-[#00A0A0]">
                                        <i className="fa-solid fa-heart text-[#00A0A0]"></i>
                                        <div className="flex items-center text-yellow-400">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-regular fa-star text-gray-300"></i>
                                            <span className="ml-2 text-xs text-gray-500">
                                                ({doc.rating})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

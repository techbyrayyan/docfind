"use client";

import Image from "next/image";
import Link from "next/link";
import BookingSummary from "../../components/BookingSummary";

const blogPosts = [
    {
        image: "/img/owen-beard-DK-1.png",
        date: "12 October 2025",
        category: "Medical",
        title:
            "Demain quis monad exercitation ullamco laboris nisi ut aliquip commodo laboris",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nostrum. Exercitationem doloremque sed quas velit.",
    },
    {
        image: "/img/luis-melendez-Pd-1.png",
        date: "28 September 2025",
        category: "Doctors",
        title:
            "Demain quis monad exercitation ullamco laboris nisi ut aliquip commodo laboris",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas facilis explicabo officia neque ullam.",
    },
    {
        image: "/img/martha-dominguez-de-gouveia-nMyM-1.png",
        date: "5 August 2025",
        category: "Health",
        title:
            "Demain quis monad exercitation ullamco laboris nisi ut aliquip commodo laboris",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium veniam quisquam accusantium.",
    },
    {
        image: "/img/markus-frieauff-IJ0KiXl4uys-unsplash.png",
        date: "25 July 2025",
        category: "Lifestyle",
        title:
            "Demain quis monad exercitation ullamco laboris nisi ut aliquip commodo laboris",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident dolores quibusdam dolor.",
    },
];

export default function News() {
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
                    <h1 className="text-5xl font-bold text-[#005963] uppercase">
                        News And Updates
                    </h1>
                    <p className="mt-4 text-[#005963] uppercase">
                        Home | News And Updates
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto my-10 grid w-[90%] grid-cols-1 gap-10 lg:w-[80%] lg:grid-cols-3">
                {/* Left Side - Featured Post */}
                <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2">
                    <Image
                        src="/img/owen-beard-DK-1.png"
                        alt="Blog Image"
                        width={800}
                        height={288}
                        className="h-72 w-full object-cover"
                    />

                    <div className="space-y-3 p-6">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase">
                            <span className="text-[#008b8b]">By Admin</span>
                            <span>|</span>
                            <span>28 January, 2020</span>
                        </div>

                        {/* Title */}
                        <h2 className="cursor-pointer text-2xl font-semibold text-[#004d4d] hover:text-[#009999]">
                            Deniam quis norud exerciton ullamco laboris nisiquip commodo
                            lokate
                        </h2>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                            erat, sed diam voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum.
                        </p>

                        {/* Read More */}
                        <a
                            href="#"
                            className="flex items-center text-sm font-semibold text-[#009999] hover:underline"
                        >
                            Read More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-1 h-4 w-4"
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
                        </a>
                    </div>
                </section>

                {/* Right Section - Sidebar Booking Widget */}
                <BookingSummary className="h-60 w-full max-w-[300px]" />
            </main>

            {/* Blog Grid Section */}
            <div className="mx-auto grid h-auto max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-3">
                {/* LEFT SIDE - BLOG POSTS */}
                <div className="space-y-10 lg:col-span-2">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg bg-white shadow"
                        >
                            <Image
                                src={post.image}
                                alt={`Blog ${index + 1}`}
                                width={800}
                                height={360}
                                className="h-90 w-full object-cover"
                            />
                            <div className="p-6">
                                <p className="mb-1 text-sm text-gray-400">
                                    📅 {post.date} • {post.category}
                                </p>
                                <h2 className="mb-2 text-2xl font-semibold text-[#005963]">
                                    {post.title}
                                </h2>
                                <p className="mb-4 text-gray-500">{post.description}</p>
                                <a
                                    href="#"
                                    className="font-semibold text-[#00A0A0] hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    ))}

                    {/* PAGINATION */}
                    <div className="mt-8 flex justify-center space-x-2">
                        <Link
                            href="#"
                            className="rounded border border-gray-300 px-3 py-1 text-gray-600"
                        >
                            1
                        </Link>
                        <Link href="#" className="rounded bg-[#00A0A0] px-3 py-1 text-white">
                            2
                        </Link>
                        <Link
                            href="#"
                            className="rounded border border-gray-300 px-3 py-1 text-gray-600"
                        >
                            3
                        </Link>
                        <Link
                            href="#"
                            className="rounded border border-gray-300 px-3 py-1 text-gray-600"
                        >
                            ›
                        </Link>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="space-y-8">
                    {/* Search */}
                    <div className="rounded-lg bg-white p-5 shadow">
                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 focus:outline-none"
                            />
                            <button className="bg-[#00A0A0] px-4 py-2 text-white">🔍</button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h3 className="mb-4 text-lg font-semibold text-[#005963]">
                            Category
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex justify-between">
                                <span>Eros bibendum</span>
                                <span>(91)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Effictur sed faucibus</span>
                                <span>(43)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Ornare vulputate vitae</span>
                                <span>(43)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Vehicula nisl</span>
                                <span>(2)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Amet laoreet</span>
                                <span>(34)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Archives */}
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h3 className="mb-4 text-lg font-semibold text-[#005963]">
                            Archives
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>January 2024</li>
                            <li>March 2024</li>
                            <li>May 2024</li>
                            <li>July 2024</li>
                        </ul>
                    </div>

                    {/* Recent News */}
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h3 className="mb-4 text-lg font-semibold text-[#005963]">
                            Recent News
                        </h3>
                        <div className="space-y-4">
                            <div className="flex space-x-3">
                                <div className="h-20 w-20 flex-shrink-0 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Integer at faucibus urna. Nullam condimentum
                                    </p>
                                    <p className="mt-1 text-xs text-[#00A0A0]">📅 15 October</p>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <div className="h-20 w-20 flex-shrink-0 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Nunc scelerisque tincidunt estibulum
                                    </p>
                                    <p className="mt-1 text-xs text-[#00A0A0]">📅 21 July</p>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <div className="h-20 w-20 flex-shrink-0 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Cras eu elit congue, plac erat duicidunt nisl
                                    </p>
                                    <p className="mt-1 text-xs text-[#00A0A0]">📅 21 December</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h3 className="mb-4 text-lg font-semibold text-[#005963]">
                            Popular Tags
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="rounded-lg bg-[#00A0A0] px-4 py-1 text-white">
                                Consec
                            </span>
                            <span className="rounded-lg bg-gray-100 px-4 py-1">Seoul</span>
                            <span className="rounded-lg bg-gray-100 px-4 py-1">Vehicula</span>
                            <span className="rounded-lg bg-gray-100 px-4 py-1">
                                Ultricies
                            </span>
                            <span className="rounded-lg bg-gray-100 px-4 py-1">
                                Nisi enim
                            </span>
                            <span className="rounded-lg bg-gray-100 px-4 py-1">
                                Curabitur
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}

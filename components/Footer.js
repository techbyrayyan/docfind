import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        
        <footer className="bg-[#f9f6f8] px-6 py-12 md:px-16">
            <main className="mt-[-60px] flex items-center justify-center">
                <section className="flex w-[90%] flex-col items-center justify-center space-y-6 rounded-2xl bg-white px-8 py-5 shadow-md md:w-[80%] md:flex-row md:space-y-0 md:divide-x md:divide-gray-200 md:py-6 lg:w-[70%]">
                    {/* Address */}
                    <div className="flex items-center justify-center gap-3 px-4 md:w-1/3 md:justify-start">
                        <div className="text-2xl text-teal-600">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Our Address</p>
                            <h4 className="text-[15px] font-semibold text-gray-800">
                                Gulshan-e-Ravi, Lahore
                            </h4>
                        </div>
                    </div>

                    {/* Call */}
                    <div className="flex items-center justify-center gap-3 px-4 md:w-1/3 md:justify-start">
                        <div className="text-2xl text-teal-600">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Call Us</p>
                            <h4 className="text-[15px] font-semibold text-gray-800">
                                +92 3264734251
                            </h4>
                        </div>
                    </div>

                    {/* Mail */}
                    <div className="flex items-center justify-center gap-3 px-4 md:w-1/3 md:justify-start">
                        <div className="text-2xl text-teal-600">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Our Mail</p>
                            <h4 className="text-[15px] font-semibold text-gray-800">
                                techbyrayyan@gmail.com
                            </h4>
                        </div>
                    </div>
                </section>
            </main>
            <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
                {/* Logo + Text */}
                <div>
                    <div className="mb-4 flex items-center space-x-2">
                        <Image
                            src="/img/Logo Dark.png"
                            alt="Logo"
                            width={150}
                            height={40}
                            className="h-auto w-auto"
                        />
                        <h2 className="text-2xl font-bold text-teal-700"></h2>
                    </div>
                    <p className="mb-6 leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consect etuer adipiscing elit, sed diam
                        nonu mmy nibh euis.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-3">
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                        >
                            <i className="fab fa-google"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300"
                        >
                            <i className="fab fa-pinterest"></i>
                        </a>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Services</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Terms of Use
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Our Services
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                New Guests List
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                The Team List
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Useful Links
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Terms of Use
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                Our Services
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                New Guests List
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-teal-600">
                                The Team List
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Subscribe */}
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        Subscribe
                    </h3>
                    <form className="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-teal-600 py-2 text-white transition hover:bg-teal-700"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Get the latest updates via email.
                        <br />
                        Any time you may unsubscribe
                    </p>
                </div>
            </div>
        </footer>
    );
}

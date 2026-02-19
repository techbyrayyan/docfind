import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthGuard from "../components/AuthGuard";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata = {
    title: "Docfind - Find The Best Doctor Near You",
    description: "Find and book appointments with the best doctors near you.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} font-sans antialiased bg-gray-200`}>
                <AuthGuard>
                    <Navbar />
                    {children}
                    <Footer />
                </AuthGuard>
                <Script
                    src="https://kit.fontawesome.com/ea49b7d84d.js"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
            </body>
        </html>
    );
}

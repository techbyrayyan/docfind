"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            const publicPages = ["/login", "/signup", "/signup-email", "/doctor-dashboard", "/forgot-password"];

            // Normalize pathname (remove trailing slash)
            const normalizedPathname = pathname.endsWith("/") && pathname.length > 1
                ? pathname.slice(0, -1)
                : pathname;

            const isAuthPage = publicPages.includes(normalizedPathname);

            // Allow access to public paths if needed (e.g. static assets are handled by Next.js)
            // But we want to protect "pages".

            if (!isLoggedIn) {
                if (!isAuthPage) {
                    // Not logged in and trying to access protected page -> Redirect to login
                    router.push("/login");
                } else {
                    // Not logged in and on auth page -> Allow
                    setAuthorized(true);
                }
            } else {
                if (isAuthPage) {
                    // Logged in and trying to access auth page -> Redirect to home
                    router.push("/");
                } else {
                    // Logged in and on protected page -> Allow
                    setAuthorized(true);
                }
            }
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("auth-change", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("auth-change", checkAuth);
        };
    }, [pathname, router]);

    // Optional: show a loading spinner while checking auth to prevent content flash
    // For now, we'll just return null until authorized
    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}

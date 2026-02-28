"use client";

import { useEffect, useState, useRef } from "react";

export default function Counter({
    end,
    duration = 2000,
    className,
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let start = 0;
        const steps = duration / 20;
        const increment = end / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 20);

        return () => clearInterval(timer);
    }, [hasStarted, end, duration]);

    return (
        <span ref={ref} className={className}>
            {count}
        </span>
    );
}

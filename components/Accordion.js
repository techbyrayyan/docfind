"use client";

import { useState } from "react";
import clsx from "clsx";

function AccordionItem({ title, content, isOpen, onClick }) {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className={clsx(
                    "flex w-full items-center justify-between px-5 py-4 text-left font-semibold transition-colors",
                    isOpen ? "text-[#007b7b]" : "text-gray-800 hover:text-[#007b7b]",
                )}
            >
                {title}
                <span
                    className={clsx(
                        "rounded-md p-1 text-sm font-bold",
                        isOpen
                            ? "bg-[#00b3b3] text-white"
                            : "bg-[#e5f7f7] text-[#00b3b3]",
                    )}
                >
                    {isOpen ? "−" : "+"}
                </span>
            </button>
            <div
                className={clsx(
                    "px-5 text-sm text-gray-600 transition-all duration-300 ease-in-out",
                    isOpen ? "mb-4 max-h-[500px] opacity-100" : "max-h-0 overflow-hidden opacity-0",
                )}
            >
                {content}
            </div>
        </div>
    );
}

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-10 w-full max-w-[700px] rounded-lg border border-gray-200 bg-white shadow-md">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
        </div>
    );
}

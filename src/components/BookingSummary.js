export default function BookingSummary({ className = "" }) {
    return (
        <div className={`overflow-hidden rounded-lg bg-white shadow-md ${className}`}>
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
    );
}

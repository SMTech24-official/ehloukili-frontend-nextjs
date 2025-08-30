import Image from "next/image";
import React from "react";

interface BookingListItem {
    name: string;
    location: string;
    date: string;
    guest: string;
    image: string;
}

interface BookingListProps {
    items: BookingListItem[];
}

const BookingList: React.FC<BookingListProps> = ({ items }) => {
    return (
        <div className="bg-white dark:bg-[var(--color-neutral-900)] rounded-xl border border-gray-100 dark:border-[var(--color-neutral-800)] p-5 overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)]">
                        <th className="py-2 font-medium">Properties Name</th>
                        <th className="py-2 font-medium">Properties Location</th>
                        <th className="py-2 font-medium">Booking Date</th>
                        <th className="py-2 font-medium">Guests Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx} className="border-t border-gray-100 dark:border-[var(--color-neutral-800)]">
                            <td className="py-3 flex items-center gap-2">
                                <Image width={32} height={32} src={item.image} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                                <span className="text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">{item.name}</span>
                            </td>
                            <td className="py-3 text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]">{item.location}</td>
                            <td className="py-3 text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]">{item.date}</td>
                            <td className="py-3 text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]">{item.guest}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="flex justify-end mt-2">
                <button className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-200)] text-sm font-medium hover:underline transition">View All</button>
            </div> */}
        </div>
    );
};

export default BookingList;

import React from "react";

interface BookingEvent {
    time: string;
    title: string;
    status: string;
    date: string;
}

interface BookingTimelineProps {
    events: BookingEvent[];
}

const BookingTimeline: React.FC<BookingTimelineProps> = ({ events }) => {
    // Group by date
    const grouped = events.reduce((acc, event) => {
        if (!acc[event.date]) acc[event.date] = [];
        acc[event.date].push(event);
        return acc;
    }, {} as Record<string, BookingEvent[]>);

    return (
        <div className="bg-white dark:bg-[var(--color-neutral-900)] rounded-xl border border-gray-100 dark:border-[var(--color-neutral-800)] p-5">
            {Object.entries(grouped).map(([date, items]) => (
                <div key={date} className="mb-4 last:mb-0">
                    <div className="font-semibold text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)] mb-2">{date}</div>
                    <ul className="space-y-2">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-xs font-mono text-[var(--color-primary-600)] dark:text-[var(--color-primary-200)] w-12 flex-shrink-0">{item.time}</span>
                                <div>
                                    <div className="text-sm text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">{item.title}</div>
                                    <div className="text-xs font-semibold text-[var(--color-success-600)] dark:text-[var(--color-success-400)]">{item.status}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default BookingTimeline;

import React from "react";

// 1. Stats Card
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex items-center gap-3 bg-white dark:bg-[var(--color-neutral-900)] rounded-xl border border-gray-100 dark:border-[var(--color-neutral-800)] p-5 min-w-[160px] flex-1 transition-shadow hover:shadow-md">
            <div className="p-2 rounded-lg bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-800)] text-[var(--color-primary-600)] dark:text-[var(--color-primary-200)]">
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">{value}</div>
                <div className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] mt-1">{label}</div>
            </div>
        </div>
    );
}

export default StatCard;

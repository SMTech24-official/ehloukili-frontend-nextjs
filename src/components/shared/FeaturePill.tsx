import React from "react";

interface FeaturePillProps {
  icon: React.ReactNode;
  label: string;
}

const FeaturePill: React.FC<FeaturePillProps> = ({ icon, label }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-muted bg-background text-foreground text-sm font-medium shadow-sm transition-colors hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer"
  >
    {icon}
    {label}
  </span>
);

export default FeaturePill;

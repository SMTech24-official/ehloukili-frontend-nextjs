import React from "react";

interface PropertyInfoItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const DetailsInfoItem: React.FC<PropertyInfoItemProps> = ({ label, value, className }) => (
  <div className={className}>
    <div className="text-xs xl:text-sm text-muted-foreground text-gray-400">{label}</div>
    <div className="font-medium text-base xl:text-lg text-foreground dark:text-foreground">{value}</div>
  </div>
);

export default DetailsInfoItem;

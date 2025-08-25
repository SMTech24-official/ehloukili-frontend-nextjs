import React from "react";
import { cn } from "@/utils/classNames";

export interface IDetailsTab {
  label: string;
  icon: React.ReactNode;
}


interface PropertyDetailsTabsProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
  tabList: IDetailsTab[];
}

const DetailsTabs: React.FC<PropertyDetailsTabsProps> = ({ activeTab, setActiveTab, tabList }) => (
  <div className="flex flex-col md:flex-row border-b border-gray-100 border-muted mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-muted/40 scrollbar-track-transparent">
    {tabList.map((tab, idx) => (
      <button
        key={tab.label}
        className={cn(
          "flex items-center gap-2 px-4 py-2 font-medium text-base border-b-2 transition-colors whitespace-nowrap",
          idx === activeTab
            ? "border-primary text-primary dark:text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground dark:hover:text-foreground"
        )}
        onClick={() => setActiveTab(idx)}
        type="button"
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}
  </div>
);

export default DetailsTabs;

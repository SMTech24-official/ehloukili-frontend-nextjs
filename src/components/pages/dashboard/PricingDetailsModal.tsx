/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from "react";
import { Button } from "../../ui/Button";

interface PricingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  plan: {
    amount: string;
    planName: string;
    propertyCount: number;
    description: string;
    features?: string[];
  } | null;
  onUpgrade: () => void;
}

const PricingDetailsModal: React.FC<PricingDetailsModalProps> = ({ open, onClose, plan, onUpgrade }) => {
  if (!open || !plan) return null;
  console.log(plan.features)
  const planFeatures = Array.isArray(plan.features)
    ? plan.features
    : typeof plan.features === "string"
    ? JSON.parse(plan.features)
    : [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[var(--color-neutral-900)] rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in max-h-[85vh] overflow-y-auto">
        <div className="mb-3 text-lg font-semibold text-foreground dark:text-white">{plan.planName}</div>
        <div className="mb-1 text-2xl font-bold text-primary">{plan.amount}</div>
        <div className="mb-2 text-xs text-muted-foreground">{plan.propertyCount} Property Listings</div>
        <div className="mb-3 text-sm text-muted-foreground">{plan.description}</div>
        <ul className="mb-6 list-disc pl-5 space-y-1">
          {planFeatures.map((f:any, i:number) => (
            <li key={f + i} className="text-sm text-foreground dark:text-white">{f}</li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <Button color="ghost" onClick={onClose}>Close</Button>
          <Button color="primary" className="!text-white" onClick={onUpgrade}>Upgrade Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailsModal;

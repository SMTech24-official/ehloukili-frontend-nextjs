import React from "react";
import { Button } from "../ui/Button";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[var(--color-neutral-900)] rounded-xl shadow-xl p-6 w-full max-w-sm animate-fade-in">
        <div className="mb-3 text-lg font-semibold text-foreground dark:text-white">{title}</div>
        <div className="mb-6 text-sm text-muted-foreground">{description}</div>
        <div className="flex justify-end gap-2">
          <Button color="ghost" onClick={onCancel} disabled={loading}>{cancelText}</Button>
          <Button className="!text-white" color="destructive" onClick={onConfirm} isLoading={loading}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

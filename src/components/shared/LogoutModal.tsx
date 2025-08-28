
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Spinner from "@/components/ui/Spinner";

interface LogoutModalProps {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}


const LogoutModal: React.FC<LogoutModalProps> = ({ open, loading, onConfirm, onCancel }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Focus first button
    setTimeout(() => {
      firstButtonRef.current?.focus();
    }, 0);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadein"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm outline-none animate-scalein"
        role="document"
        aria-labelledby="logout-modal-title"
      >
        <div className="flex flex-col items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-red-500 mb-2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="#fee2e2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" className="text-red-700" stroke="#b91c1c" strokeWidth="2" />
          </svg>
          <h2 id="logout-modal-title" className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">Are you sure you want to logout?</h2>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            ref={firstButtonRef}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={onCancel}
            disabled={loading}
            aria-label="Cancel logout"
          >
            No
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 !text-white hover:bg-red-700 flex items-center min-w-[100px] justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            onClick={onConfirm}
            disabled={loading}
            aria-label="Confirm logout"
          >
            {loading ? (
              <Spinner size={18} color="white" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Yes
              </>
            )}
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein {
          animation: fadein 0.2s ease;
        }
        @keyframes scalein {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scalein {
          animation: scalein 0.2s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>,
    typeof window !== "undefined" ? document.body : ({} as HTMLElement)
  );
};

export default LogoutModal;

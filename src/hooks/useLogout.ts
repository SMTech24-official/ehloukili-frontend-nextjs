
import { useCallback, useState } from "react";
import { useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export function useLogoutModal() {
  const [open, setOpen] = useState(false);
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    // Remove accessToken from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    // Remove accessToken from cookies
    if (typeof document !== "undefined") {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    // Call logout mutation
    try {
      await logoutMutation({});
      setOpen(false);
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  }, [logoutMutation]);

  const showModal = useCallback(() => setOpen(true), []);
  const hideModal = useCallback(() => setOpen(false), []);

  return {
    open,
    showModal,
    hideModal,
    handleLogout,
    isLoading,
  };
}

import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/auth";

export const Route = createLazyFileRoute("/logout")({
  component: Logout,
});

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleConfirmLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleCancelLogout = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4">
      <div className="p-2">Are you sure you want to logout?</div>
      <div className="flex gap-4">
        <div
          className="btn btn-outline btn-accent"
          onClick={handleConfirmLogout}
        >
          Yes
        </div>
        <div className="btn btn-outline" onClick={handleCancelLogout}>
          No
        </div>
      </div>
    </div>
  );
}

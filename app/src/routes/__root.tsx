import { useAuthStore } from "@/lib/auth";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuthStore();

    return (
      <>
        <div className="container mx-auto">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link to="/" className="btn btn-ghost text-xl">
                Tasks
              </Link>
            </div>
            {user && (
              <div className="flex-none">
                <Link to="/logout" className="btn btn-ghost text-md">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

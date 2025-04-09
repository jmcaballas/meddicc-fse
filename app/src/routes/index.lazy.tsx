import { LoginForm } from "@/features/auth/components/login-form";
import { TasksList } from "@/features/tasks/components/tasks-list";
import { useAuthStore } from "@/lib/auth";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4">
      {user ? <TasksList /> : <LoginForm />}
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});

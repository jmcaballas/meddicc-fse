import { useAuthStore } from "@/lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { postLogin } from "../api/post-login";
import { LoginInputs, User } from "../types/auth";

export const LoginForm = () => {
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const user: User = await postLogin(data);
    login(user);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col justify-center gap-2"
    >
      <label className="input input-bordered flex items-center gap-2">
        Username
        <input
          {...register("username", { required: "This field is required" })}
          type="text"
          className="grow"
        />
      </label>
      {errors.username && (
        <p className="text-error">{errors.username.message}</p>
      )}
      <label className="input input-bordered flex items-center gap-2">
        Password
        <input
          {...register("password", { required: "This field is required" })}
          type="password"
          className="grow"
        />
      </label>
      {errors.password && (
        <p className="text-error">{errors.password.message}</p>
      )}
      <input type="submit" className="btn" />
    </form>
  );
};

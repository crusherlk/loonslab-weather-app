import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCloudSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//
const userInfo = {
  name: "Sankalpa",
  username: "admin",
  role: "admin",
};

function Login() {
  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = loginForm;
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    const { username, password } = data;

    if (username === "admin" && password === "admin") {
      localStorage.setItem("user", JSON.stringify(userInfo));
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid user credentials");
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-col justify-center items-center min-h-screen gap-5">
        {/* heading */}
        <div className="heading flex flex-col items-center">
          <FaCloudSun className="text-5xl text-orange-500" />
          <h1 className="text-xl font-semibold">WeatherApp</h1>
        </div>
        {/* login form */}
        <div className="form">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required!",
                })}
              />
              <p className="text-sm pl-2 text-red-500">
                {errors.username?.message}
              </p>
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required!",
                })}
              />
              <p className="text-sm pl-2 text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <button className="btn w-full" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;

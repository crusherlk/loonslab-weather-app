import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaCloudSun } from "react-icons/fa";
import { getCurrentUser, logout } from "../services/authService";
import { useEffect } from "react";

function Layout() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <header className="py-5 border-b border-[#e6e6e6]">
        <div className="container mx-auto flex items-center justify-between">
          <div></div>
          <div className="logo">
            <Link to={"/"} className="flex gap-2">
              <FaCloudSun className="text-2xl text-orange-500" />
              <h1 className="text-lg font-semibold">WeatherApp</h1>
            </Link>
          </div>
          <button
            className="btn-outline-sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="min-h-[80vh] my-8">
        <Outlet />
      </main>
      <footer className="text-sm text-center bg-teal-600 text-white py-5">
        Developed by Crusherlk ✌
      </footer>
    </>
  );
}
export default Layout;

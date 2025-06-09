import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar.jsx";
import { useState } from "react";
import { FolderKanban, LogOut, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/thunks/authThunks.js";

const Layout = () => {
  const [openSideBar, setopenSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      console.log("User logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-accent-foreground shadow z-50 flex items-center justify-between px-4">
        <Navbar />
        <Menu
          className="block lg:hidden cursor-pointer absolute z-20 left-5 top-1/2"
          onClick={() => setopenSideBar(true)}
        />
      </header>

      {/* Mobile Sidebar */}
      {openSideBar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70">
          <div className="w-3/4 max-w-xs h-full bg-white relative flex flex-col">
            {/* Close Icon */}
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setopenSideBar(false)}
            />

            {/* Menu Items */}
            <div className="mt-16 px-4 space-y-4 flex-1">
              <Button
                asChild
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => setopenSideBar(false)}
              >
                <Link to="/projects">
                  <FolderKanban size={20} />
                  Projects
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full flex items-center gap-2 text-black"
                onClick={() => setopenSideBar(false)}
              >
                <Link to="/profile">
                  <User size={20} />
                  Profile
                </Link>
              </Button>
            </div>

            {/* Logout Button */}
            <div className="px-4 pb-6">
              <Button
                variant="destructive"
                className="w-full flex items-center gap-2  bg-red-500/60 border-red-500 text-white"
                onClick={() => {
                  setopenSideBar(false);
                  handleLogout();
                }}
              >
                <LogOut size={20} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="flex pt-16 h-full">
        {/* Sidebar (Desktop only) */}
        <aside className="hidden lg:block fixed top-16 bottom-0 left-0 w-60 bg-gray-100 border-r z-40 py-10">
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden lg:ml-60 bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

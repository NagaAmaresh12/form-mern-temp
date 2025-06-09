import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/thunks/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createAvatar } from "@dicebear/core";
import * as bigSmile from "@dicebear/big-smile";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarSeed = useSelector((state) => state.auth?.user?.avatarSeed);
  const [avatarUri, setAvatarUri] = useState("");

  useEffect(() => {
    const generateAvatar = async () => {
      if (!avatarSeed) return;

      const avatar = createAvatar(bigSmile, {
        seed: avatarSeed,
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      });
      const uri = avatar.toDataUri();
      setAvatarUri(uri);
    };

    generateAvatar();
  }, [avatarSeed]);

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
    <div className="absolute bg-white px-10 left-0 top-0 h-24 w-full flex items-center justify-between border-[1px] border-zinc-300">
      <div></div>
      <div className="flex  gap-6 items-center  justify-end lg:space-x-4   w-60">
        <Button
          asChild
          className={
            "hidden  lg:w-1/2 lg:flex text-white hover:scale-105 transition"
          }
        >
          <Link
            onClick={handleLogout}
            className={"border-4 border-rose-500 bg-rose-500/80 text-white"}
          >
            <LogOut />
            LogOut
          </Link>
        </Button>

        <Link
          to={"/profile"}
          className="avatar h-10 w-10 flex items-center justify-center rounded-full border-[1px] border-zinc-900 overflow-hidden"
        >
          {avatarUri && (
            <img
              src={avatarUri}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

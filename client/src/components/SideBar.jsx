import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FolderKanban, User } from "lucide-react";

const SideBar = () => {
  return (
    <div className="">
      <Button
        asChild
        variant={"outline"}
        className={
          "bg-zinc-900 text-white w-full mb-2 text-lg  py-6 flex items-center justify-center pl-2"
        }
      >
        <Link to={"/projects"}>
          <FolderKanban />
          Projects
        </Link>
      </Button>
      <Button
        asChild
        variant={"outline"}
        className={"bg-zinc-900 text-white w-full  py-6 text-lg"}
      >
        <Link to={"/profile"}>
          <User />
          Profile
        </Link>
      </Button>
    </div>
  );
};

export default SideBar;

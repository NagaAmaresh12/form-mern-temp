import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "@/redux/thunks/projectThunk";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";
import { LiaGhostSolid } from "react-icons/lia";
import { setProjectCreated } from "@/redux/slices/projectSlice";
import { PlusCircle } from "lucide-react";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("projectTitle");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let {
    projects: rawProjects,
    status,
    error,
    projectCreated,
  } = useSelector((state) => state.projects);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("hello");

    if (!isAuthenticated) {
      toast.error("Please log in to view projects");
      return;
    }

    if (!rawProjects || rawProjects.length === 0 || projectCreated == true) {
      dispatch(fetchAllProjects())
        .unwrap()
        .then((res) => {
          console.log("Fetched projects:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching projects:", err);
          toast.error("Error fetching projects");
        });
      dispatch(setProjectCreated(false)); // Reset projectCreated after fetching
    }
  }, [dispatch, isAuthenticated, rawProjects, projectCreated]);

  const projects = Array.isArray(rawProjects) ? rawProjects : [];

  // Helper: Check if a given date string is within start/end range
  const isWithinRange = (dateStr) => {
    if (!startDate || !endDate) return true;
    const date = new Date(dateStr);
    return date >= new Date(startDate) && date <= new Date(endDate);
  };
  console.log({ projects: projects[0] });

  // Apply both text filter and date range filter
  const filteredProjects = projects
    .filter((project) => {
      const query = search.toLowerCase();
      switch (filterBy) {
        case "projectTitle":
          return project.projectTitle?.toLowerCase().includes(query);
        case "activityName":
          return project.projectActivities?.some((activity) =>
            activity.name?.toLowerCase().includes(query)
          );
        case "teamMember":
          return project.projectTeamDetails?.some((member) =>
            `${member.firstName} ${member.lastName}`
              ?.toLowerCase()
              .includes(query)
          );
        case "date":
          return project.projectActivities?.some((activity) =>
            activity.date?.toLowerCase().includes(query)
          );
        default:
          return true;
      }
    })
    .filter((project) => isWithinRange(project.projectCommencementDate));

  if (status === "loading") {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    );
  }

  if (status === "error") {
    return <h1>{error || "Failed to load projects"}</h1>;
  }

  return (
    <div>
      <div className="w-full h-full flex flex-col items-center  py-5 mt-3 gap-4">
        {/* Filters */}
        <div className="w-full flex items-center justify-start gap-2">
          <div className="w-full flex items-center justify-evenly gap-4">
            <select
              className="border border-gray-300 rounded px-4 py-2"
              onChange={(e) => setFilterBy(e.target.value)}
              value={filterBy}
            >
              <option value="projectTitle">By Project</option>
              <option value="activityName">By Activity Name</option>
              <option value="teamMember">By Team Member</option>
              <option value="date">By Date</option>
            </select>

            <Input
              placeholder={`Search by ${filterBy}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[40%] bg-zinc-200"
            />

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={"w-1/4"}
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={"w-1/4"}
            />
          </div>

          {/* Admin-only Create Button */}
          {user?.role === "admin" && (
            <Link to="/projects/new">
              <Button className="bg-zinc-900 text-white">
                <PlusCircle />
                Create Project
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Project List */}
      <div className="flex flex-col items-center mt-6 h-full w-full">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(
            (project) => (
              console.log("Project:", project),
              (
                <ProjectCard
                  projectBudget={project.projectBudget || 0}
                  projectExpenditure={project.projectExpenditure || []}
                  key={project._id}
                  id={project._id}
                  projectTitle={project.projectTitle}
                />
              )
            )
          )
        ) : (
          <div className="text-sky-400 mt-10">
            <div className="flex flex-col items-center ">
              <LiaGhostSolid className="h-[10vw] w-[10vw]" />
              <h6>No projects available</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;

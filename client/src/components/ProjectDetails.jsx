// src/features/projects/ProjectDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProject,
  editProject,
  deleteProject,
} from "@/redux/thunks/projectThunk.js";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import ProjectForm from "./ProjectForm.jsx";
import { ClipLoader } from "react-spinners";
import { normalizeProjectDates } from "@/utils/normalizeDates.js";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectTitle: "",
      projectSanctionedBy: "",
      projectInspectingAuthority: "",
      projectLocation: "",
      projectBudget: "",
      projectObjectives: "",
      projectDuration: "",
      projectCommencementDate: "", // Use YYYY-MM-DD format
      projectStartDate: "", // Use projectCommencementDate or rename for clarity
      projectEndDate: "",
      projectExpenditure: [{ description: "", amount: "", date: "" }],
      projectRangeCoverage: {
        numberOfVillages: "",
        totalPopulation: "",
        numberOfFarmers: "",
      },
      requiredSupportFromHO: "",
      pendingWorks: "",
      projectTeamDetails: [
        { firstName: "", lastName: "", contactNumber: "", headQtrs: "" },
      ],
      projectActivities: [
        {
          name: "",
          date: "", // Use YYYY-MM-DD format
          daywiseWorkProgress: "",
          placeOfVisit: "",
          actionTaken: "",
          actionImpact: "",
        },
      ],

      // Ensure all fields are initialized to empty strings or appropriate defaults
      // projectStatus: "ongoing", // Default status
      // projectRemarks: "",
    },
  });

  const {
    fields: expenditureFields,
    append: appendExpenditure,
    remove: removeExpenditure,
  } = useFieldArray({ control, name: "projectExpenditure" });
  const {
    fields: teamFields,
    append: appendTeam,
    remove: removeTeam,
  } = useFieldArray({ control, name: "projectTeamDetails" });
  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({ control, name: "projectActivities" });

  useEffect(() => {
    if (!id || !isAuthenticated) return;
    dispatch(fetchProject(id))
      .unwrap()
      .then((res) => {
        const normalized = normalizeProjectDates(res.data);
        reset(normalized);
      })
      .catch((err) => toast.error(err.message || "Failed to fetch project"))
      .finally(() => setLoading(false));
  }, [dispatch, id, reset, isAuthenticated]);

  const handleUpdate = useCallback(
    async (formData) => {
      console.log("handleUpdate clicked");
      try {
        const result = await dispatch(editProject({ id, formData })).unwrap();
        if (result.success) toast.success("Project updated successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to update project");
      }
    },
    [dispatch, id]
  );

  const handleDelete = useCallback(async () => {
    try {
      const result = await dispatch(deleteProject(id)).unwrap();
      if (result.success) {
        toast.success("Deleted Project");
        navigate("/projects");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete project");
    }
  }, [dispatch, id, navigate]);

  if (loading)
    return (
      <ClipLoader
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size={50} // default: 35
        color={"#123abc"} // default: #000
        loading={true} // boolean to toggle visibility
      />
    );
  if (!projects) return <div>Project not found.</div>;

  return (
    <ProjectForm
      watch={watch}
      onSubmit={handleSubmit(handleUpdate)}
      register={register}
      control={control}
      errors={errors}
      teamFields={teamFields}
      appendTeam={appendTeam}
      removeTeam={removeTeam}
      activityFields={activityFields}
      appendActivity={appendActivity}
      removeActivity={removeActivity}
      expenditureFields={expenditureFields}
      appendExpenditure={appendExpenditure}
      removeExpenditure={removeExpenditure}
      projectId={id}
      deleteProjectHandler={handleDelete}
    />
  );
};

export default ProjectDetails;

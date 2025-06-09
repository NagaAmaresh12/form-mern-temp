// src/features/projects/Project.jsx
import { createProject } from "@/redux/thunks/projectThunk.js";
import React from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "../components/ProjectForm.jsx";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { setProjectCreated } from "@/redux/slices/projectSlice.js";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { width, height } = useWindowSize();

  // initialize form for creation
  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
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
      projectCommencementDate: "",
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
          date: "",
          daywiseWorkProgress: "",
          placeOfVisit: "",
          actionTaken: "",
          actionImpact: "",
          programAttendance: "",
          observations: "",
        },
      ],
    },
  });

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
  const {
    fields: expenditureFields,
    append: appendExpenditure,
    remove: removeExpenditure,
  } = useFieldArray({ control, name: "projectExpenditure" });

  const onSubmit = async (formData) => {
    try {
      if (!isAuthenticated) {
        return;
      }
      const resultAction = await dispatch(createProject(formData)).unwrap();
      if (resultAction.success) {
        const createdId = resultAction.data._id;
        toast.success("Project created successfully!");
        dispatch(setProjectCreated(true)); // Assuming you have this action to set projectCreated state
        reset();
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate(`/projects/${createdId}`);
        }, 3000);
      }
    } catch (err) {
      toast.error(err.message || "Failed to create project");
    }
  };

  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={400}
          recycle={false}
        />
      )}
      <ProjectForm
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
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
        appendExpenditure={appendExpenditure} // ✅ Corrected
        removeExpenditure={removeExpenditure}
        // watch={watch}
      />
    </>
  );
};

export default Project;

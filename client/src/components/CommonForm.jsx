import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser } from "../redux/thunks/authThunks.js";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button.jsx";
import HandleForm from "./HandleForm.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { handleFormSubmit } from "../utils/handleFormSubmit.js";
import { triggerConfetti } from "@/redux/slices/confettiSlice.js";

// After successful signup or project creation

const CommonForm = ({ formData, buttonText = "Submit" }) => {
  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //

  //functions

  const onSubmit = async (data) => {
    let auth;
    try {
      let response;
      if (data.firstName || data.lastName) {
        auth = "signup";
        response = await dispatch(signUpUser(data)).unwrap();
        toast.success("User registered successfully!");

        console.log(response);
      } else {
        auth = "signin";
        response = await dispatch(signInUser(data)).unwrap();
        toast.success("User logged in successfully!");
        console.log(response);
      }
      dispatch(triggerConfetti());
      await navigate("/profile");
    } catch (error) {
      navigate("/auth");
      // Extract error message from the error object
      const errorMessage =
        error?.response?.data?.message || // Server-defined error message
        error?.message || // Generic error message
        "An unexpected error occurred."; // Fallback message

      if (auth === "signup") {
        toast.error("User already exists!");
      }
      if (auth === "signin") {
        toast.error("Invalid credentials!");
      }
      console.error("Error submitting form:", error, errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <HandleForm register={register} formData={formData} errors={errors} />
      <Button
        type="submit"
        variant="outline"
        className="bg-zinc-900 text-white text-lg w-full p-5"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Submitting..." : buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;

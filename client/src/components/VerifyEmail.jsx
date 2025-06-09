// EmailVerification.js
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import axios from "../utils/axios.js"; // Path to your axios instance
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    setLoading(true);

    try {
      // Send the verification request (you may replace with actual token)
      const response = await axios.post("/verify-email", {
        token: new URLSearchParams(window.location.search).get("token"),
      });
      if (response.data.success) {
        setSuccess(true);
        toast.success("Email verified successfully");
        setTimeout(() => {
          navigate("/"); // Redirect after 2 seconds
        }, 20000);
      } else {
        toast.error("Verification failed");
      }
    } catch (error) {
      console.log("error occured in verifyEmail", error);

      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Trigger email verification on component mount
    verifyEmail();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#EDEDED">
      {success && <Confetti />}
      <h1>
        {loading ? (
          <>
            <h3 className="text-3xl text-green-700 ">
              Verifying your email...
            </h3>
            <br />
            <h3 className="text-xl text-zinc-900 text-center ">
              {" "}
              Please wait a moment.
            </h3>
          </>
        ) : success ? (
          <>
            <h3 className="text-2xl text-red-500 ">
              ✅ Email verified successfully!!!
            </h3>
            <br />
            <h3 className="text-2xl text-zinc-900 ">
              You will be redirected to '/' page
            </h3>
          </>
        ) : (
          <h3 className="text-2xl text-red-500 ">
            Verification failed!! Please try again.
          </h3>
        )}
      </h1>
    </div>
  );
};

export default EmailVerification;

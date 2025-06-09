// src/components/AuthHandler.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AuthHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (
      status === "succeeded" &&
      isAuthenticated &&
      location.pathname === "/login"
    ) {
      navigate("/profile");
    }
  }, [status, isAuthenticated, navigate]);

  if (status === "loading") {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ClipLoader
          size={50} // default: 35
          color={"#123abc"} // default: #000
          loading={true} // boolean to toggle visibility
        />
        ;
      </div>
    );
  }

  return null; // This only handles auth logic
};

export default AuthHandler;

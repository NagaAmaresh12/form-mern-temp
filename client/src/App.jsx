// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthHandler from "./components/AuthHandler.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";
import ProjectsList from "./components/ProjectsList.jsx";
import Project from "./components/Project.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./layouts/Layout.jsx";

const App = () => {
  return (
    <>
      <AuthHandler />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<Project />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

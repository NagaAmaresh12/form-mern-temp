import { projectReport } from "../models/projects.model.js";

// Fetch all projects
export const fetchAllProjects = async (req, res) => {
  try {
    const projects = await projectReport.find().lean(); // use lean() for faster read
    return res.status(200).json({
      message: "Projects listed successfully",
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return res.status(500).json({
      message: "Internal server error while fetching projects",
      success: false,
      error: error.message,
    });
  }
};

// Fetch single project by ID
export const fetchSingleProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid project ID format",
        success: false,
      });
    }

    const project = await projectReport.findById(id).lean();

    if (!project) {
      return res.status(404).json({
        message: "Project report not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Project fetched successfully",
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching single project:", error);
    return res.status(500).json({
      message: "Internal server error while fetching project",
      success: false,
      error: error.message,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = req.body;
    // console.log("data", data);

    // Check if data is provided
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No data provided",
        success: false,
      });
    }

    // Create a new project report instance
    const newProject = new projectReport(data);

    // Save the project report to the database
    const savedProject = await newProject.save();

    // Respond with the saved project
    return res.status(201).json({
      message: "Project created successfully",
      success: true,
      data: savedProject,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors,
      });
    }

    // Handle other errors
    console.error("Error creating project:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const editProject = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log("data editProject", data);

  // Validate ID format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      message: "Invalid project ID",
      success: false,
    });
  }
  console.log("buget", typeof data.projectBudget);

  try {
    // Try to update the project
    const updatedProject = await projectReport.findByIdAndUpdate(id, data, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validations
    });

    // If project not found
    if (!updatedProject) {
      return res.status(404).json({
        message: "Project does not exist",
        success: false,
      });
    }
    await updatedProject.save();

    // Success response
    res.status(200).json({
      message: "Project updated successfully",
      success: true,
      data: updatedProject,
    });
    console.log("Project updated successfully:", updatedProject);
  } catch (error) {
    // Handle schema validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Handle other errors
    console.error("Error updating project:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  // Validate the provided ID format
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      message: "Invalid project ID format",
      success: false,
    });
  }

  try {
    // Attempt to delete the project by ID
    const deletedProject = await projectReport.findByIdAndDelete(id);

    // If no project was found and deleted
    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Successfully deleted the project
    res.status(200).json({
      message: "Project deleted successfully",
      success: true,
      data: deletedProject,
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting project:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const normalizeDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().split("T")[0];
};

export const normalizeProjectDates = (project) => {
  if (!project || typeof project !== "object") return project;

  return {
    ...project,
    projectCommencementDate: normalizeDate(project.projectCommencementDate),
    projectStartDate: normalizeDate(project.projectStartDate),
    projectEndDate: normalizeDate(project.projectEndDate),

    // Normalize nested array: projectActivities
    projectActivities: Array.isArray(project.projectActivities)
      ? project.projectActivities.map((activity) => ({
          ...activity,
          date: normalizeDate(activity.date),
        }))
      : [],

    // Normalize nested array: projectExpenditure
    projectExpenditure: Array.isArray(project.projectExpenditure)
      ? project.projectExpenditure.map((exp) => ({
          ...exp,
          date: normalizeDate(exp.date),
        }))
      : [],
  };
};

import axios from "./axios.js";

export const handleFormSubmit = async (formData, formType, reset) => {
  try {
    const { data } = await axios.post(`/users/${formType}`, formData);
    console.log("Success:", data);
    return { success: data.success, user: data.user }; // Return success data if needed

    // You can redirect or show success toast here
  } catch (error) {
    console.error("Error submitting form:", error.data || error.message);
    // Handle error properly (show error toast or UI message)
  } finally {
    reset();
  }
};

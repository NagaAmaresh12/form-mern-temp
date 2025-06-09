export const signUpFormData = [
  {
    componentType: "input",
    label: "First Name",
    name: "firstName",
    type: "text",
    required: true,
    placeholder: "Enter your name",
  },
  {
    componentType: "input",
    label: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
    placeholder: "Enter your name",
  },
  {
    componentType: "input",
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    pattern: { value: "^\\S+@\\S+\\.\\S+$", message: "Invalid email format" },
  },
  {
    componentType: "input",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];
export const signInFormData = [
  {
    componentType: "input",
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    pattern: { value: "^\\S+@\\S+\\.\\S+$", message: "Invalid email format" },
  },
  {
    componentType: "input",
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

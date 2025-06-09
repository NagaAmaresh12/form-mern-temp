import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select } from "./ui/select";

const HandleForm = ({ formData, register }) => {
  console.log("formData", formData);

  const selectElements = () => {
    return formData.map((item, index) => {
      switch (item.componentType) {
        case "input":
          return (
            <div key={index}>
              <Label className={"mb-2 text-md"} htmlFor={item.name}>
                {item.label}
              </Label>
              <Input
                {...register(item.name, {
                  required: item.required,
                  pattern: item.pattern,
                })}
                // id={item.name}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                className="border mb-2 border-gray-300 rounded-md py-6 w-full"
              />
            </div>
          );
        case "select":
          return (
            <div key={index}>
              <Label htmlFor={item.name}>{item.label}</Label>
              <Select
                name={item.name}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                {item.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          );
        default:
          return null;
      }
    });
  };
  return <div>{selectElements(formData)}</div>;
};

export default HandleForm;

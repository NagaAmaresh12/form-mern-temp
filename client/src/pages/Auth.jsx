import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { signInFormData, signUpFormData } from "../utils/users.form.data.js";
import CommonForm from "../components/CommonForm.jsx";
const AuthUsers = () => {
  const handleChange = (value) => {
    setactiveTab(value);
  };

  const [activeTab, setactiveTab] = useState("signIn");
  return (
    <div className="h-screen w-full bg-zinc-800 flex items-center justify-center">
      <Tabs
        value={activeTab}
        onValueChange={handleChange}
        defaultValue="signIn"
        className="w-[500px] bg-white  shadow-md rounded-lg p-4"
      >
        <TabsList className={"relative w-full  text-xl text-zinc-900 mb-4"}>
          <TabsTrigger
            value="signIn"
            className={`w-1/2 rounded ${
              activeTab === "signIn" ? "bg-[#EDEDED]" : ""
            } py-2`}
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signUp"
            className={`w-1/2 rounded ${
              activeTab === "signUp" ? "bg-[#EDEDED] " : ""
            } py-2`}
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <CommonForm
            formData={signInFormData}
            buttonText="Sign In"
            formType="signIn"
          />
        </TabsContent>
        <TabsContent value="signUp">
          <CommonForm
            formData={signUpFormData}
            buttonText="Sign Up"
            formType="signUp"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthUsers;

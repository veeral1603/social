import React from "react";
import { SignupForm } from "./SignupForm";

export default function SignUp() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl">
          Create Account
        </h2>
        <p className="text-muted-foreground font-semibold">
          We are excited to have you join us!
        </p>
      </div>

      <SignupForm />
    </div>
  );
}

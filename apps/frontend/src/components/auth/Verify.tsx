import React from "react";
import { VerifyForm } from "./VerifyForm";

export default function Verify() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl">
          Verify Email
        </h2>
        <p className="text-muted-foreground font-semibold">
          Enter the verification code sent to your email.
        </p>
      </div>

      <VerifyForm />
    </div>
  );
}

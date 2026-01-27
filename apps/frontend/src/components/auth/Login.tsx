import React from "react";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl">
          Welcome Back
        </h2>
        <p className="text-muted-foreground font-semibold">
          Login to your account to continue
        </p>
      </div>

      <LoginForm />
    </div>
  );
}

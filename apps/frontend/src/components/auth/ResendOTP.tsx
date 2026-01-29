"use client";
import { resendVerificationOtp } from "@/src/services/auth.service";
import React from "react";
import { toast } from "sonner";

export default function ResendOTP() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const onResend = async () => {
    setIsDisabled(true);
    //Button logic to resend OTP goes here
    try {
      const response = await resendVerificationOtp();
      toast.success(
        response.message || "Verification code sent to your email.",
      );
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong. Please try again.",
      );
    }
    setTimeout(() => {
      setIsDisabled(false);
    }, 60000); //Disable button for 60 seconds
  };

  return (
    <button
      className="inline underline not-disabled:hover:text-secondary transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onResend}
      type="button"
      disabled={isDisabled}
    >
      Resend
    </button>
  );
}

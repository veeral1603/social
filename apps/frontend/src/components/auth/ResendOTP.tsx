"use client";
import React from "react";

export default function ResendOTP() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const onResend = () => {
    console.log("Resent OTP");
    setIsDisabled(true);
    //Button logic to resend OTP goes here
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

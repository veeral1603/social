"use client";
import { verifyEmailSchema } from "@repo/shared-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import ResendOTP from "./ResendOTP";

export function VerifyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: z.infer<typeof verifyEmailSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            rules={{
              required: "Verification code is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
            }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>

                <InputOTP
                  {...field}
                  id="otp"
                  maxLength={6}
                  containerClassName="gap-4"
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {fieldState.error && (
                  <FieldDescription className="text-destructive">
                    {fieldState.error.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />
          <Field className="mt-4">
            <Button type="submit">Verify</Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <ResendOTP />
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}

"use client";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { z } from "zod";
import { registerSchema } from "@repo/shared-types";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthModal from "@/src/stores/authModalStore";
import { toast } from "sonner";
import React from "react";
import { Spinner } from "../ui/spinner";
import { signup } from "@/src/services/auth.service";
import { CircleCheck, XCircle } from "lucide-react";
import { checkUsenameAvailability } from "@/src/services/profile.service";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = React.useState<
    boolean | null
  >(null);
  const [checkingUsername, setCheckingUsername] = React.useState(false);

  const { setPage } = useAuthModal();

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await signup(data);
      toast.success(response.message || "Account created successfully!");
      setPage("verify-email");
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const username = form.watch("username");
  const usernameError = form.formState.errors.username;
  const isUsernameValid = !usernameError;

  React.useEffect(() => {
    setIsUsernameAvailable(null);

    if (!username || username.length < 3 || !isUsernameValid) {
      setIsUsernameAvailable(null);
      setCheckingUsername(false);
      return;
    }

    let isCancelled = false;

    const checkAvailability = async () => {
      try {
        const response = await checkUsenameAvailability(username);

        if (!isCancelled) {
          setIsUsernameAvailable(response.data.isAvailable);
        }
      } catch (error) {
        if (!isCancelled) {
          toast.error(
            (error as Error).message ||
              "Failed to check username availability.",
          );
        }
      } finally {
        if (!isCancelled) {
          setCheckingUsername(false);
        }
      }
    };

    const debounceId = setTimeout(checkAvailability, 800);

    return () => {
      isCancelled = true;
      clearTimeout(debounceId);
    };
  }, [username, isUsernameValid]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="you@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">Username</FieldLabel>

                <Input
                  id={field.name}
                  type="text"
                  placeholder="Create a username"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                {checkingUsername && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Spinner className="size-4" />
                    <p>Checking Availability</p>
                  </div>
                )}
                {!checkingUsername && isUsernameAvailable === false && (
                  <FieldError className="text-xs">
                    <div className="flex items-center gap-2">
                      <XCircle size={16} />
                      <p>Username Unavailable!</p>
                    </div>
                  </FieldError>
                )}
                {!checkingUsername && isUsernameAvailable === true && (
                  <FieldError className="text-xs">
                    <div className="flex items-center gap-2 text-green-600">
                      <CircleCheck size={16} />
                      <p>Username Available!</p>
                    </div>
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field className="mt-4">
            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                checkingUsername ||
                isUsernameAvailable === false ||
                !isUsernameValid
              }
            >
              {isSubmitting && <Spinner className="size-6" />}
              {!isSubmitting && <p>Create Account</p>}
            </Button>
          </Field>

          <Field>
            <Button
              type="button"
              variant="secondary"
              className="w-max! bg-muted! text-muted-foreground!"
              size="lg"
              onClick={() => setPage("welcome")}
            >
              Back
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking "Create Account", you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

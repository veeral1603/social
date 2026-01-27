"use client";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { z } from "zod";
import { loginSchema } from "@repo/shared-types";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthModal from "@/src/stores/authModalStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  const { setPage } = useAuthModal();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="usernameOrEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="usernameOrEmail">
                  Username or Email
                </FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Enter your username or email"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
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
            <Button type="submit" size="lg">
              Log In
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
    </div>
  );
}

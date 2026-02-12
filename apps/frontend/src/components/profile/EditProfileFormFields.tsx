"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function EditProfileFormFields({ form }: { form: any }) {
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Display Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Your display name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              placeholder="Something about you..."
              aria-invalid={fieldState.invalid}
              maxLength={160}
              className="h-24"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

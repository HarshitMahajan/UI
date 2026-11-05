"use client";

import * as React from "react";
import { Field } from "@base-ui/react/field";
import { cn } from "../lib/cn.ts";

/**
 * Label + control + hint/error, wired for accessibility by Base UI.
 * ALWAYS wrap Input / Textarea / Select in a FormField when they sit in a form.
 *
 *   <FormField label="Customer" required error={errors.customer}>
 *     <Input name="customer" />
 *   </FormField>
 */
export function FormField({
  label,
  description,
  error,
  required,
  name,
  children,
  className,
}: {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  name?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Field.Root
      name={name}
      invalid={Boolean(error)}
      className={cn("flex flex-col gap-(--field-gap)", className)}
    >
      <Field.Label className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        ) : null}
      </Field.Label>
      {children}
      {error ? (
        <Field.Error match className="text-sm text-danger-soft-fg">
          {error}
        </Field.Error>
      ) : description ? (
        <Field.Description className="text-sm text-fg-muted">{description}</Field.Description>
      ) : null}
    </Field.Root>
  );
}

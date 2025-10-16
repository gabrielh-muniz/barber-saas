import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Pre-configured schemas for common forms
 */
const schemas = {
  signup: z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20)
      .nonempty("Password is required"),
  }),

  login: z.object({
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20)
      .nonempty("Password is required"),
  }),
};

/**
 * Generic form hook to handle form state and validation
 * @param {z.ZodObject} schema - Zod schema for form validation
 * @param {Object} defaultValues - Default values for the form fields
 * @param {Function} onSubmit - Callback function to handle form submission
 * @param {Object} formOptions - Additional options for useForm
 * @returns {Object} - Form methods and state
 */
function useLogicForm(schema, defaultValues = {}, onSubmit, formOptions = {}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    ...formOptions,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function wrappedOnSubmit(data) {
    if (onSubmit) onSubmit(data);
  }

  return { register, handleSubmit: handleSubmit(wrappedOnSubmit), errors };
}

/**
 * Pre-configured hook for commomn forms
 */
function useSignupForm(onSubmit) {
  return useLogicForm(
    schemas.signup,
    { username: "", email: "", password: "" },
    onSubmit,
  );
}

function useLoginForm(onSubmit) {
  return useLogicForm(schemas.login, { email: "", password: "" }, onSubmit);
}

export { useSignupForm, useLoginForm };

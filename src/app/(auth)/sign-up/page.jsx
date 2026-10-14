"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();


const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!name || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        const { data, error } = await signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            setErrorMessage(error.message || "Something went wrong!");
            return;
        }

        if (data) {
            toast.success("Successfully registered!");
            router.push("/");
            router.refresh();
        }
    } catch (error) {
        setErrorMessage(
            error instanceof Error
                ? error.message
                : "Failed to create account. Please try again."
        );
    } finally {
        setIsLoading(false);
    }
};

  const handleGoogleSignIn = async () => {
    setErrorMessage("");

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Google sign in failed!");
      }
    } catch {
      setErrorMessage("Google sign in failed. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative z-10 w-full max-w-[440px] rounded-3xl border border-white bg-white/90 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
            <span className="text-2xl font-bold text-white">S</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join us today and start your journey
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errorMessage}
          </div>
        )}

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            className="w-full"
            isRequired
            name="name"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="mb-1.5 text-sm font-semibold text-slate-700">
              Full Name
            </Label>

            <Input
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          <TextField
            className="w-full"
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="mb-1.5 text-sm font-semibold text-slate-700">
              Email Address
            </Label>

            <Input
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white"
            />

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          <TextField
            className="w-full"
            name="password"
            isRequired
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="mb-1.5 text-sm font-semibold text-slate-700">
              Password
            </Label>

            <InputGroup className="w-full rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-indigo-500 focus-within:bg-white">
              <InputGroup.Input
                placeholder="Create a strong password"
                type={isVisible ? "text" : "password"}
                className="w-full bg-transparent px-4 py-3 text-slate-900 outline-none"
              />

              <InputGroup.Suffix className="pe-2">
                <Button
                  isIconOnly
                  type="button"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                  className="text-slate-500 hover:text-indigo-600"
                >
                  {isVisible ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeSlash className="size-5" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>

            <Description className="mt-1.5 text-xs text-slate-400">
              Minimum 8 characters, 1 uppercase letter and 1 number
            </Description>

            <FieldError className="mt-1 text-xs text-red-500" />
          </TextField>

          <Button
            type="submit"
            isDisabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98]"
          >
            {isLoading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <Check className="size-5" />
                Create Account
              </>
            )}
          </Button>
        </Form>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <Button
          type="button"
          onPress={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.8 7.18l7.73 6C44.38 38.03 46.98 31.88 46.98 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.41 14.41 0 019.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.87 23.87 0 000 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>

          Continue with Google
        </Button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
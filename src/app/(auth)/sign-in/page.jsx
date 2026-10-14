"use client";

import Link from "next/link";
import { signIn } from "@/lib/auth-client";
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
import toast from "react-hot-toast";

export default function Basic() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            setErrorMessage("Email and password are required.");
            return;
        }

        const { error } = await signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            setErrorMessage(error.message || "Invalid email or password.");
            return;
        }

        toast.success("Successfully logged in!");
    } catch (error) {
        setErrorMessage(
            error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
        );
    } finally {
        setIsLoading(false);
    }
};


    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

            <div className="relative w-full max-w-md">
                <Link
                    href="/"
                    className="mb-8 flex items-center justify-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <Check className="size-6" />
                    </span>
                    <span>
                        Your<span className="text-blue-600">Store</span>
                    </span>
                </Link>

                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                            👋
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to your account to continue.
                        </p>
                    </div>

                    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }

                                return null;
                            }}
                        >
                            <Label className="mb-2 text-sm font-semibold text-slate-700">
                                Email address
                            </Label>

                            <Input
                                placeholder="you@example.com"
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white"
                            />

                            <FieldError />
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
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <Label className="text-sm font-semibold text-slate-700">
                                    Password
                                </Label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <InputGroup className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-500 focus-within:bg-white">
                                <InputGroup.Input
                                    name="password"
                                    placeholder="Enter your password"
                                    type={isVisible ? "text" : "password"}
                                    className="min-w-0 flex-1"
                                />

                                <InputGroup.Suffix>
                                    <Button
                                        type="button"
                                        isIconOnly
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? (
                                            <Eye className="size-4 text-slate-500" />
                                        ) : (
                                            <EyeSlash className="size-4 text-slate-500" />
                                        )}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>

                            <Description className="mt-2 text-xs text-slate-400">
                                At least 8 characters, 1 uppercase letter and 1 number.
                            </Description>

                            <FieldError />
                        </TextField>

                        {errorMessage && (
                            <div
                                role="alert"
                                className="w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                            >
                                {errorMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            isDisabled={isLoading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isLoading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    Sign in
                                    <Check className="size-4" />
                                </>
                            )}
                        </Button>
                    </Form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs font-medium text-slate-400">
                            NEW HERE?
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-bold text-blue-600 transition hover:text-blue-700"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Secure sign-in · Your account, your control
                </p>
            </div>
        </main>
    );
}
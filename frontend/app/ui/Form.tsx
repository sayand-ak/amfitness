"use client";

import React from "react";
import Input from "./Input"; 
import { handleFormSubmit } from "../lib/formHandlers/handleLoginSubmit"; 

interface Field {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
}

interface FormProps {
    fields: Field[];
    buttonLabel: string;
}

export default function Form({ fields, buttonLabel }: FormProps) {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues: Record<string, string> = {};

        fields.forEach((field) => {
            const value = formData.get(field.name) as string;
            formValues[field.name] = value;
        });

        const response = await handleFormSubmit(formValues);
        console.log(response)
        if (response) {
            window.location.href = "/home";
        }
    }

    return (
        <form className="space-y-7" onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name}>
                    <label className="block text-sm mb-2 font-bold">{field.label}</label>
                    <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                    />
                </div>
            ))}

            <div className="space-y-4">
                <button
                    type="submit"
                    className="w-full rounded-[30px] py-4 bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
                >
                    {buttonLabel}
                </button>
            </div>
        </form>
    );
}

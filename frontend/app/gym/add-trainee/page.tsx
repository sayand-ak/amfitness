"use client"
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the GenericForm component, disabling SSR
const GenericForm = dynamic(() => import("../../ui/Form"));

// Corrected types for the fields
const AddTraineePage: React.FC = () => {
    const fields = [
        { name: "first_name", label: "First Name", type: "text", required: true },
        { name: "last_name", label: "Last Name", type: "text", required: true },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            required: true,
            options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
            ],
        },
        { name: "dob", label: "Date of Birth", type: "date", required: true },
        { name: "address", label: "Address", type: "textarea", required: true },
        { name: "place", label: "Place", type: "text", required: true },
        { name: "mobile_number", label: "Mobile Number", type: "tel", required: true },
        { name: "email", label: "Email", type: "email" },
        { name: "workout_time", label: "Workout Time", type: "text", required: true },
        { name: "height", label: "Height (cm)", type: "number", required: true },
        { name: "weight", label: "Weight (kg)", type: "number", required: true },
        {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
            ],
        },
        { name: "is_active", label: "Is Active", type: "checkbox", defaultValue: true },
    ];

    const handleSubmit = async (data: Record<string, any>) => {
        try {
            const response = await fetch("/api/trainee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add trainee");
            }

            const result = await response.json();
            alert(result.message || "Trainee added successfully!");
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Add New Trainee</h1>
            <GenericForm fields={fields} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddTraineePage;

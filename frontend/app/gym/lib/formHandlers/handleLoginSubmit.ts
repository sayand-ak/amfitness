import { gymLogin } from "../api/gymApi";

// libs/formHandler.ts
export async function handleFormSubmit(formData: Record<string, string>) {
    console.log("Form Data:", formData);
    const response = await gymLogin(formData);
    return response;
}
  
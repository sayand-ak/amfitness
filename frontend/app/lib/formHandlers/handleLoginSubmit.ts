import { gymLogin } from "../api/gymApi";

// libs/formHandler.ts
export async function handleFormSubmit(formData: Record<string, string>) {
    const response = await gymLogin(formData);
    return response;
}
  
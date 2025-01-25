'use client'

import React, { useState } from "react"

export interface FieldConfig {
  name: string
  label: string
  type: "text" | "email" | "tel" | "checkbox" | "number" | "date" | "select" | "textarea" | any
  required?: boolean
  defaultValue?: any
  options?: { value: string; label: string }[]
}

interface GenericFormProps {
  fields: FieldConfig[]
  onSubmit: (data: Record<string, any>) => void
  submitButtonLabel?: string
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onSubmit,
  submitButtonLabel = "Submit"
}) => {
  const initialFormState = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
    {}
  )

  const [formData, setFormData] = useState<Record<string, any>>(initialFormState)

  const handleChange = (name: string, value: any, checked?: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "select":
        return (
          <select
            id={field.name}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{`Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case "textarea":
        return (
          <textarea
            id={field.name}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded-md min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )

      case "checkbox":
        return (
          <input
            type="checkbox"
            id={field.name}
            checked={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        )

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label
            htmlFor={field.name}
            className={`block text-sm font-medium ${
              field.type === "checkbox" ? "inline-flex items-center gap-2" : ""
            }`}
          >
            {field.type === "checkbox" ? (
              <>
                {renderField(field)}
                <span>{field.label}</span>
              </>
            ) : (
              <>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                {renderField(field)}
              </>
            )}
          </label>
          <div className="text-sm text-red-500 hidden">Error message</div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {submitButtonLabel}
      </button>
    </form>
  )
}

export default GenericForm

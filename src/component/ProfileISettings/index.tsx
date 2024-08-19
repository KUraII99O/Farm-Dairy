import React, { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
}

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Resetting errors when user types
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      // Add your form submission logic here
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data: typeof formData): FormErrors => {
    const errors: FormErrors = {};
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.firstName) {
      errors.firstName = "First name is required";
    }
    if (!data.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(data.phone)) {
      errors.phone = "Invalid phone number format (123-456-7890)";
    }
    if (!data.company) {
      errors.company = "Company is required";
    }
    return errors;
  };

  return (
    <form className="mx-auto pt-6" onSubmit={handleSubmit}>
      <div className="mb-5">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Email address"
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
        )}
      </div>
      <div className="mb-5">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Password"
        />
        {formErrors.password && (
          <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="First name"
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Last name"
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
          )}
        </div>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Phone number (123-456-7890)"
        />
        {formErrors.phone && (
          <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
        )}
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Company (Ex. Google)"
        />
        {formErrors.company && (
          <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2"
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileForm;

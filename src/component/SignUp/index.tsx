import React, { useState } from "react";
import MoooImage from "../../assets/images/Mooo.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false); // State for success pop-up
  const navigate = useNavigate(); // Use the useNavigate hook

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!mobile.trim()) {
      errors.mobile = "Phone Number is required";
    } else if (!/^\d{8}$/i.test(mobile.trim())) {
      errors.mobile = "Phone Number must be 8 digits";
    }
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic here
      // For demonstration, show a success message and navigate to the dashboard
      setShowSuccess(true); // Show success pop-up
      setTimeout(() => {
        setShowSuccess(false); // Hide success pop-up after 3 seconds
        navigate("/dashboard"); // Navigate to the dashboard
      }, 3000); // Hide pop-up after 3 seconds
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={MoooImage}
                        alt="Mooo Image"
                      />
                      <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">
                        We are GesCow 
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please register an account</p>
                      {/* Mobile input */}
                      {errors.mobile && (
                        <p className="text-red-500">{errors.mobile}</p>
                      )}
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder="Phone Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />

                      {/* Username input */}
                      {errors.username && (
                        <p className="text-red-500">{errors.username}</p>
                      )}
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      {/* Email input */}
                      {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                      )}
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {/* Password input */}
                      {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                      <div className="relative flex items-center">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 pr-10"
                          value={password}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                      </div>

                      {/* Confirm Password input */}
                      {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword}</p>
                      )}
                      <div className="relative flex items-center">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 pr-10"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <FaRegEye />
                          ) : (
                            <FaRegEyeSlash />
                          )}
                        </div>
                      </div>

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-secondary hover:bg-primary"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <a href="/login">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Login
                          </button>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #309975, #58b368)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Success pop-up */}
      {showSuccess && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center">
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg">
            Welcome! You have successfully signed up.
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUpForm;

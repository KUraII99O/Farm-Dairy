import React, { useState } from "react";
import MoooImage from "../../assets/images/Mooo.png";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../Translator/Provider";
import { useLocation } from 'react-router-dom';

const SignUpForm: React.FC<{ planId?: number }> = ({ }) => {
  const { translate, setLanguage, language } = useTranslation();

  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation();
  const { plan } = location.state || {};
  const handleChangeLanguage = (newLanguage: string) => {
    console.log("Changing language to:", newLanguage);
    setLanguage(newLanguage);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!mobile.trim()) {
      errors.mobile = translate("phone_number_required");
    } else if (!/^\d{8}$/i.test(mobile.trim())) {
      errors.mobile = translate("phone_number_invalid");
    }
    if (!username.trim()) {
      errors.username = translate("username_required");
    }
    if (!email.trim()) {
      errors.email = translate("email_required");
    }
    if (!password.trim()) {
      errors.password = translate("password_required");
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = translate("confirm_password_required");
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile, username, email, password, planId: plan?.id }),
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          const errorMessage = errorResponse.error || "An unknown error occurred";
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        console.log(data.message); // Print success message or handle it as needed
  
        // Navigate to the login page after registration
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        // Type guard to handle errors properly
        if (error instanceof Error) {
          console.error("Registration failed:", error.message);
          // Handle error state or display error to the user
        } else {
          console.error("Registration failed with an unknown error");
          // Handle the case where error is not an instance of Error
        }
      }
    }
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isRTL = language === "ar";
  const iconPosition = isRTL ? "left-0" : "right-0"; // Adjust icon position based on language direction

  const isArabic = language === "ar";

  const formClass = isArabic ? "rtl" : "ltr";

  return (
    <section className=" bg-neutral-200 dark:bg-neutral-700">
      <div className="container p-10 pt-20 pb-20 mt-20">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 ">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12 mt-20">
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
                    <div className="flex items-center">
                      <select
                        value={language}
                        onChange={(e) => handleChangeLanguage(e.target.value)}
                        className="mr-2"
                      >
                        <option value="en">🇺🇸</option> {/* USA flag emoji */}
                        <option value="fr">🇫🇷</option> {/* France flag emoji */}
                        <option value="ar">🇹🇳</option>{" "}
                        {/* Tunisia flag emoji */}
                      </select>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className={`flex flex-col ${formClass}`}
                    >
                      <style>{`
                      .rtl {
                      direction: rtl;
                               }
                      `}</style>
                      <p className="mb-4 font-bold">{translate("register_account")}</p>
                      {/* Mobile input */}
                      {errors.mobile && (
                        <p className="text-red-500">{errors.mobile}</p>
                      )}
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder={translate("phone_number")}
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
                        placeholder={translate("username")}
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
                        placeholder={translate("email")}
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
                          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 "
                          value={password}
                          placeholder={translate("password")}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                          className={`absolute inset-y-0 ${iconPosition} flex items-center pr-3 cursor-pointer`}
                          style={{
                            marginRight: isRTL ? "0" : "0",
                            marginLeft: isRTL ? "8px" : "",
                          }} // Add margin based on language direction
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
                          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 "
                          placeholder={translate("confirm_password")}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                          className={`absolute inset-y-0 ${iconPosition} flex items-center pr-3 cursor-pointer`}
                          style={{
                            marginRight: isRTL ? "8px" : "0",
                            marginLeft: isRTL ? "8px" : "8px",
                          }} // Add margin based on language direction
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
                          {translate("sign_up")}
                        </button>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <a href="/login" className="mb-0 mr-2">
                          {translate("have_account")}
                        </a>
                        <a href="/login">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            {translate("login")}
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
    </section>
  );
};

export default SignUpForm;

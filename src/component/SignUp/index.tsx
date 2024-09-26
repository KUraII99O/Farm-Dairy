import React, { useState } from "react";
import CowFarmImage from "../../assets/images/CowFarm.png"; // Replace with the actual image path
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../Translator/Provider";
import { useLocation } from "react-router-dom";

const SignUpForm = () => {
  const { translate, setLanguage, language } = useTranslation();
  
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {};
  
  const handleChangeLanguage = (newLanguage: string) => {
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
        const response = await fetch("https://auth-api-woad.vercel.app/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile,
            username,
            email,
            password,
            planId: plan?.id,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          const errorMessage =
            errorResponse.error || "An unknown error occurred";
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.message);
        console.log({ email, password });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Registration failed:", error.message);
        } else {
          console.error("Registration failed with an unknown error");
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
  const iconPosition = isRTL ? "left-0" : "right-0";

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${CowFarmImage})`, // Update this to your farm-related image
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <img
                className="mx-auto w-48"
                src={CowFarmImage} // Replace with the farm-related image
                alt="Farm Cow Image"
              />
              <h1 className="text-2xl xl:text-4xl font-extrabold text-green-900">
                {translate("register_account")}
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <form onSubmit={handleSubmit}>
                  <div>
                    <select
                      value={language}
                      onChange={(e) => handleChangeLanguage(e.target.value)}
                      className="mb-4"
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="fr">🇫🇷 Français</option>
                      <option value="ar">🇹🇳 العربية</option>
                    </select>
                  </div>
                  {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                  <input
                    type="text"
                    className="w-full px-5 py-3 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                    placeholder={translate("phone_number")}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  {errors.username && <p className="text-red-500">{errors.username}</p>}
                  <input
                    type="text"
                    className="w-full px-5 py-3 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                    placeholder={translate("username")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                  <input
                    type="email"
                    className="w-full px-5 py-3 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                    placeholder={translate("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                  <div className="relative mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                      placeholder={translate("password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className={`absolute inset-y-0 ${iconPosition} flex items-center cursor-pointer`}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword}</p>
                  )}
                  <div className="relative mb-4">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                      placeholder={translate("confirm_password")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className={`absolute inset-y-0 ${iconPosition} flex items-center cursor-pointer`}
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                  <button className="mt-5 tracking-wide font-semibold bg-green-900 text-gray-100 w-full py-4 rounded-lg">
                    {translate("sign_up")}
                  </button>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  {translate("have_account")}{" "}
                  <Link to="/app/login">
                    <span className="text-green-900 font-semibold">{translate("login")}</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

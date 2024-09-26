import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoooImage from "../../assets/images/Mooo.png";
import { useTranslation } from "../Translator/Provider";

// Define the types for the props
interface LogInProps {
  onLogin: () => void;
}

const LogIn: React.FC<LogInProps> = ({ onLogin }) => {
  const { translate, language } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://auth-api-woad.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const responseBody = await response.json();
      localStorage.setItem("loggedInUser", JSON.stringify(responseBody.user));
      onLogin();
      setErrorMessage("");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setErrorMessage(translate("login_error"));
    }
  };

  const isArabic = language === "ar";
  const formClass = isArabic ? "rtl" : "ltr";

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <img className="mx-auto w-48" src={MoooImage} alt="Mooo Image" />
              <h1 className="text-2xl xl:text-4xl font-extrabold text-black">
                {translate("Log in to your account")}
              </h1>
              <p className="text-[12px] text-gray-500 mt-4">
                Hey enter your details access your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <form
                  onSubmit={handleSubmit}
                  className={`flex flex-col ${formClass}`}
                >
                  <style>{`
                        .rtl {
                          direction: rtl;
                        }
                      `}</style>
                  <p className="mb-4 font-bold">{translate("login_title")}</p>

                  <input
                    type="email"
                    className="w-full px-5 py-3 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                    placeholder={translate("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="relative mb-4">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      className="w-full px-5 py-3 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm"
                      placeholder={translate("password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                    >
                      {isPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 12c0 3.866 4.478 9 9 9s9-5.134 9-9-4.478-9-9-9-9 5.134-9 9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 12c0 3.866 4.478 9 9 9s9-5.134 9-9-4.478-9-9-9-9 5.134-9 9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21a9.021 9.021 0 01-7.5-4 9.021 9.021 0 017.5-4 9.021 9.021 0 017.5 4A9.021 9.021 0 0112 21z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 mb-4">{errorMessage}</p>
                  )}
                  <div className="mb-12 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-secondary hover:bg-primary"
                      type="submit"
                    >
                      {translate("login")}
                    </button>
                    <a href="/Rest-Password">{translate("forgot_password")}</a>
                  </div>
                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 mr-2"></p>
                    <Link
                      to="/app/signup"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg- hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                      {translate("register_account")}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

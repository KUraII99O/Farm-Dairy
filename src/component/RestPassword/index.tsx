import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import MoooImage from "../../assets/images/Mooo.png";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can perform the password reset logic
    // For simplicity, let's assume the password reset was successful
    console.log("Password reset request submitted for email:", email);
    // Redirect to the login page after password reset request
    navigate("/login");
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={MoooImage}
                        alt="Mooo Image"
                      />
                      <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">
                        Reset Your Password
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">
                        Please enter your email or phone number to reset your password
                      </p>
                      {/* Email input */}
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder="Email or Phone "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white bg-secondary hover:bg-primary"
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </div>

                      {/* <!--Login button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">
                          Remember your password?{" "}
                          <button
                            type="button"
                            className="text-primary underline"
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            Log in
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
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

export default ResetPassword;

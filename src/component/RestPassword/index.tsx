import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import MoooImage from "../../assets/images/Mooo.png"; // Import your image

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // Basic email validation regex
    if (isEmailValid) {
      try {
        // Send a POST request to your backend endpoint to request password reset
        const response = await fetch("http://localhost:3000/reset-password-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        if (!response.ok) {
          throw new Error("Failed to reset password");
        }
        // If the request is successful, redirect the user to the phone verification page
        navigate("/phone-verification", { state: { email } });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Entered value is not a valid Email.");
    }
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
                        Please enter your email to reset your password
                      </p>
                      {/* Email input */}
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                        placeholder="Email Address"
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

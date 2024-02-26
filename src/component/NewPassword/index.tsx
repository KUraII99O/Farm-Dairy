import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoooImage from "../../assets/images/Mooo.png";

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // State to control the visibility of the success message
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Passwords match, show success message and navigate after a delay
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Navigate after 2 seconds
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={MoooImage} alt="Mooo Image" />
                      <h4 className="mb-12 mt-4 pb-1 text-xl font-semibold">Reset Your Password</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="newPassword" className="block mb-1">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

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

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none" style={{ background: "linear-gradient(to bottom right, #309975, #58b368)" }}>
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">We are more than just a company</h4>
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center">
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg">
            Password reset successfully!
          </div>
        </div>
      )}
    </section>
  );
};

export default NewPassword;

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface EmailVerificationProps {
  email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate(); // Use the useNavigate hook
  const [isValid, setIsValid] = useState(false); // State to track form validity

  // Function to handle input change
  const handleChange = (index: number, value: string) => {
    // Update the input value
    if (inputs.current[index]) {
      inputs.current[index].value = value;

      // Move focus to the next input if available
      if (index < inputs.current.length - 1 && value !== "") {
        inputs.current[index + 1]?.focus();
      }
    }

    // Check if all inputs are filled
    const allFilled = inputs.current.every((input) => input?.value.trim() !== "");
    setIsValid(allFilled); // Update form validity state
  };

  // Function to handle keydown event
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If Backspace key is pressed and the input is empty, move focus to the previous input
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Navigate to the new password page after submitting OTP
      navigate("/new-password");
    } else {
      console.log("Please fill in all input fields.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your Email Address: {email}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}> {/* Call handleSubmit on form submission */}
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (inputs.current[index] = el)} // Set ref for each input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-secondary"
                        type="text"
                        name={`code-${index}`}
                        id={`code-${index}`}
                        maxLength={1} // Set max length to 1
                        onChange={(e) => handleChange(index, e.target.value)} // Handle input change
                        onKeyDown={(e) => handleKeyDown(index, e)} // Handle keydown event
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 ${
                        isValid ? "bg-secondary hover:bg-primary" : "bg-gray-300 cursor-not-allowed"
                      } border-none text-white text-sm shadow-sm`}
                      type="submit"
                      disabled={!isValid} // Disable button if form is not valid
                    >
                      Reset Password
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-secondary"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

import React from "react";

const Pricing = () => {
  return (
    <div>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-primary sm:text-3xl">
              Pricing
            </h2>
            <p className="mt-4 text-xl text-balck-400">
              Simple, transparent pricing for your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Free Plan */}
            <div className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 bg-secondary">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Free</h3>
                <p className="mt-4 text-white">
                  Get started with our basic features.
                </p>
              </div>
              <div className="mb-8 bg-se">
                <span className="text-3xl font-extrabold text-white">
                  DTN 0
                </span>
                <span className="text-xl font-medium text-white">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-white">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>1 user account</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>10 transactions per month</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Basic support</span>
                </li>
              </ul>
              <a
                href="SignUp"
                className="block w-full py-3 px-6 text-center rounded-md text-black font-medium bg-white "
              >
                Sign Up
              </a>
            </div>
            {/* Starter Plan */}
            <div className=" rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-black">Small</h3>
                <p className="mt-4 text-back-400">
                  Perfect for small businesses and startups.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-3xl font-extrabold text-black">$49</span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>5 user accounts</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>100 transactions per month</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Standard support</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-black font-medium bg-primary hover:bg-secondary"
              >
                Sign Up
              </a>
            </div>
            {/* Pro Plan */}
            <div className=" rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-black">Medium</h3>
                <p className="mt-4 text-gray-400">
                  Ideal for growing businesses and enterprises.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-3xl font-extrabold text-black">
                  DTN 99
                </span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited user accounts</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Advanced analytics</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-black font-medium bg-primary hover:bg-secondary"
              >
                Sign Up
              </a>
            </div>
            {/* Enterprise Plan */}
            <div className=" rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-black">Large</h3>
                <p className="mt-4 text-gray-400">
                  Tailored for large-scale deployments and custom needs.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-3xl font-extrabold text-black">
                  DTN 200
                </span>
                <span className="text-xl font-medium text-gray-400">/mo</span>{" "}
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Dedicated infrastructure</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Dedicated support team</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Premium SLAs</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-black font-medium bg-primary hover:bg-secondary"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

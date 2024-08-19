import React from 'react'


interface OptionSelectionProps {
    id: string;
  }


const OptionSelection: React.FC<OptionSelectionProps> = ({ id }) => {
  return (
    <div id={id}>
    {/* Create By Joker Banny */}
    <div className="min-h-screen bg-gradient-to-tr from-primary to-yellow-200 flex justify-center items-center py-20">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-2 gap-5 space-y-4 md:space-y-0">
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
          <h3 className="mb-3 text-xl font-bold text-primary">
            Offline Desktop
          </h3>
          <div className="relative">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              alt="Colors"
            />
            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              FREE
            </p>
          </div>
          <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
          Offline Downloadable Software
          </h1>
          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p>Accessibility Anywhere, Anytime</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <p>Enhanced Privacy and Security</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </span>
              <p>Faster Performance and Offline Capabilities</p>
            </div>
            <button className="mt-4 text-xl w-full text-white bg-primary py-2 rounded-xl shadow-lg">
             Download
            </button>
          </div>
        </div>
        <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
          <h3 className="mb-3 text-xl font-bold text-primary">Online Desktop</h3>
          <div className="relative">
            <img
              className="w-full rounded-xl"
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="Colors"
            />
            <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
              DTN 12
            </p>
            <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
              %20 Discount
            </p>
          </div>
          <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
          Online Website <br />
          <br />


          </h1>
          <div className="my-4">
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <p>Real-Time Updates</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <p>Collaboration and Remote Access</p>
            </div>
            <div className="flex space-x-1 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary mb-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </span>
              <p>Scalability and Cost-Effectiveness</p>
            </div>
            <button className="mt-4 text-xl w-full text-white bg-primary py-2 rounded-xl shadow-lg">
              Choose plan
            </button>
          </div>
        </div>
        
      </div>
    </div>
  
  </div>
  )
}

export default OptionSelection
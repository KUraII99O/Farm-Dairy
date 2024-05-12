import React from "react";
import LandingNav from "../LandingNav";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

const Mobile = () => {
  return (
    <div>
      <section className="py-20 bg-white">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
          <div className="relative">
            <h2 className="w-full text-3xl font-bold text-center sm:text-4xl md:text-5xl">
              {" "}
              Elevate Your Dairy Management
            </h2>
            <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-gray-700 intro sm:max-w-3xl">
              At Gescow, we're dedicated to modernizing Dairy management. Our
              talented team has crafted a comprehensive solution to streamline
              cow management, pregnancy tracking, and staff organization.
            </p>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <lottie-player
                src="https://lottie.host/87679b9e-28ef-4a3c-b258-8e675de6bf99/Cm1qux57qs.json"
                background="transparent"
                speed="1"
                direction="1"
                mode="normal"
                loop
                autoplay
              ></lottie-player>
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
              <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                Drag-n-drop design
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Gescow Mobile App: Revolutionizing Dairy Management
              </h3>
              <p className="mt-5 text-lg text-gray-700 text md:text-left">
                Welcome to the Gescow Desktop App, your all-in-one solution for
                modernizing farm management. Designed by our talented team, this
                comprehensive application offers intuitive tools to streamline
                cow management, pregnancy tracking, and staff organization,
                revolutionizing the way you run your farm.
              </p>
              <a href="">
                <button className="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2 mt-6 bg-primary" >
                  <div className="w-10">
                    <img
                      className="h-full w-full"
                      src="https://www.svgrepo.com/show/394180/google-play.svg"
                    />
                  </div>
                  <div className="">
                    <div className="text-sm font-extrabold">
                      Download on the
                    </div>
                    <div className="text-2xl">Google Play</div>
                  </div>
                </button>
              </a>
            </div>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12">
              <lottie-player
                src="https://lottie.host/61f0d935-b32b-4b45-972d-3804e5f87979/jVxFgrXF5n.json"
                background="transparent"
                speed="1"
                direction="1"
                mode="normal"
                loop
                autoplay
              ></lottie-player>
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
              <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                know your data
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Simplified Cow Management:
              </h3>
              <p className="mt-5 text-lg text-gray-700 text md:text-left">
                Effortlessly keep track of your herd with our user-friendly
                interface. Easily add new cows, update their information, and
                monitor their health and productivity in real-time. With
                advanced sorting and filtering options, managing your cows has
                never been easier.
              </p>
            </div>
          </div>
          <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
              <lottie-player
                src="https://lottie.host/2d08439b-8352-4a6b-b7dc-81e2d0787068/YrVBiazKsE.json"
                background="transparent"
                speed="1"
                direction="1"
                mode="normal"
                loop
                autoplay
              ></lottie-player>
            </div>
            <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Efficient Staff Organization:
              </h3>
              <p className="mt-5 text-lg text-gray-700 text md:text-left">
                Optimize your farm's workflow with our robust staff organization
                tools. Assign tasks, schedule appointments, and track employee
                performance seamlessly within the app. With customizable user
                roles and permissions, you can ensure that each member of your
                team has access to the right information and tools they need to
                succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mobile;

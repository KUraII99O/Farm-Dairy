import React from "react";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
// Define a custom interface for the lottie-player element
interface LottiePlayerProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  background?: string;
  speed?: string;
  direction?: string;
  mode?: string;
  loop?: boolean;
  autoplay?: boolean;
}

// Declare the lottie-player element using the custom interface
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": LottiePlayerProps;
    }
  }
}

const LandingIntro = () => {
  return (
    <div className="grid grid-cols-2 h-screen items-center px-32">
      <div className="flex flex-col space-y-10">
        <h1 className="text-4xl font-semibold">
          Welcome to <b className="text-primary">Gescow</b>:Elevating Farm
          Management
        </h1>
        <h1 className="text-2xl font-semibold ">
          At Gescow, we're dedicated to modernizing farm management. Our
          talented team has crafted a comprehensive solution to streamline cow
          management, pregnancy tracking, and staff organization.
        </h1>
        <Button className="bg-primary px-8 py-2 max-w-max">
          Get started 
          <HiOutlineArrowRight className="ml-2 h-5 w-5 " />
        </Button>
      </div>
      <div className="p-10 ">
        <lottie-player
          src="https://lottie.host/413b3715-00e4-4a75-9ab6-4a6ef5b29742/CA22SlgvSo.json"
          background="transparent"
          speed="1"
          direction="1"
          mode="normal"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
};

export default LandingIntro;

import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useTranslation } from "../Translator/Provider";
import { Link } from "react-router-dom";

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
  const { translate } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center px-10 md:px-20 lg:px-32">
      <div className="flex flex-col justify-center items-center sm:items-start space-y-10 text-center sm:text-left">
        <h1 className="text-4xl font-semibold">
          {translate("welcometo")} <b className="text-primary">Gescow</b>:
          {translate("ElevatingFarmManagement")}
        </h1>
        <h1 className="text-lg sm:text-2xl font-semibold">
          {translate(
            "AtGescowwerededicatedtomodernizingfarmmanagementOurtalentedteamhascraftedacomprehensivesolutiontostreamlinecowmanagementpregnancytrackingandstafforganization"
          )}
        </h1>
        <Link
          to="/app/signup"
          className="max-w-max inline-flex items-center px-8 py-2 mr-3 bg-primary text-white font-semibold rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {translate("getstarted")}
          <HiOutlineArrowRight className="mr-2 ml-2 h-5 w-5" />
          
        </Link>
      </div>
      <div className="p-10">
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

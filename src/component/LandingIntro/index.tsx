import React from "react";

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
      'lottie-player': LottiePlayerProps;
    }
  }
}

const LandingIntro = () => {
  return (
    <div className="grid grid-cols-2">
      <div></div>
      <div>
        {/* Use lottie-player as a regular HTML element */}
        <lottie-player
          src="https://lottie.host/413b3715-00e4-4a75-9ab6-4a6ef5b29742/CA22SlgvSo.json"
          background="transparent"
          speed="1"
          direction="1"
          mode="normal"
          loop
          autoplay
        >
        </lottie-player>
      </div>
    </div>
  );
};

export default LandingIntro;

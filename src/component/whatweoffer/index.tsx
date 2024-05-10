import React from "react";
import contentmarketing from "../../assets/images/content-marketing.png";
import inboundmarketing from "../../assets/images/inbound-marketing.png";
import socialmedia from "../../assets/images/social-media.png";
import seo from "../../assets/images/seo.png";

const whatweoffer = () => {
  const strategies = [
    {
      title: "Streamlined Cow Management",
      description:
        "Effortlessly oversee your herd's well-being with intuitive tools, simplifying tasks like feeding schedules, health monitoring, and breeding records.",
      image: contentmarketing,
    },
    {
      title: "Precise Pregnancy Tracking",
      description:
        "Ensure herd health and productivity with our advanced pregnancy tracking system. Receive real-time alerts and insights for optimal breeding outcomes.",
      image: inboundmarketing,
    },
    {
      title: "Efficient Staff Management",
      description:
        "Coordinate farm activities seamlessly by assigning tasks, monitoring progress, and facilitating team communication—all centralized in one convenient platform.",
      image: socialmedia,
    },
    {
      title: "Comprehensive Data Analytics",
      description:
        "Gain valuable insights into your farm's performance with comprehensive data analytics. Make informed decisions and drive productivity like never before.",
      image: seo,
    },
  ];

  return (
    <div>
      <h1 className="text-5xl font-semibold text-primary mx-20 text-center">
      OUR VALUES
      </h1>
      <p className="text-xl mt-10 mx-20">
        Gescow is more than just a farm management solution. We're a dedicated
        team committed to empowering farmers with intuitive technology.
        Experience streamlined cow, pregnancy, and staff management to
        revolutionize your farm operations today!
      </p>

      <div className="grid grid-cols-2 gap-20 mt-10 sm:grid-cols-1 md:grid-cols-2">
        {strategies.map((item, index) => {
          return (
            <div
              key={index}
              className="border border-primary p-5 flex flex-col space-y-10 rounded transform hover:scale-105 duration-300 mx-10"
            >
              <h1 className="mx-80 sm:mx-5 text-center -mt-8 bg-white border-primary border text-2xl rounded text-secondary py-2 px-2">
                {item.title}
              </h1>
              <img src={item.image} alt={item.title} className="h-24 w-24" />
              <p className="text-gray-600 text-md hover:text-primary">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default whatweoffer;

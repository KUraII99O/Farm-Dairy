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

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-10 mt-6">
        {strategies.map((item, index) => (
          <div
            key={index}
            className="border border-primary p-5 flex flex-col space-y-6 rounded transform hover:scale-105 duration-300 mx-10"
          >
            <h1 className="text-center text-2xl text-secondary">{item.title}</h1>
            <img
              src={item.image}
              alt={item.title}
              className="mx-auto h-24 w-24 sm:h-32 sm:w-32"
            />
            <p className="text-gray-600 text-md text-center">{item.description}</p>
            <a
              href="#"
              className="text-primary hover:text-secondary mt-auto self-end"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default whatweoffer;

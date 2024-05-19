import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Stats from "../components/smallcomponents/Stats";

const About = () => {
 

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-gray-100 pt-10">
        <h2 className="text-4xl text-gray-800 font-extrabold mb-4 py-16">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 max-w-2xl text-center md:text-left mb-8">
            <p className="text-lg text-gray-700">
              Welcome to{" "}
              <span className="font-bold text-xl text-orange-600">
                KhealNepal
              </span>
              ,where your passion for sports meets seamless convenience. We are
              not just a booking website.we're the bridge between enthusiasts
              and the perfect venue for your games, events, and celebrations.
              Born from a love of sports, our platform simplifies the process of
              finding and booking diverse sports facilities. With easy booking,
              transparent information, and a passionate community, we are
              committed to enhancing your sports experience. Join us in creating
              unforgettable moments.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us"
              className="w-full md:max-w-md rounded-md shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="py-12 bg-gray-100">
        <div className="mx-auto max-w-4xl">
          <Stats/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

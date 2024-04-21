import React from "react";
import "../style/home.css";
import ServiceList from "./Servicelist";
import NewsLetter from "./Newesletter";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import ImageSlider from "./FeaturedVenueList";

const Hero = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="py-16 bg-gray-100 overflow-hidden"> {/* Ensure overflow is hidden */}
        <div className="container mx-auto">
          <div className="flex flex-wrap p-5 items-center">
            <div className="lg:w-6/12 lg:pr-4">
              <div className="hero__content">
                <div className="hero__subtitle">
                  <h3 className="text-2xl font-bold text-orange-600">
                    Know Before You Go
                  </h3>
                </div>
                <h1 className="text-4xl font-semibold mt-4 mb-2">
                  Empower your passion, book your{" "}
                  <span className="text-orange-600">victory</span>
                </h1>
                <p className="text-base text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ullam ipsum nobis asperiores soluta voluptas quas voluptates.
                  Molestiae tempora dignissimos, animi praesentium molestias
                  perferendis porro expedita delectus. Soluta natus porro.
                </p>
              </div>
            </div>

            <div className="lg:w-6/12 lg:mt-0 mt-8 lg:pl-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero__img-box">
                  <img
                    src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="football"
                    className="w-full h-64 object-cover rounded-20 border-2 border-orange-700"
                  />
                </div>
                <div className="hero__img-box">
                  <img
                    src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="cricket"
                    className="w-full h-64 object-cover rounded-20 border-2 border-orange-700"
                  />
                </div>
                <div className="hero__img-box">
                  <img
                    src="https://images.unsplash.com/photo-1540828999861-3a4ecd58d9c9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="basketball"
                    className="w-full h-64 object-cover rounded-20 border-2 border-orange-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section>
        <div className="container mx-auto">
          <div className="lg:flex-1 pt-5">
            <h3 className="text-2xl text-center font-bold text-orange-600">
              What we serve
            </h3>
            <h2 className="text-4xl font-bold text-center text-secondary-color mt-4 mb-8">
              We offer our best services
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 p-2 justify-center">
            <ServiceList />
          </div>
        </div>
      </section>

      {/* FEATURED VENUE SECTION */}
      <section>
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-orange-600 text-center">Explore</h3>
            <h2 className="featured__tour-title text-center">Recent Venues</h2>
          </div>
          <ImageSlider />
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section>
  <div className="mx-auto p-10 bg-gray-200">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left side content */}
      <div className="space-y-4">
        <h3 className="text-2xl text-orange-600 font-bold pl-20">
          Experience
        </h3>
        <h2 className="text-4xl font-bold text-secondary-color pl-20">
          With our all experience <br /> we will serve you
        </h2>
        <p className="text-lg text-gray-600 pl-20">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
          aliquam, hic tempora inventore suscipit unde.
        </p>
        <div className="grid grid-cols-3 gap-5">
          {/* Counter boxes */}
          <div className="counter__box flex flex-col items-center">
            <span className="w-16 h-16 flex items-center justify-center bg-primary-color text-white font-bold text-lg rounded-full">
              12k+
            </span>
            <h6 className="text-sm text-gray-600 mt-1">Sports venue</h6>
          </div>

          <div className="counter__box flex flex-col items-center">
            <span className="w-16 h-16 flex items-center justify-center bg-primary-color text-white font-bold text-lg rounded-full">
              2k+
            </span>
            <h6 className="text-sm text-gray-600 mt-1">
              Regular clients
            </h6>
          </div>

          <div className="counter__box flex flex-col items-center">
            <span className="w-16 h-16 flex items-center justify-center bg-primary-color text-white font-bold text-lg rounded-full">
              5
            </span>
            <h6 className="text-sm text-gray-600 mt-1">
              Year experience
            </h6>
          </div>
          {/* Counter boxes end */}
        </div>

        {/* Additional content */}
        <div className="pl-20">
          <p className="text-base text-gray-600">
            Additional content goes here. You can add more text, images, or
            other elements as needed.
          </p>
          <button className="bg-primary-color text-orange-600 font-bold py-2 px-4 rounded mt-4">
            Learn More
          </button>
        </div>
      </div>

      {/* Right side content */}
      <div className="flex flex-col justify-between gap-8 items-start lg:items-end">
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="min-w-full object-fill pr-20 rounded"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* FAQ SECTION */}
      <section>
        <div className="container mx-auto p-10">
          <div className="mb-8">
            <h3 className="text-2xl text-center font-bold text-orange-600">
              FAQ
            </h3>
            <h2 className="text-2xl font-bold text-secondary-color text-center">
              How can we help you?
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section>
        <div className="mx-auto py-10 bg-gray-100 p-2"> {/* Removed the horizontal padding */}
          <div className="mb-8">
            <h3 className="text-2xl text-center text-orange-600 font-bold">
              Testimonial
            </h3>
            <h2 className="text-2xl text-center font-bold text-secondary-color">
              What our customer say about us
            </h2>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* Newsletter component */}
      <NewsLetter />
    </>
  );
};

export default Hero;

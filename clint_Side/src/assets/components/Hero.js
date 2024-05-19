import React from "react";
import "../style/home.css";
import ServiceList from "./Servicelist";
import NewsLetter from "./Newesletter";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import ImageSlider from "./FeaturedVenueList";
import Stats from "./smallcomponents/Stats";

const Hero = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="py-16 bg-gray-100 overflow-hidden">
        {" "}
        {/* Ensure overflow is hidden */}
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
                  Ready to take your passion for sports activities to the next
                  stage? Join the KhelNepal community today and Elevate your
                  sports activities passion with us. From scoring goals to
                  hitting sixes, we assist your adventure. Make informed
                  selections, seamless bookings, and unforgettable victories.
                  Start empowering your passion with KhelNepal now.
                </p>
              </div>
            </div>

            <div className="lg:w-6/12 lg:mt-0 pt-10 lg:pl-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="hero__img-box hover:scale-125 transition-all duration-100 hover:z-10">
                  <img
                    src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="football"
                    className="w-full h-64 object-cover rounded-20 border-2  border-orange-700"
                  />
                </div>
                <div className="hero__img-box scale-110 hover:scale-125 scale transition-all duration-100">
                  <img
                    src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="cricket"
                  
                    className="w-full h-64 object-cover rounded-20 border-2 border-orange-700"
                  />
                </div>
                <div className="hero__img-box hover:scale-125 transition-all duration-100">
                  <img
                    src="https://images.unsplash.com/photo-1540828999861-3a4ecd58d9c9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="basketball"
                    className="w-full h-64 object-cover rounded-20 border-2 border-orange-700"
                  />
                </div>
              </div>
            </div>

            {/* <SearchBar /> */}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-gray-200">
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
        <div className="container mx-auto md:p-8 p-2">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-orange-600 text-center">
              Explore
            </h3>
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
              <h3 className="text-2xl text-orange-600 font-bold md:pl-20">
                Experience
              </h3>
              <h2 className="text-4xl font-bold text-secondary-color md:pl-20">
                With our all experience <br /> we will serve you
              </h2>
              <p className="text-lg text-gray-600 md:pl-20">
                Seamless sports venue booking. Discover a diverse selection of
                venues, book effortlessly, and enjoy transparent pricing. Get
                personalized recommendations and reliable customer support every
                step of the way. Elevate your sports experience with us today!
              </p>
              <Stats />

              {/* Additional content */}
              <div className="md:pl-20">
                <p className="text-base text-gray-600">
                  Additional content goes here. You can add more text, images,
                  or other elements as needed.
                </p>
                <button className="bg-primary-color text-orange-600 font-bold py-2 px-4 rounded mt-4">
                  Learn More
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 items-start lg:items-end">
  <div className="rounded-lg overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
      className="object-fill w-full  rounded-lg" // Adjust height as needed
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
        <div className="mx-auto py-10 bg-gray-100 p-2">
          {" "}
          {/* Removed the horizontal padding */}
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

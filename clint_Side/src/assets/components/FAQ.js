import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <section className="text-white ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold text-xl text-gray-800">
                How do I get started?
              </h2>
              <p className="text-sm mt-3 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat aliquam adipisci iusto aperiam? Sint asperiores sequi
                nobis inventore ratione deleniti?
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-900 text-lg mt-12">
          Can't find what you're looking for?{" "}
          <Link
            to="/contactus"
            className="font-medium text-orange-600 hover:underline"
          >
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FAQ;

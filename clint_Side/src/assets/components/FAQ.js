import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <section className="text-white ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-gray-800">
              How do I book a sports venue on your website?
            </h2>
            <p className="text-sm mt-3 text-gray-600">
              To book a sports venue, simply browse through our selection of
              venues, select your desired location, date, and time, and proceed
              to checkout. It's quick and easy!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-gray-800">
              Are there any hidden fees or charges?
            </h2>
            <p className="text-sm mt-3 text-gray-600">
              No, we believe in transparent pricing. The price you see is the
              price you pay. There are no hidden fees or charges.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-gray-800">
              How can I contact customer support if I have a question or issue?
            </h2>
            <p className="text-sm mt-3 text-gray-600">
              If you have any questions or issues, our customer support team is
              here to help. You can contact us via our website.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-xl text-gray-800">
              Can I cancel or modify my booking?
            </h2>
            <p className="text-sm mt-3 text-gray-600">
              Yes, you can cancel or modify your booking, depending on the
              cancellation policy of the venue. Please check the specific
              venue's cancellation policy before making your booking.
            </p>
          </div>
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

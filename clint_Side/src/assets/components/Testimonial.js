import React from 'react'
import ava01 from "../image/ava-1.jpg";
import ava02 from "../image/ava-2.jpg";
import ava03 from "../image/ava-3.jpg";
export default function Testimonial() {
  return (
    <section id="testimonials" className=" mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:-mx-3">
          <div className="flex-1 px-3">
            <div
              className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
            >
              <p className="text-xl font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
              <p className="mt-6">
                Eu lobortis elementum nibh tellus molestie nunc non blandit
                massa. Sit amet consectetur adipiscing elit duis.
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 mr-4 rounded-full"
                  src={ava01}
                  alt="Jane Doe"
                />
                <div>
                  <p>Jane Doe</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-3">
            <div
              className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
            >
              <p className="text-xl font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
              <p className="mt-6">
                Eu lobortis elementum nibh tellus molestie nunc non blandit
                massa. Sit amet consectetur adipiscing elit duis.
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 mr-4 rounded-full"
                  src={ava02}
                  alt="John Doe"
                />
                <div>
                  <p>John Doe</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-3">
            <div
              className="p-12 rounded-lg border border-solid border-gray-200 mb-8"
              style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
            >
              <p className="text-xl font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </p>
              <p className="mt-6">
                Eu lobortis elementum nibh tellus molestie nunc non blandit
                massa. Sit amet consectetur adipiscing elit duis.
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 mr-4 rounded-full"
                  src={ava03}
                  alt="Jane Smith"
                />
                <div>
                  <p>Jane Smith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

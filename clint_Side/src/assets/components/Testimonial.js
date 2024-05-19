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
                Booking sports venues has never been easier!
              </p>
              <p className="mt-6">
                With KhelNepal, I can quickly find and reserve the perfect venue
                for my soccer games. The transparent pricing and excellent
                customer support make the entire experience hassle-free.
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 object-cover mr-4 rounded-full"
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
                I recently organized a corporate sports event
              </p>
              <p className="mt-6">
                KhelNepal made the entire process seamless. The team was
                responsive to all my inquiries, and the venue recommendation
                feature helped us find the perfect location. Can't thank them
                enough
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 object-cover  mr-4 rounded-full"
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
                As a coach, finding the right venue for my team's practices is
                crucial.
              </p>
              <p className="mt-6">
                Thanks to KhelNepal, I can easily search for available
                facilities and book them on the spot. It's a game-changer for
                our training sessions!
              </p>
              <div className="flex items-center mt-8">
                <img
                  className="w-12 h-12 object-cover mr-4 rounded-full"
                  src={ava03}
                  alt="Jane Smith"
                />
                <div>
                  <p>Coach Mike</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

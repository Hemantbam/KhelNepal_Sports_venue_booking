import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <section className="bg-grey-100 pt-24 dark:bg-gray-100">
        <div className=" mx-auto flex justify-center pb-6">
          <div className=" w-6/12 bg-white dark:bg-white rounded-lg p-8 shadow-2xl ">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-orange-500 ">
              Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-900 sm:text-xl">
              Got a technical issue? Want to send feedback about our feature?
              Need details about our Business plan? Let us know.
            </p>
            <form action="#" className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="name@email.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Let us know how we can help you"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-700 sm:w-fit hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-primary-800"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

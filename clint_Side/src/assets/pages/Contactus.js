import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API } from "../Data/baseIndex";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "subject") setSubject(value);
    if (name === "message") setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please fill in all required fields properly.");
    setTimeout(() => {
      setErrorMessage("");
    }, 1000);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}api/contact`, {
        email,
        subject,
        message,
      });
      if (response.status === 200) {
        setSuccessMessage("Message sent successfully!");
        setTimeout(() => {
          setSuccessMessage("We will reach you soon.");
          setTimeout(() => {
            setSuccessMessage("");
          }, 1000);
        }, 1000);
        setErrorMessage("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while sending the message. Please try again later."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 dark:bg-gray-100 py-32">
        <div className="container mx-auto px-4">
          <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-white rounded-lg p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-extrabold text-center text-gray-900 dark:text-orange-500">
              Contact Us
            </h2>
            <p className="mb-8 text-center text-gray-500 dark:text-gray-900">
              Got a technical issue? Want to send feedback about our feature?
              Need details about our Business plan? Let us know.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="name@email.com"
                  required
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
                  name="subject"
                  value={subject}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full rounded-md border border-gray-400 p-2 text-sm"
                  placeholder="Leave a comment..."
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-sm font-medium text-white rounded-lg bg-orange-700 hover:bg-orange-800 focus:ring-2 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-primary-800 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

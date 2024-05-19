import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check local storage for the modal state
    const storedModalState = localStorage.getItem('isModalOpen');

    // Check if a token exists (replace this with your actual token check logic)
    const tokenExists = !!localStorage.getItem('token');

    // If no value is found in local storage and no token exists, show the modal
    setIsModalOpen(storedModalState === null && !tokenExists);

  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleModelToggle = () => {
    setIsModalOpen(!isModalOpen);
    localStorage.setItem('isModalOpen', !isModalOpen); // Store the updated modal state in local storage
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar with primary color orange-600 */}
      <Navbar className="bg-orange-600 text-gray-800" />

      {/* Hero section with gray background */}
      <Hero className="bg-gray-100 text-gray-800" />

      {/* Modal toggle button */}


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50 flex-col">
          <div className="bg-white rounded-lg shadow-lg w-full md:max-w-[75%] lg:max-w-[50%] h-[80vh] overflow-y-auto p-4 md:p-5 flex flex-col">
            {/* Modal content */}
            <div className="p-4 pb-2 md:p-5 space-y-4 overflow-y-scroll">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Terms and Conditions</h2>
              <hr />
              {/* Welcome Section */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Welcome to KhelNepal!</h3>

                <p className="text-base leading-relaxed text-gray-500">
                  Hi there! We're thrilled to have you here at KhelNepal, your ultimate spot to book sports venues.
                  By using our website, you undertake to play by these rules. If you have any questions, just give us a heads-up.
                </p>
              </section>

              {/* License to Use Our Website */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Your License to Use Our Website</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Our website is the symbol of our labour, and we own everything cool here.
                  Feel free to explore, download, and print pages for yourself.
                  Just don't do anything shady like copying or selling our stuff.
                </p>
              </section>

              {/* Creating Your Account */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Creating Your Account</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Want access to some special areas? You'll need to create an account.
                  Keep your login details safe and don't share them with anyone else.
                </p>
              </section>

              {/* Booking Your Venue and Payment */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Booking Your Venue and Payment</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  All set to reserve a sports venue? Fantastic!
                  Observe the guidelines that the venue's owner has established.
                  And follow the guidelines we provide you during the booking process when it comes time to make your payment.
                </p>
              </section>

              {/* Cancellation and Refunds */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Cancellation and Refunds</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Plans change sometimes, and that's okay! Just make sure you review the venue's cancellation policy.
                  It varies depending on the location.
                </p>
              </section>

              {/* Sharing Your Content */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Sharing Your Content</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Have something cool to share? Awesome! You permit us to use it as you see fit by sharing it with us -
                  as long as we stay within reason, of course.
                </p>
              </section>

              {/* Our Responsibility */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Our Responsibility</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Though we try our best to provide accurate info about sports venues, we're not perfect.
                  So if something goes wrong while you're using our website, we're not liable for any damages or losses.
                </p>
              </section>

              {/* Changes to These Terms */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Changes to These Terms</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We might need to update these terms timely, so refer periodically for any changes.
                </p>
              </section>

              {/* Ending Your Access */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Ending Your Access</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We hope it never comes to this, but If you don't follow the rules, we may suspend or terminate your access to our website.
                </p>
              </section>

              {/* Where We Stand Legally */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Where We Stand Legally</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  These terms and conditions are governed by the laws of [Your Jurisdiction],
                  and any disputes will be settled in the courts of Data Act 2079 (2022).
                </p>
              </section>

              {/* Looking Out for Each Other */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Looking Out for Each Other</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  You guarantee that we won't be held responsible for any harm resulting from your use of our website.
                  Don't worry, though—we'll reciprocate!
                </p>
              </section>

              {/* Protecting Your Privacy */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Protecting Your Privacy</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We value the privacy that you own. Check out our Privacy Policy to learn how we handle your personal information.
                </p>
              </section>

              {/* Links to Other Websites */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Links to Other Websites</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We might link to other websites. However, we have no control over what occurs on those websites.
                  Read their terms and conditions as well.
                </p>
              </section>

              {/* What You Can't Do */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">What You Can't Do</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Please don't attempt to sneak around or hack our website.
                  If we catch you doing this, it's not cool and we'll have to take action.
                </p>
              </section>

              {/* Keeping Things Secure */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Keeping Things Secure</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We do our best to keep your information safe, but we can't guarantee it.
                  Be careful with what you share online!
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Cookies</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  We use cookies to improve your experience on our website.
                  By using our site, you agree to our Cookie Policy.
                </p>
              </section>

              {/* Resolving Disputes */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Resolving Disputes</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  If we have any disagreements, let's try to work things out like adults.
                  If we can't, we'll bring in a mediator or arbitrator to help us find a solution.
                </p>
              </section>

              {/* Forgiving Each Other */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Forgiving Each Other</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  If we don't enforce any part of these terms, it doesn't mean we're giving up our rights.
                  We're just being chill.
                </p>
              </section>

              {/* Making Sure Everything Stays Legal */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">Making Sure Everything Stays Legal</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  If any part of these terms isn't legal or enforceable, the rest of the terms still apply.
                </p>
              </section>

              {/* How to Reach Us */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900">How to Reach Us</h3>
                <p className="text-base leading-relaxed text-gray-500">
                  Do you have questions or concerns? Reach out to us on the contact page, and we'll get back to you.
                  We're here to help!
                </p>
              </section>

              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
              <hr />
              {/* Information We Collect */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Information We Collect</h3>
                <p className="text-base text-gray-500">
                  We may collect personal information from you when you visit our website, register for an account, make a booking, or communicate with us. This may include:

                  <li>Personal identification information (such as name, email address, phone number)</li>
                  <li>Payment information (such as credit card details)</li>
                  <li>Booking preferences and history</li>
                  <li>Communication and interactions with us</li>

                </p>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
                <p className="text-base text-gray-500">
                  We may use the information we collect from you for the following purposes:

                  <li>To provide and maintain our services</li>
                  <li>To process bookings and payments</li>
                  <li>To communicate with you about your bookings and inquiries</li>
                  <li>To personalize your experience and improve our website</li>
                  <li>To send promotional emails and newsletters</li>

                </p>
              </section>

              {/* Information Sharing */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Information Sharing</h3>
                <p className="text-base text-gray-500">
                  We may share your personal information with third-party service providers who assist us in operating our website, conducting our business, or servicing you. These parties are obligated to keep your information confidential and are prohibited from using your personal information for any other purpose.
                </p>
                {/* (Other sharing details omitted for brevity) */}
              </section>

              {/* Data Security */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Security</h3>
                <p className="text-base text-gray-500">
                  We implement reasonable security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Your Choices */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Choices</h3>
                <p className="text-base text-gray-500">
                  You may choose not to provide us with certain personal information, but this may limit your ability to access certain features of our website or use our services.
                  You can opt out of receiving promotional emails from us by following the instructions provided in the email or by contacting us directly.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Changes to This Privacy Policy</h3>
                <p className="text-base text-gray-500">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-base text-gray-500 mb-4">
                  If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:hemantbam133@gmail.com">hemantbam133@gmail.com</a>.
                </p>
              </section>
              {/* Accept button */}

            </div>
            <div className="flex justify-center pt-2  ">
              <button
                onClick={handleModelToggle}
                className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-800 focus:outline-none"
              >
                I Accept all Terms and Conditions as well as all the privacy policy's.
              </button>
            </div>
          </div>





        </div>


      )}

      {/* Footer with dark gray background */}
      <Footer className="bg-gray-800 text-gray-200" />
    </div>
  );
};

export default Homepage;

import React from 'react'
import logo from '../image/unnamed.png'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-300 overflow-hidden">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={logo} className="h-12 me-3" alt="Khelnepal Logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-gray-900">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/venues" className="hover:underline ">
                    Venue
                  </Link>
                </li>
                <li className='mb-4'>
                  <Link to="/aboutus" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contactus" className="hover:underline">
                    Contact US
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-grey-900">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Facebook
                  </a>
                </li>
                <li className='mb-4'>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Twitter
                  </a>
                </li>
              
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-grey-900">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to={`/terms`} className="hover:underline">
                    Privacy Policy || Terms &amp; Conditions
                  </Link>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline text-orange-500">
              KhelNepal
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-orange-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-orange-600 ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-orange-600 ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-orange-600 ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C7.283 0 6.944 0.013 5.878 0.06 4.813 0.11 4.088 0.278 3.45 0.525c-0.658 0.255 -1.216 0.598 -1.772 1.153S0.779 2.792 0.525 3.45C0.278 4.088 0.109 4.813 0.06 5.878 0.01 6.944 0 7.283 0 10s0.013 3.056 0.06 4.123c0.05 1.064 0.218 1.79 0.465 2.427a4.917 4.917 0 0 0 1.153 1.772A4.917 4.917 0 0 0 3.45 19.475c0.638 0.247 1.363 0.416 2.427 0.465C6.944 19.99 7.283 20 10 20s3.056 -0.013 4.123 -0.06c1.064 -0.05 1.79 -0.218 2.427 -0.465a4.917 4.917 0 0 0 1.772 -1.153 4.917 4.917 0 0 0 1.153 -1.772c0.247 -0.638 0.416 -1.363 0.465 -2.427 0.05 -1.067 0.06 -1.406 0.06 -4.123s-0.013 -3.056 -0.06 -4.123c-0.05 -1.064 -0.218 -1.791 -0.465 -2.427a4.917 4.917 0 0 0 -1.153 -1.772A4.875 4.875 0 0 0 16.55 0.525c-0.638 -0.247 -1.363 -0.416 -2.427 -0.465C13.056 0.01 12.717 0 10 0m0 1.8c2.669 0 2.988 0.013 4.042 0.059 0.975 0.046 1.504 0.208 1.856 0.346 0.468 0.181 0.8 0.398 1.152 0.747 0.349 0.35 0.566 0.682 0.747 1.151 0.137 0.352 0.3 0.881 0.344 1.856 0.048 1.055 0.058 1.372 0.058 4.042s-0.013 2.988 -0.062 4.042c-0.051 0.975 -0.213 1.504 -0.351 1.856a3.167 3.167 0 0 1 -0.749 1.152 3.117 3.117 0 0 1 -1.15 0.747c-0.35 0.137 -0.887 0.3 -1.863 0.344 -1.062 0.048 -1.374 0.058 -4.049 0.058s-2.988 -0.013 -4.049 -0.062c-0.976 -0.051 -1.513 -0.213 -1.863 -0.351a3.083 3.083 0 0 1 -1.149 -0.749 3.033 3.033 0 0 1 -0.75 -1.15c-0.138 -0.35 -0.299 -0.887 -0.35 -1.863 -0.037 -1.05 -0.051 -1.374 -0.051 -4.037s0.013 -2.988 0.051 -4.051c0.051 -0.975 0.213 -1.512 0.35 -1.862 0.175 -0.475 0.399 -0.8 0.75 -1.151 0.349 -0.349 0.675 -0.574 1.149 -0.748 0.35 -0.138 0.876 -0.301 1.851 -0.351 1.063 -0.037 1.375 -0.05 4.049 -0.05zm0 3.065a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 1 0 0 -10.27M10 13.333c-1.842 0 -3.333 -1.492 -3.333 -3.333s1.492 -3.333 3.333 -3.333 3.333 1.492 3.333 3.333 -1.492 3.333 -3.333 3.333m6.538 -8.671a1.201 1.201 0 0 1 -2.4 0 1.2 1.2 0 0 1 2.4 0"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

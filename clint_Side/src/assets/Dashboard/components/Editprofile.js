import React from 'react';

export default function EditProfile() {
  return (
    <section className="min-h-screen py-10 bg-gray-50 dark:bg-gray-200 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl dark:border dark:border-gray-300 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-600 text-center mb-6">
          Edit Profile
        </h1>
        <form className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* PAN */}
          <div>
            <label htmlFor="PAN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              PAN
            </label>
            <input
              type="text"
              name="PAN"
              id="PAN"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Address */}
          <div>
            <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Street Address
            </label>
            <input
              type="text"
              name="address.street"
              id="street"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* City */}
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              City
            </label>
            <input
              type="text"
              name="address.city"
              id="city"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* State */}
          <div>
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              State
            </label>
            <input
              type="text"
              name="address.state"
              id="state"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Postal Code
            </label>
            <input
              type="text"
              name="address.postalCode"
              id="postalCode"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Country
            </label>
            <input
              type="text"
              name="address.country"
              id="country"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Business Name
            </label>
            <input
              type="text"
              name="businessDetails.businessName"
              id="businessName"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Registration Number */}
          <div>
            <label htmlFor="registrationNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Registration Number
            </label>
            <input
              type="text"
              name="businessDetails.registrationNumber"
              id="registrationNumber"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Tax Identification Number */}
          <div>
            <label htmlFor="taxIdentificationNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Tax Identification Number
            </label>
            <input
              type="text"
              name="businessDetails.taxIdentificationNumber"
              id="taxIdentificationNumber"
              className="w-full rounded-md border border-gray-400 p-2 text-sm"
            />
          </div>
          {/* Profile Picture */}
          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="image" className="w-60 mx-auto flex items-center justify-center h-60 cursor-pointer border border-gray-400 rounded-full p-2 text-center">
              <span>Select Image</span>
            </label>
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
}

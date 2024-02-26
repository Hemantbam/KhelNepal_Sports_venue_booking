import React from 'react'

export default function Searchbar() {
  return (
    <div className="max-w-md mx-auto  mt-8">
      <form className="flex px-1 flex-wrap text-center justify-center ">
        <input
          className="w-3/12 rounded-l-lg p-4 border-t mr-0 border-b border-l outline-none text-gray-800 border-gray-200 bg-white"
          placeholder="Lalitpur"
        />
        <input
          className=" p-4 border-t mr-0 border-b outline-none border-r text-gray-800 border-gray-200 bg-white"
          placeholder="Search for Venue"
        />
        <button className=" rounded-r-lg bg-orange-500 text-black font-bold p-4 uppercase border-orange-200 border-t border-b  border-l border-r">
          Search
        </button>
      </form>
    </div>
  );
}

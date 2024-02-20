import React from 'react'

export default function FeaturedVenueList() {
  return (
    <>
      {/* Slider */}
      <div
        data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }'
        className="relative"
      >
        <div className="hs-carousel relative overflow-hidden w-full min-h-[350px] bg-green-200 rounded-lg">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full bg-gray-100 p-6">
                <span className="self-center text-4xl transition duration-700">
                  First slide
                </span>
              </div>
            </div>
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full bg-gray-200 p-6">
                <span className="self-center text-4xl transition duration-700">
                  Second slide
                </span>
              </div>
            </div>
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full bg-gray-300 p-6">
                <span className="self-center text-4xl transition duration-700">
                  Third slide
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
          <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer" />
          <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer" />
          <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer" />
        </div>
      </div>
      {/* End Slider */}
    </>
  );
}

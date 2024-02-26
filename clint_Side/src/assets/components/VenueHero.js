 import React from "react";
 import Searchbar from "./Searchbar";

 const VenueHero = () => {
   const backgroundImageUrl =
     "url('https://images.unsplash.com/photo-1602357280104-742c517a1d82?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

   return (
     <>
       <div
         className="bg-cover bg-center bg-orange-600 text-white py-9"
         style={{ backgroundImage: backgroundImageUrl }}
       >
         <div className="max-w-[800px] mt-[-97px] w-full h-screen mx-auto text-center flex flex-col justify-center">
           <p className="text-orange-300 font-bold p-2">Explore the Venues</p>
           <div className="flex justify-center items-center">
             <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
               Connect, collaborate
             </p>
             {/* <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              strings={["streamline", "B2C", "Services"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            /> */}
           </div>
           <p className="md:text-2xl text-xl font-bold text-orange-300">
             Your one-stop-shop for all your service needs
           </p>
           <Searchbar />
         </div>
       </div>
     </>
   );
 };

 export default VenueHero;

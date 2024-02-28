import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer' 
import VenueHero from '../components/VenueHero'
import Venuelist from '../components/Venuelist'
import Pagination from '../components/smallcomponents/Pagination'

export default function Venue() {
  return (
    <>
    <Navbar />
    <VenueHero />
    <Venuelist />
    <Pagination/>
    <Footer />
    </>
  )
}

import React from 'react'
import Header from '../utils/Hotels/Header'
import Cards from '../utils/Hotels/Cards'
import HotelBookings from '../utils/Hotels/Table'
import HotelOccupancyChart from '../utils/Hotels/HotelOccupancyChart'
import HotelBookingTrendChart from '../utils/Hotels/HotelBookingTrendChart'

const Hotel = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 gap-6 my-6 md:grid-cols-2'>

<HotelOccupancyChart/>
<HotelBookingTrendChart/>


  </div>
  <HotelBookings/>
  </>
}

export default Hotel

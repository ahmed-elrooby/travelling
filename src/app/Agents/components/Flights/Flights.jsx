import React from 'react'
import Header from '../utils/Flights/Header'
import Cards from '../utils/Flights/Cards'
import AirlinesBarChart from '../utils/Flights/AirlinesBarChart'
import BookingPieChart from '../utils/Flights/FlightPieChart'
import FlightBookingsTable from '../utils/Flights/Table'

const Flights = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    <AirlinesBarChart/>
    <BookingPieChart/>
  </div>
  <FlightBookingsTable/>
  </>
}

export default Flights

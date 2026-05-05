import React from 'react'
import Header from '../utils/Home/Header'
import Cards from '../utils/Home/Cards'
import SalesChart from '../utils/Home/SalesChart'
import BookingChart from '../utils/Home/BookingChart'
import RecentBooking from '../utils/Home/RecentBooking'
import Notifications from '../utils/Home/Notifications'

const Home = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 gap-4 my-6 md:grid-cols-2'>
    <SalesChart/>
    <BookingChart/>
  </div>

    <RecentBooking/>
    
  </>
}

export default Home

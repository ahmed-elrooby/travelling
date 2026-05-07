import React from 'react'
import Header from '../utils/Home/Header'
import Cards from '../utils/Home/Cards'
import MyBookings from '../utils/Home/MyBooking'
import Chart from '../utils/Home/Chart'
import Chart2 from '../utils/Home/Chart2'

const Home = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 gap-4 my-6 md:grid-cols-2'>
<Chart/>
<Chart2/>
  </div>
  <MyBookings/>
  </>
}

export default Home

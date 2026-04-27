import React from 'react'
import Cards from './components/Utils/Home/Cards'
import Booking from './components/Utils/Home/Booking'
import Operation from './components/Utils/Home/Operation'
import RevenueChart from './components/Utils/Home/RevenuesChart'
import BookingDistribution from './components/Utils/Home/BookingDistribution'

const page = () => {
  return <>
<>
<Cards/>
<div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
       <RevenueChart/>
       <BookingDistribution/>            
</div>
<div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
      <Booking/>

      <Operation/>  
</div>
</>
  </>
}

export default page

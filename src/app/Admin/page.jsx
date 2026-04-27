import React from 'react'
import Cards from './components/utils/Home/Cards'
import Booking from './components/utils/Home/Booking'
import Operation from './components/utils/Home/Operation'
import RevenueChart from './components/utils/Home/RevenuesChart'
import BookingDistribution from './components/utils/Home/BookingDistribution'

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

import React from 'react'
import Cards from './components/utils/Home/Cards'
import Booking from './components/utils/Home/Booking'
import Operation from './components/utils/Home/Operation'

const page = () => {
  return <>
<>
<Cards/>
<div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
      <Booking/>
      <Operation/>  
</div>
</>
  </>
}

export default page

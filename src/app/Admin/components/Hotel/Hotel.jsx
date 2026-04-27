import React from 'react'
import HotelBookingsHeader from '../utils/Hotel/Header'
import HotelStats from '../utils/Hotel/Cards'
import HotelSearchFilter from '../utils/Hotel/Table'

const Hotel = () => {
  return <>
  <HotelBookingsHeader/>
  <HotelStats/>
  <HotelSearchFilter/>
  </>
}

export default Hotel

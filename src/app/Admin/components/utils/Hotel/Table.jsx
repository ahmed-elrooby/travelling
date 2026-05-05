import { Admin } from '@/app/Providers/AdminContext/AdminProvider'
import React, { useContext } from 'react'

const Table = () => {
  const {BookingsHotels}=useContext(Admin)
  console.log(BookingsHotels)
  return <>
  
  </>
}

export default Table

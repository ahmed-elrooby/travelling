import React from 'react'
import CarRentalHeader from '../utils/Cars/Header'
import CarRentalStats from '../utils/Cars/Cards'
import CarRentalSearchFilter from '../utils/Cars/Table'


const Cars = () => {
  return <>
  <CarRentalHeader/>
  <CarRentalStats/>
  <CarRentalSearchFilter/>
  </>
}

export default Cars

"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useState } from 'react'
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

export const Clients = createContext()  
const ClientsProviders = ({children}) => {
    const baseURL = process.env.NEXT_PUBLIC_API;
const [loadd,setLoadd]=useState(false)
const getOverview = async () => {
  try {
    const {data} = await axios.get(`${baseURL}/dashboard/b2c/overview`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}
const {data:overview} = useQuery({
  queryKey:["overview"],
  queryFn:getOverview
})

// booking 
const getMyBooking = async () => {
  try {
    const {data} = await axios.get(`${baseURL}/bookings/my`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    throw error
  }
}
const {data:myBooking} = useQuery({
  queryKey:["myBooking"],
  queryFn:getMyBooking
})



//flight
const handleAddFlightBooking = async (values)=>{
  try {
    setLoadd(true)
    const {data}= await axios.post(`${baseURL}/bookings/flights`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
    
  } catch (error) {
    throw error
  }finally{
    setLoadd(false)
}

}
const [openAddFlight,setOpenAddFlight]=useState(false)
const flightQuery=useQueryClient()
const handleAddFlightMutation = useMutation({
  mutationKey:["addFlight"],
  mutationFn:handleAddFlightBooking,
  onSuccess:(data)=>{
  
    toast.success(data.message)
    flightQuery.invalidateQueries(["flightSection"]),
    setOpenAddFlight(false)
  },
  onError:(error)=>{
    toast.error(error?.response?.data?.message)
  }
})
const handleAddFlight=(values)=>{
  handleAddFlightMutation.mutate(values)
}




const handleGetFlights = async () => {
  try {
    const {data} = await axios.get(`${baseURL}/bookings/flights`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    throw error
  }
}
const {data:flightSection} = useQuery({
  queryKey:["flightSection"],
  queryFn:handleGetFlights
})


const postReservationHotels = async (values) => {
  try {
    const {data} = await axios.post(`${baseURL}/bookings/hotels`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`,
        "Content-Type":"application/json"
      }
    })
    return data
  } catch (error) {
    throw error
  }finally{
    setLoadd(false)
  }


}
const [openHotels,setOpenHotels]=useState(false)
const HotelQuery = useQueryClient()
const handleAddHotelMutation =useMutation({
  mutationKey:["addhotels"],
  mutationFn:postReservationHotels,
  onSuccess:(data)=>{
    toast.success(data?.message)
    setOpenHotels(false)
    HotelQuery.invalidateQueries(["Hotel","BookingsHotels"])
  },
  onError:(err)=>{
    toast.error(err?.response?.data?.message)
  }
})
const handleAddHotelFinal = (values)=>{
  handleAddHotelMutation.mutate(values)
}





const GetBookigsHotels = async () => {
  try {
    const {data} = await axios.get(`${baseURL}/bookings/hotels`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    throw error
  }
}

const {data:BookingsHotels} = useQuery({
  queryKey:["BookingsHotels"],
queryFn:GetBookigsHotels 
})




// cars
const handleAddCarsSection = async (values)=>{
  try {
    setLoadd(true)
    const {data}= await axios.post(`${baseURL}/bookings/cars`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }finally{
    setLoadd(false)
  }
}

const [openAddCar,setOpenAddCar]=useState(false)
const carsQueryClient = useQueryClient()
const handleAddCarsMutation = useMutation({
  mutationKey:["addCars"],
  mutationFn:handleAddCarsSection,
  onSuccess:(data)=>{
    toast.success(data?.message)
    carsQueryClient.invalidateQueries(["Cars","flightSection"]),
    setOpenAddCar(false)
  },onError:(err)=>{
    toast.error(err?.response?.data?.message)

  }

})
const handleAddCarFinal = (values)=>{
  handleAddCarsMutation.mutate(values)
}





const getCarsSection = async()=>{
  try {
    const {data}= await axios.get(`${baseURL}/bookings/cars`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    throw error
  }
}
const {data:carsSection}=useQuery({
  queryKey:["carsSection"],
  queryFn:getCarsSection
})

  return (
    <Clients.Provider value={{overview,myBooking,handleAddFlight,openAddFlight,setOpenAddFlight,setLoadd,loadd,
      flightSection,BookingsHotels,handleAddHotelFinal,openHotels,setOpenHotels,carsSection, handleAddCarFinal, setOpenAddCar, openAddCar
    }}>
      {children}
    </Clients.Provider>
  )
}

export default ClientsProviders

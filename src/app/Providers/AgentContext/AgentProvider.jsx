"use client";
import axios from 'axios';
import React, { createContext, useState } from 'react'
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export const Agent = createContext()
const AgentProvider = ({children}) => {
  const baseurl = process.env.NEXT_PUBLIC_API
  const [loadd,setLoadd]=useState(false)
  
  const handleGetOverview =async () => {
    try {
      const {data}= await axios.get(`${baseurl}/dashboard/b2b/overview`,{
        headers:{
          Authorization:`Bearer ${Cookies.get("accessToken")}`
        }
      })
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  const {data:overview} = useQuery({querykey:["overview"],queryFn:handleGetOverview})
// me 
const handleGetMyDashboard = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/me`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
const {data:me}=useQuery({
  queryKey:["me"],
  queryFn:handleGetMyDashboard
})


// booking 
const handleGetBooking = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/bookings/my`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
const {data:booking}=useQuery({
  queryKey:["booking"],
  queryFn:handleGetBooking
})





// post cars
const postCars = async (values) => {
  try {
    const {data} = await axios.post(`${baseurl}/bookings/cars`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`,
        "Content-Type":"application/json"
      }
    })
    return data
  } catch (error) {
    throw error
  }


}
const [openCars,setOpenCars]=useState(false)
const CarsQuery = useQueryClient()
const AddCarsMutation =useMutation({
  mutationKey:["addCars"],
  mutationFn:postCars,
  onSuccess:(data)=>{
    toast.success(data?.message)
    setOpenCars(false)
    CarsQuery.invalidateQueries(["Cars","BookingsCars"])
  },
  onError:(err)=>{
    console.log(err)
    toast.error(err?.response?.data?.message)
  }
})
const AddCarsFinal = (values)=>{
  console.log(values)
  AddCarsMutation.mutate(values)
}




// get car
const getCars = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/bookings/cars`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:Cars} = useQuery({
  queryKey:["Cars"],
  queryFn:getCars
})
//flight
const handleAddFlightBooking = async (values)=>{
  try {
    setLoadd(true)
    const {data}= await axios.post(`${baseurl}/bookings/flights`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    console.log(data)
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
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
})
const handleAddFlight=(values)=>{
  console.log(values)
  handleAddFlightMutation.mutate(values)
}

const handleGetFlights = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/bookings/flights`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
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
    const {data} = await axios.post(`${baseurl}/bookings/hotels`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`,
        "Content-Type":"application/json"
      }
    })
    return data
  } catch (error) {
    throw error
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
    console.log(err)
    toast.error(err?.response?.data?.message)
  }
})
const handleAddHotelFinal = (values)=>{
  console.log(values)
  handleAddHotelMutation.mutate(values)
}

const GetBookigsHotels = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/bookings/hotels`,{
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




const handleAddCarsSection = async (values)=>{
  try {
    setLoadd(true)
    const {data}= await axios.post(`${baseurl}/bookings/cars`,values,{
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
    console.log(err?.response)
  }

})
const handleAddCarFinal = (values)=>{
  console.log(values)
  handleAddCarsMutation.mutate(values)
}



const getCarsSection = async()=>{
  try {
    const {data}= await axios.get(`${baseurl}/bookings/cars`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
const {data:carsSection}=useQuery({
  queryKey:["carsSection"],
  queryFn:getCarsSection
})






  return <Agent.Provider value={{overview,me,booking,handleAddFlight,setOpenAddFlight,openAddFlight,flightSection,handleAddHotelFinal,openHotels,setOpenHotels,BookingsHotels,
    openAddCar, setOpenAddCar, handleAddCarFinal,carsSection}}>
      {children}
    </Agent.Provider>
  
}

export default AgentProvider

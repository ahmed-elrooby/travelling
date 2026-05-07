"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useState } from 'react'
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

export const Clients = createContext()  
const ClientsProviders = ({children}) => {
    const baseURL = process.env.NEXT_PUBLIC_API;
console.log(baseURL)
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
  return (
    <Clients.Provider value={{overview,myBooking,handleAddFlight,openAddFlight,setOpenAddFlight,setLoadd,loadd,
      flightSection,BookingsHotels,handleAddHotelFinal,openHotels,setOpenHotels
    }}>
      {children}
    </Clients.Provider>
  )
}

export default ClientsProviders

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
  return <Agent.Provider value={{overview,me,booking,handleAddFlight,setOpenAddFlight,openAddFlight,flightSection,handleAddHotelFinal,openHotels,setOpenHotels,BookingsHotels}}>
      {children}
    </Agent.Provider>
  
}

export default AgentProvider

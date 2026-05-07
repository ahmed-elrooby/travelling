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
    return data
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
  return <Agent.Provider value={{overview,me,booking, AddCarsFinal,loadd, openCars, setOpenCars, Cars}}>
      {children}
    </Agent.Provider>
  
}

export default AgentProvider

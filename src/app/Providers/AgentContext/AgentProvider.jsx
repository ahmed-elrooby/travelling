"use client";
import axios from 'axios';
import React, { createContext } from 'react'
import Cookies from "js-cookie";
import { useQuery } from '@tanstack/react-query';
export const Agent = createContext()
const AgentProvider = ({children}) => {
  const baseurl = process.env.NEXT_PUBLIC_API
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
  return <Agent.Provider value={{overview,me,booking}}>
      {children}
    </Agent.Provider>
  
}

export default AgentProvider

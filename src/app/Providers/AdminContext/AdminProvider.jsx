"use client";
import axios from 'axios';
import React, { createContext } from 'react'
import Cookies from "js-cookie"
import { useQuery } from '@tanstack/react-query';

export const Admin = createContext()
const AdminProvider = ({children}) => {
    const baseurl = process.env.NEXT_PUBLIC_API

    //cards//
const getCards = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/overview`,{
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
    querykey:["overview"],
    queryFn:getCards
    })






// flights
const getFlights = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/flights`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:flights} = useQuery({
  queryKey:["flights"],
  queryFn:getFlights
})



//Hotel
const getHotel = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/hotels`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}

const {data:Hotel} = useQuery({
  queryKey:["Hotel"],
  queryFn:getHotel
})



//Cars
const getCars = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/cars`,{
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



//Users
const getUsers = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/users`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:Users} = useQuery({
  queryKey:["Users"],
  queryFn:getUsers
})

//B2B
const getB2B = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/b2b`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:B2B} = useQuery({
  queryKey:["B2B"],
  queryFn:getB2B
})

  return (
    <Admin.Provider value={{overview, flights, Hotel, Cars, Users, B2B}} >
      {children}
    </Admin.Provider>
  )
}

export default AdminProvider

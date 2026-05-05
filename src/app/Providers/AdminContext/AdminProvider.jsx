"use client";
import axios from 'axios';
import React, { createContext, useState } from 'react'
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

//B2C
const getB2C = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/dashboard/admin/b2c`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:B2C} = useQuery({
  queryKey:["B2C"],
queryFn:getB2C
})



//reservation
const postReservationHotels = async (values) => {
  try {
    const {data} = await axios.post(`${baseurl}/bookings/hotels`,values,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
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
    HotelQuery.invalidateQueries(["Hotel"])
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


//BookingsHotels
const GetBookigsHotels = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/bookings/hotels`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const {data:BookingsHotels} = useQuery({
  queryKey:["BookingsHotels"],
queryFn:GetBookigsHotels 
})
 


// users
const GetUsers = async () => {
  try {
    const {data} = await axios.get(`${baseurl}/users`,{
      headers:{
        Authorization:`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data?.data
  } catch (error) {
    throw error
  }
}

const {data:User} = useQuery({
  queryKey:["User"],
queryFn:GetUsers
})


//deleteuser
const deleteUser = async (id) => {
  try {
    const {data} = await axios.delete(`${baseurl}/users/${id}`,{
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${Cookies.get("accessToken")}`
      }
    })
    return data
  } catch (error) {
    throw error
  }
}

const deleteUserMutation = useMutation({
  mutationKey:["deleteuser"],
  mutationFn:deleteUser,
  onSuccess:(data)=>{
    toast.success(data?.message || "User Deleted Successfully")
  }, onError:(err)=>{
    toast.error(err?.response?.data?.message || "Something went wrong")
  }
})



const deleteUserFun = (id)=>{
  deleteUserMutation.mutate(id)}




  return (
    <Admin.Provider value={{overview, flights, Hotel, Cars, Users, B2B, B2C,handleAddHotelFinal,openHotels,setOpenHotels,BookingsHotels, User, deleteUserFun}} >
      {children}
    </Admin.Provider>
  )
}

export default AdminProvider

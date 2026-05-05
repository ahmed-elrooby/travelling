"use client";
import axios from 'axios';
import React, { createContext, useState } from 'react'
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const Admin = createContext()
const AdminProvider = ({children}) => {
    const baseurl = process.env.NEXT_PUBLIC_API
    const [loadd,setLoadd]=useState(false)

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


// flight section 
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
    console.log(error?.response)
    toast.error(error.response.data.message)
  }
})
const handleAddFlight=(values)=>{
  console.log(values)
  handleAddFlightMutation.mutate(values)
}
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
  return (
    <Admin.Provider value={{overview, flights,flightSection, Hotel, Cars,
     Users, B2B, B2C,handleAddFlight,loadd,setOpenAddFlight,
     openAddFlight,setOpenAddCar,openAddCar,handleAddCarFinal,carsSection,handleAddHotelFinal,openHotels,setOpenHotels,BookingsHotels, User, deleteUserFun}} >
      {children}
    </Admin.Provider>
  )
}

export default AdminProvider

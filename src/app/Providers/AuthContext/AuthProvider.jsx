"use client";
import { useMutation } from '@tanstack/react-query';
import React, { createContext, useState } from 'react'
import axios from "axios"
export const Auth = createContext()

const AuthProvider = ({children}) => {
const ddd = "ddd"
  return (
    <Auth.Provider value={{ddd}}>
      {children}
    </Auth.Provider>
  )
}

export default AuthProvider

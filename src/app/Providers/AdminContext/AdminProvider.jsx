"use client";
import React, { createContext } from 'react'

export const Admin = createContext()
const AdminProvider = ({children}) => {
    
  return (
    <Admin.Provider >
      {children}
    </Admin.Provider>
  )
}

export default AdminProvider

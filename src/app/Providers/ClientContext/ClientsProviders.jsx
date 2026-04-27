"use client";
import React, { createContext } from 'react'
export const Clients = createContext()  
const ClientsProviders = ({children}) => {
  return (
    <Clients.Provider >
      {children}
    </Clients.Provider>
  )
}

export default ClientsProviders

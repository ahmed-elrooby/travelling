"use client";
import React, { createContext } from 'react'
export const Agent = createContext()
const AgentProvider = ({children}) => {
  const ddd = "ddd"
  return (
    <Agent.Provider value={{ddd}}>
      {children}
    </Agent.Provider>
  )
}

export default AgentProvider

"use client";
import React, { createContext } from 'react'
export const Agent = createContext()
const AgentProvider = ({children}) => {
  return (
    <Agent.Provider >
      {children}
    </Agent.Provider>
  )
}

export default AgentProvider

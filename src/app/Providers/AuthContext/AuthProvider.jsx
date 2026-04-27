import React, { createContext } from 'react'
export const Auth = createContext()

const AuthProvider = ({children}) => {
  return (
    <Auth.Provider >
      {children}
    </Auth.Provider>
  )
}

export default AuthProvider

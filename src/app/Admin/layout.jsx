import React from 'react'

import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import AdminProvider from '../Providers/AdminContext/AdminProvider'



const layout = ({ children }) => {
  return (
    <>
      <section className="flex h-screen transition-all duration-300">
        <AdminProvider>
          {/* <Aside /> */}
<Aside/>
          <section className="flex flex-col flex-1 overflow-hidden">
            <Header />

            <main
              className={`
                flex-1 p-4 overflow-y-auto transition-all duration-300
                          bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
 text-gray-800
                md:p-2
              `}
            >
              <div
                className={`
                  rounded-xl p-2 md:p-6 transition-all duration-300
                `}
              >
                {children}
              </div>
            </main>
          </section>
        </AdminProvider>
      </section>
    </>
  )
}

export default layout
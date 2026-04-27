import React from 'react'

import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'



const layout = ({ children }) => {
  return (
    <>
      <section className="flex h-screen transition-all duration-300">
        {/* <AdminContext> */}
          {/* <Aside /> */}
<Aside/>
          <section className="flex flex-col flex-1 overflow-hidden">
            <Header />

            <main
              className={`
                flex-1 p-4 overflow-y-auto transition-all duration-300
                bg-gradient-to-br from-[#f5f0ea] via-[#f8f4ef] to-[#fcf9f5] text-gray-800
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
        {/* </AdminContext> */}
      </section>
    </>
  )
}

export default layout
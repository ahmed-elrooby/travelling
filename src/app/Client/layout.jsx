import React from 'react'
import ClientsProviders from '../Providers/ClientContext/ClientsProviders'
import Aside from './components/Aside/Aside'

const layout = ({ children }) => {
  return (
    <>
    <ClientsProviders>
    <section className="flex h-screen transition-all duration-300">
        <Aside/>

        <section className="flex flex-col flex-1 overflow-hidden">

          <main
            className="
              flex-1 p-4 overflow-y-auto transition-all duration-300
              bg-[radial-gradient(circle_at_20%_30%,_#0f0c29,_#1a1638,_#0a081c)]
              bg-fixed text-white
              md:p-1
            "
          >
            <div className="p-1 transition-all duration-300 rounded-xl md:p-6">
              {children}
            </div>
          </main>
        </section>
      </section>

    </ClientsProviders>
  
    </>
  )
}

export default layout
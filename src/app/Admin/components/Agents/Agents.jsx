import React from 'react'
import Header from '../utils/Agents/Header'
import Cards from '../utils/Agents/Cards'
import StatsChart from '../utils/Agents/SalesChart'
import AgentsTypeChart from '../utils/Agents/AgentsTypeChart'
import AgentsTable from '../utils/Agents/Table'

const Agents = () => {
  return <>
  <Header/>
  <Cards/>
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    <StatsChart/>
    <AgentsTypeChart/>
  </div>
  <AgentsTable/>
  </>
}

export default Agents

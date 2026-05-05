import React from 'react'
import AgentsHeader from '../Utils/Client/Header'
import CustomersStats from '../Utils/Client/Cards'
import CustomersCharts from '../Utils/Client/Chart'
import Table from '../utils/Client/Table'

const Client = () => {
  return <>
  <AgentsHeader/>
  <CustomersStats/>
    <CustomersCharts/>
    <Table/>
    
  
  </>
}

export default Client

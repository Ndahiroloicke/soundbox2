import React from 'react'
import DashboardNav from '../components/dashboardnav'
import DashboardSearch from '../components/dashboardSearch'
import TopChart from '../components/topchart'
import Nowplaying from '../components/nowplaying'

const Dashboard = () => {
  return (
    <div className='bg-gradient-to-l  to-black from-blue-950 w-full h-screen sm:h-screen lg:h-fit'>
      <div className='flex flex-row'>
        <DashboardNav/>
        <DashboardSearch/>
        <TopChart/>
      </div>
      <Nowplaying/>
    </div>
  )
}

export default Dashboard
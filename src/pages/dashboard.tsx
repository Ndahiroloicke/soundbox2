import { useEffect, useState } from 'react'
import DashboardNav from '../components/dashboardnav'
import DashboardSearch from '../components/dashboardSearch'
import TopChart from '../components/topchart'
// import Nowplaying from '../components/nowplaying'
// import loadingimage from '../assets/output-onlinegiftools.gif'

const Dashboard = () => {
  const [token,settoken] = useState<string|null>(null);
  // const [loading,setloading] = useState<boolean>(true)


  useEffect(()=>{
    const storeToken = window.localStorage.getItem('token');
    settoken(storeToken)
    // setloading(false)
  })
  
  return (
    
    <div className='bg-gradient-to-l to-black from-blue-950 w-screen h-screen sm:h-full lg:w-[98.7vw]'>
      <div className='flex flex-row justify-between gap-x-10'>
        <DashboardNav />
        <DashboardSearch token={token} />
        <TopChart token={token}/>
      </div>
      {/* <Nowplaying /> */}
</div>

  )
}

export default Dashboard;
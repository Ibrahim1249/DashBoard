import { useState } from "react"
import Search from "./Search"
import MainDashboard from "./MainDashboard"



function Dashboard() {
   
  return (
   <>
     <div className="py-8 px-24">
        <h1 className="text-2xl text-center mb-4">Dashboard</h1>
         <Search/>
         <MainDashboard />
     </div>
   </>
  )
}

export default Dashboard
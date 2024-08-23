import { useState } from "react"
import Search from "./Search"
import MainDashboard from "./MainDashboard"



function Dashboard() {
   
  return (
   <>
     <div className="py-8 xl:px-24 px-8">
        <h1 className="text-2xl text-center mb-4">Dashboard</h1>
         <Search/>
         <MainDashboard />
     </div>
   </>
  )
}

export default Dashboard
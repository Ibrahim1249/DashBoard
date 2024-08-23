
import React from 'react'
import Dashboard from './components/Dashboard'
import Context from './context/Context'
import "./App.css"

function App() {
  return (
    <>
    <Context>
     <Dashboard />
     </Context>
    </>
  )
}

export default App
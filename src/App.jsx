
import React from 'react'
import Dashboard from './components/Dashboard'
import Context from './context/context'

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
import React, { useState } from 'react'
import { Input } from './ui/input'

function Search() {
    const [userInput,setUserInput] = useState("")
  return (
    <>
      <Input value={userInput} onChange={(e)=>{setUserInput(e.target.value)}} placeholder="search widget" 
      className="w-3/4 mx-auto border-2 border-black"
      style={{ outline: 'none', boxShadow: 'none' }}/>
    </>
  )
}

export default Search
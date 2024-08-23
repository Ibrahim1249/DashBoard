import React, { useContext } from 'react'
import { Input } from './ui/input'
import { AppContext } from '../context/Context';
function Search() {
  const { userInput , setUserInput} = useContext(AppContext);
  return (
    <>
      <Input value={userInput} onChange={(e)=>{setUserInput(e.target.value)}} placeholder="search widget" 
      className="xl:w-3/4 w-full mx-auto border-2 border-black"
      style={{ outline: 'none', boxShadow: 'none' }}/>
    </>
  )
}

export default Search
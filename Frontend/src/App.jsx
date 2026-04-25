import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import { serverUrl } from './utils/api'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(serverUrl+`/api/users/current`, {
          withCredentials: true,
        })
        dispatch(setUserData(res.data.user))
      } catch (error) {
      
        console.error('Error fetching user:', error)
                dispatch(setUserData(null))
      }
    }
    fetchUser()
  }, [])
  return (
    <div>
    
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
  
    </div>
  )
}

export default App

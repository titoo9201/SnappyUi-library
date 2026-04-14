import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
export const serverUrl ="http://localhost:3000"
function App() {
  return (
    <div>
    
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
  
    </div>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import FormComponent from './Components/FormComponent'
import ViewDataComponent from './Components/ViewDataComponent'

const Navigation = () => {
  const navigate = useNavigate()
  return (
    <nav className='w-[50%] mx-auto flex justify-between'>
      <div className='p-2 border-r hover:bg-blue-600 hover:text-white' onClick={() => navigate('/')}>Home</div>
      <div className='p-2 hover:bg-blue-600 hover:text-white' onClick={() => navigate('/view')}>View Stored Information</div>
    </nav>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />  {/* Navigation now works because it's inside BrowserRouter */}
      <Routes>
        <Route path='/' element={<FormComponent />} />
        <Route path='/view' element={<ViewDataComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

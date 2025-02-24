import React from 'react'
import FormComponent from './Components/FormComponent'
import ViewDataComponent from './Components/ViewDataComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <nav className='w-[50%] mx-auto flex justify-between'>
        <a href='/' className=' p-2 border-r-[50%]   hover:bg-blue-600 hover:text-white'>Home</a>
        <a href='/view' className=' p-2     hover:bg-blue-600 hover:text-white'>View Stored Information</a>
      </nav>
      <Routes>
      <Route path='/' element={<FormComponent />}> </Route>
      <Route path='/view' element={<ViewDataComponent />}> </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
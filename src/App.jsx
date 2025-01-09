import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import Nav from './components/Nav'
import Create from './components/Create'
import EditProduct from './components/EditProduct'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='h-screen w-screen flex'>

      <ToastContainer />
      <Nav />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/edit/:id' element={<EditProduct />} />
      </Routes>


    </div>
  )
}

export default App

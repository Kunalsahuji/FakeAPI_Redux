import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import Nav from './components/Nav'
import Create from './components/Create'
import EditProduct from './components/EditProduct'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { asyncsetdata } from './store/actions/productAction'

const App = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.products)
  console.log('dataAtAppProducts', data)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(asyncsetdata())
    }
  }, [])
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

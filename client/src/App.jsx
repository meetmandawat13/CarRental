import React, { useState } from "react"
import Navbar from "./components/navbar";
import {useLocation , Routes , Route} from 'react-router-dom'
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";

const App=()=>{

  const {showLogin}= useAppContext()
  const isOwnerPath= useLocation().pathname.startsWith('/owner')

  return(
    <>
    <Toaster />
      {showLogin && <Login/>}
      
      {!isOwnerPath && <Navbar/>}

      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/car-details/:id' element={<CarDetails/>}/>
          <Route path='/cars' element={<Cars/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path= "add-car" index element={<AddCar/>} />
            <Route path= "manage-cars" index element={<ManageCars/>} />
            <Route path= "manage-bookings" index element={<ManageBookings/>} />
          </Route>


      </Routes>

      {!isOwnerPath && <Footer/>}

    </>
  )
}

export default App;
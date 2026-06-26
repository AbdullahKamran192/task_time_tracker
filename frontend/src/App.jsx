import React from "react"
import { useState, useEffect } from "react"
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RouteLayout from "./layout/RouteLayout";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import ContactLayout from "./layout/ContactLayout";
import ContactInfo from "./components/Contactinfo";
import ContactForm from "./components/ContactForm";
import Login from "./pages/Login";
import Timetable from "./pages/Timetable";
import EditTaskForm from "./components/EditTaskForm";
import Calendar from "./pages/Calendar";

function App() {

  // useEffect(() => {
  //     window.location.href = "http://localhost:8080/auth/google";
  // }, []);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RouteLayout />}>
        <Route index element={<Home />}></Route>

        <Route path="contact" element={<ContactLayout />}>
          <Route path="info" element={<ContactInfo />} />
          <Route path="form" element={<ContactForm />} />
        </Route>

        <Route path="calendar" element={<Calendar/>}></Route>


        <Route path="login" element={<Login/>}></Route>
        

        <Route path="timetable" element={<Timetable/>}></Route>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App

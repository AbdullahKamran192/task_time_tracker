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
import Settings from "./pages/Settings";
import CreateTask from "./pages/CreateTask";

function App() {


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

        <Route path="settings" element={<Settings />}></Route>

        <Route path="createtask" element={<CreateTask />}/>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App

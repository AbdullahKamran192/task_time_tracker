import React from "react"
import { useState, useEffect } from "react"
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RouteLayout from "./layout/RouteLayout";
import Navbar from "./components/navbar"
import Home from "./pages/Home";
import ContactLayout from "./layout/ContactLayout";
import ContactInfo from "./components/Contactinfo";
import ContactForm from "./components/ContactForm";

function App() {
  const [myData, setMyData] = useState('');

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/testroute");
    const data = await response.json();
    setMyData(data.myData);
  }

  useEffect(() => {
    fetchData();
  }, [])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RouteLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="contact" element={<ContactLayout />}>
          <Route path="info" element={<ContactInfo />} />
          <Route path="form" element={<ContactForm />} />
        </Route>
      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App

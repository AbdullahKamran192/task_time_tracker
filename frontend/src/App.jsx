import React from "react"
import { useState, useEffect } from "react"
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RouteLayout from "./layout/RouteLayout";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Timetable from "./pages/Timetable";
import EditTaskForm from "./components/EditTaskForm";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {

  const [userData, setUserData] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  async function checkLoggedIn() {

    try{
      const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/`,
          { credentials: "include" }
      );

      if (!response.ok) {
        setUserData(null)
        return;
      }
      
      const data = await response.json();
      setUserData(data)
    } finally {
      setLoadingUser(false);
    }



  }

    useEffect(() => {
      checkLoggedIn();
    }, [])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RouteLayout userData={userData} loadingUser={loadingUser}/>}>
        <Route index element={<Home />}></Route>

        <Route path="calendar" element={<Calendar/>}></Route>


        <Route path="login" element={<Login/>}></Route>
        

        <Route path="timetable" element={<Timetable/>}></Route>

        <Route path="settings" element={<Settings/>}></Route>

      </Route>
    )
  )


  return (
    <RouterProvider router={router}/>
  )
}

export default App

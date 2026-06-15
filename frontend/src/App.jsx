import React from "react"
import { useState, useEffect } from "react"
import {Routes, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouteLayout from "../layout/RouteLayout";

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
      <Route path='/' element={RouteLayout}>
        <Route index element={<Home />}></Route>
      </Route>
    )
  )


  return (
    <div>
      <h3>{myData}</h3>
    </div>
  )
}

export default App

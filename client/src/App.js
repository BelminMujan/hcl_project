import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Landing from "./Screens/Landing/Landing";
import Api from "./Helpers/Api";

const App = () => {
  
  const routes  = createBrowserRouter([
    {
      path: "",
      element: <Landing />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "dashboard",
      element: <div>Dashboard</div>
    },
  ])
  return <RouterProvider  router={routes} />
}

export default App

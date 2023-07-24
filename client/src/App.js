import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Landing from "./Screens/Landing/Landing";
import Api from "./Helpers/Api";
import Jobs from "./Screens/Jobs/Jobs";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { sidebar_urls } from "./Helpers/constants";

const App = () => {

  const routes = createBrowserRouter([
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
      path: "jobs",
      element: <Jobs />
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [...sidebar_urls]
    }
  ])
  return <RouterProvider router={routes} />
}

export default App

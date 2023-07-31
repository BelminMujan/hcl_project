import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import Landing from "./Screens/Landing/Landing";
import Api from "./Helpers/Api";
import Jobs from "./Screens/Jobs/Jobs";
import Dashboard from "./Screens/Dashboard/Dashboard";
import { sidebar_urls } from "./Helpers/constants";
import { useSelector } from "react-redux";

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

  let token = localStorage.getItem("token")
  let api = new Api()
  let user = useSelector(state => state.user)
  useEffect(() => {

    if (token) {
      console.log(user);
      if (!user || !Object.keys(user).length) {
        api.auto_login().then((res) => {
          console.log(res);
        }).catch(e => {
          localStorage.removeItem("token")
        })
      }
    }
  }, [])
  return <RouterProvider router={routes} />
}

export default App

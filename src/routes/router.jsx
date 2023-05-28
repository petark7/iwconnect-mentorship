import Admin from '../pages/Admin'
import Login from '../pages/Login'
import User from '../pages/User'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/user",
    element: <User/>,
  },
]);

const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router;
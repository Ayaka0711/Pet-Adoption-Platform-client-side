import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/PrivateRoute";

import Home from "../pages/Home";
import AllPets from "../pages/AllPets";
import PetDetails from "../pages/PetDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";

import AddPet from "../pages/dashboard/AddPet";
import MyListings from "../pages/dashboard/MyListings";
import UpdatePet from "../pages/dashboard/UpdatePet";
import MyRequests from "../pages/dashboard/MyRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "all-pets", element: <AllPets /> },
          {
            path: "pets/:id",
            element: (
              <PrivateRoute>
                <PetDetails />
              </PrivateRoute>
            ),
          },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="my-listings" replace /> },
          { path: "add-pet", element: <AddPet /> },
          { path: "my-listings", element: <MyListings /> },
          { path: "update-pet/:id", element: <UpdatePet /> },
          { path: "my-requests", element: <MyRequests /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

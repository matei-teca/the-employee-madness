import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";

import EquipmentList from "./Pages/EquipmentList";
import EmployeeByFullName from "./Pages/EmployeeByFullName";
import EmployeeByName from "./Pages/EmployeesByName";
import MissingEmployees from "./Pages/MissingEmployees";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/employee/:fullName",
        element: <EmployeeByFullName />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeByName />,
      },
      {
        path: "/missing",
        element: <MissingEmployees />,
      },
      {
        path: "/employees/:sortBy/:sortDirection",
        element: <EmployeeList sortDirection={true}/>,
      },
    ],
  },
  {
    path: "/test",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/test/test",
        element: <EmployeeList />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

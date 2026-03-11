// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Signup } from "./pages/Signup";
import { RegisterUser } from "./pages/RegisterUser/RegisterUser";
import { Admission } from "./pages/Admission/Admission";
import { Login } from "./pages/Login/Login";
import { ActivateAccount } from "./pages/ActivateAccount/ActivateAccount";
import { IncomeForm } from "./pages/IncomeForm/IncomeForm";
import { DashboardTriaje } from "./pages/DashboardTriaje/DashboardTriaje";
import { Consultation } from "./pages/Consultation/Consultation";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/activate" element={<ActivateAccount />} />
      <Route path="/triage" element={<DashboardTriaje />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/income/:dni/:id" element={<IncomeForm />} />
      <Route path="/consultation/:id" element={<Consultation />} />
    </Route>
  )
);
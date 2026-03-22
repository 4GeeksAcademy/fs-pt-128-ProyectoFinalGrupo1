// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
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
import { DashboardConsulta } from "./pages/DashboardConsulta/DashboardConsulta";
import { MedicalTest } from "./pages/MedicalTest/MedicalTest";
import { DashboardTest } from "./pages/DashboardTest/DashboardTest";
import { TestView } from "./pages/TestsView/TestView";
import { PatientsHistoryDetail } from "./pages/History/PatientHistoryDetail";
import { PatientsHistory } from "./pages/History/PatientHistory";
import { ControlPanelTriage } from "./pages/ControlPanelTriage/ControlPanelTriage";
import { ControlPanelConsult } from "./pages/ControlPanelConsult/ControlPanelConsult";
import { TestResult } from '../front/pages/TestResult.jsx';

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
      <Route path="/activate" element={<ActivateAccount />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/triage" element={<DashboardTriaje />} />
      <Route path="/triage/:type/:value" element={<DashboardTriaje />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/income/:id" element={<IncomeForm />} />
      <Route path="/control-panel/consultation" element={<ControlPanelConsult />} />
      <Route path="/consultation" element={<DashboardConsulta />} />
      <Route path="/consultation/:type/:value" element={<DashboardConsulta />} />
      <Route path="/consultation/:id" element={<Consultation />} />
      <Route path="/medical-test" element={<MedicalTest />} />
      <Route path="/tests" element={<DashboardTest />} />
      <Route path="/tests/:type/:value" element={<DashboardTest />} />
      <Route path="/test-form/:income_id/:id" element={<TestView />} />
      <Route path="/test-result/:id_income" element={<TestResult />} />
      <Route path="/patientsHistory" element={<PatientsHistory />} />
      <Route path="/patientsHistory/:id" element={<PatientsHistoryDetail />} />
      <Route path="/control-panel/triage" element={<ControlPanelTriage />} />
    </Route>
  )
);
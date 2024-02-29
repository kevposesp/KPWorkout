import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import { ToastrContext } from "@/context/ToastrContext";
import { UserContext } from "@/context/UserContext";
import { CategoryContext } from '@/context/CategoryContext';

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import Toastr from "@/components/toastr/Toastr";
import Loading from "@/components/Loading/Loading";

import { NoAuthGuard, AuthGuard } from "@/services/guards/AuthGuard";
import AdminGuard from "@/services/guards/AdminGuard";

function App() {

  const Login = React.lazy(() => import("@/pages/auth/Login"));
  const Register = React.lazy(() => import("@/pages/auth/Register"));

  // Admin
  const Dashboard = React.lazy(() => import("@/pages/admin/Dashboard"));

  // Client
  const Home = React.lazy(() => import("@/pages/client/Home"));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <UserContext>
              <CategoryContext>
                <Routes>
                  <Route path="/admin/*" element={<Sidebar />} />
                  <Route path="/*" element={<Header />} />
                </Routes>

                {/* <div className="container mx-auto my-3"> */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />

                  {/* you must be logged in */}
                  <Route element={<AuthGuard />}>

                  </Route>

                  {/* you must not be logged in */}
                  <Route path="/auth" element={<NoAuthGuard />}>
                    <Route path="login" element={<Login />}></Route>
                    <Route
                      path="register"
                      element={<Register />}
                    ></Route>
                  </Route>

                  {/* you must be admin */}
                  <Route element={<AdminGuard />}>
                    <Route path="/admin">
                      <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                  </Route>

                </Routes>
                {/* </div> */}
                <Toastr></Toastr>
              </CategoryContext>
            </UserContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App

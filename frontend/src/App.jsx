import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import { ToastrContext } from "@/context/ToastrContext";
import { UserContext } from "@/context/UserContext";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import Toastr from "@/components/toastr/Toastr";
import Loading from "@/components/Loading/Loading";

import { NoAuthGuard, AuthGuard } from "@/services/guards/AuthGuard";

function App() {

  const Login = React.lazy(() => import("@/pages/auth/Login"));
  const Register = React.lazy(() => import("@/pages/auth/Register"));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <UserContext>
              <Routes>
                <Route path="/admin/*" element={<Sidebar />} />
                <Route path="/*" element={<Header />} />
              </Routes>

              <div className="container mx-auto my-3">
                <Routes>
                  {/* you must not be logged in */}
                  <Route path="/auth" element={<NoAuthGuard />}>
                    <Route path="login" element={<Login />}></Route>
                    <Route
                      path="register"
                      element={<Register />}
                    ></Route>
                  </Route>
                </Routes>
              </div>
              <Toastr></Toastr>
            </UserContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App

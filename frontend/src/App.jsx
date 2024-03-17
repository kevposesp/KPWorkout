import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'

import { ToastrContext } from "@/context/ToastrContext";
import { UserContext } from "@/context/UserContext";
import { CategoryContext } from '@/context/CategoryContext';
import { ChartContext } from '@/context/ChartContext';
import { OrderContext } from '@/context/OrderContext';
import { FilterContext } from '@/context/FilterContext';

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

import Toastr from "@/components/toastr/Toastr";
import Loading from "@/components/Loading/Loading";

import { NoAuthGuard, AuthGuard } from "@/services/guards/AuthGuard";
import AdminGuard from "@/services/guards/AdminGuard";

function App() {

  const Login = React.lazy(() => import("@/pages/auth/Login"));
  const Register = React.lazy(() => import("@/pages/auth/Register"));

  // Admin
  const Dashboard = React.lazy(() => import("@/pages/admin/Dashboard"));
  const Categories = React.lazy(() => import("@/pages/admin/Categories/Categories"));
  const Products = React.lazy(() => import("@/pages/admin/Products/Products"));
  const Orders = React.lazy(() => import("@/pages/admin/Orders/Orders"));
  const Filters = React.lazy(() => import("@/pages/admin/Filters/Filters"));

  // Client
  const Home = React.lazy(() => import("@/pages/client/Home"));
  const Shop = React.lazy(() => import("@/pages/client/Shop"));
  const ContactUs = React.lazy(() => import("@/pages/client/contact/ContactUs"));
  const Profile = React.lazy(() => import("@/pages/client/profile/Profile"));
  const Order = React.lazy(() => import("@/pages/client/profile/orders/Order"));
  const CheckOut = React.lazy(() => import("@/pages/client/profile/checkout/CheckOut"));
  const PaymentPage = React.lazy(() => import("@/pages/client/payment/PaymentPage"));
  const Product = React.lazy(() => import("@/pages/client/product/Product"));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <UserContext>
              <CategoryContext>
                <ChartContext>
                  <OrderContext>
                    <FilterContext>
                      <Routes>
                        <Route path="/admin/*" element={<Sidebar />} />
                        <Route path="/*" element={<Header />} />
                      </Routes>

                      {/* <div className="container mx-auto my-3"> */}
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path='/shop'>
                          <Route path='' element={<Shop />} />
                          <Route path='product'>
                            <Route path=':id' element={<Product />} />
                          </Route>
                          <Route path=':filters' element={<Shop />} />
                        </Route>

                        {/* you must be logged in */}
                        <Route element={<AuthGuard />}>
                          <Route path="/contactus" element={<ContactUs />} />
                          <Route path="/profile">
                            <Route path="" element={<Profile />} />
                            <Route path="order">
                              <Route path=":id" element={<Order />} />
                            </Route>
                            <Route path="checkout">
                              <Route path="" element={<CheckOut />} />
                              <Route path="payment">
                                <Route path="" element={<PaymentPage />}></Route>
                              </Route>
                            </Route>
                          </Route>
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
                            <Route path="categories/*" element={<Categories />} />
                            <Route path="products/*" element={<Products />} />
                            <Route path="orders/*" element={<Orders />} />
                            <Route path="filters/*" element={<Filters />} />
                          </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                      {/* </div> */}
                      <Toastr></Toastr>
                      <Footer />
                    </FilterContext>
                  </OrderContext>
                </ChartContext>
              </CategoryContext>
            </UserContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App

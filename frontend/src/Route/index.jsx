import React, { Fragment } from 'react';
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";


import Signin from "../Auth/Signin";
import ForgotPassword from "../Auth/forgotPassword";

import AppLayout from '../Layout/Layout';
import UsersProfileContain from '../Components/UsersProfile';
import Dashboard from '../Components/Dashboard';
import Users from '../Components/Members/View';
import AddUser from '../Components/Members/Add';
import UserDetail from '../Components/Members/Detail';


import EditProfile from '../Components/UsersProfile/EditProfile/index.jsx';
import ChangePassword from '../Components/changePassword/index.jsx'
import PageNotFound from '../Auth/PageNotFound/index.jsx';
import ViewStock from '../Components/stock/ViewStock.js';
import AddStock from '../Components/stock/Add/AddStock.js';
import EditStock from '../Components/stock/EditStock';
import StockDetail from '../Components/stock/StockDetail';
import ResetPassword from '../Auth/resetPassword/index.jsx';


const Routers = () => {

  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<PageNotFound/>} />
          <Route path={'/'} element={<Signin/>} />
          <Route path={'/forgot_password'} element={<ForgotPassword/>} />
          <Route path={'/reset_password/:token'} element={<ResetPassword/>} />
          <Fragment >
            <Route element={<AppLayout />} >
              <Route path={'/dashboard'} element={<Dashboard/>} />
              <Route path={'/stock'} element={<ViewStock/>} />
              <Route path={'/stock/add'} element={<AddStock/>} />
              <Route path={'/stock/edit/'} element={<EditStock/>} />
              <Route path={'/stock/detail/:id'} element={<StockDetail/>} />
              <Route path={'/users'} element={<Users/>} />
              <Route path={'/users/add'} element={<AddUser/>} />
              <Route path={'/user/:id'} element={<UserDetail/>} />
              <Route path={'/profile'} element={<UsersProfileContain/>} />
              <Route path={'/edit_profile'} element={<EditProfile/>} />
              <Route path={'/change_password'} element={<ChangePassword/>} />
            </Route>
          </Fragment>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;

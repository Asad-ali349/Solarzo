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


import EditProfile from '../Components/UsersProfile/EditProfile/index.jsx';
import ChangePassword from '../Components/changePassword/index.jsx'
import PageNotFound from '../Auth/PageNotFound/index.jsx';

// setup fake backend

const Routers = () => {

  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<PageNotFound/>} />
          <Route path={'/'} element={<Signin/>} />
          <Route path={'/forgot_password'} element={<ForgotPassword/>} />
          <Fragment >
            <Route element={<AppLayout />} >
              <Route path={'/dashboard'} element={<Dashboard/>} />
              <Route path={'/users'} element={<Users/>} />
              <Route path={'/users/add'} element={<AddUser/>} />
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

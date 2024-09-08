import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Layout from '../Components/Common/Layout';
import Dashboard from '../Pages/Dashboard';
import User from '../Pages/User';
import AddUser from '../Pages/AddUser';
import { Provider } from "react-redux";
import store from "../store";

const AdminRoutes = () => (
  <Provider store={store}>
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='user' element = {<User />} />
        <Route path='add-user' element = {<AddUser />} />
      </Route>
    </Routes>
  </Provider>
);

export default AdminRoutes;
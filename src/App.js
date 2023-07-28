import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Window from './window';
import JoinClass from "./outlets/joinClass";
import Profile from "./outlets/profile";
import Signin from './auth/signin';
import Register from './auth/register';
import MyClass from './outlets/myClass';
import OthersClass from './outlets/othersClass';
import Dashboard from './outlets/dashboard';
import CreateClass from './outlets/createClass';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="signin" element={<Signin />} />
                    <Route path="register" element={<Register />} />

                    <Route path="/users" element={<Window />} >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="myClass" element={<MyClass />} />
                        <Route path="othersClass" element={<OthersClass />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="createClass" element={<CreateClass />} />
                        <Route path="joinclass" element={<JoinClass />} />
                    </Route>
                    <Route path="/*" element={<Navigate to="signin" />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}


export default App;

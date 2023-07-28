import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Window from './window';
import Addclass from "./outlets/addClass";
import Home from "./outlets/home";
import JoinClass from "./outlets/joinClass";
import Profile from "./outlets/profile";
import Signin from './signin';
import Register from './register';
import { MainContext } from "./context/MainContext";
import MyClass from './outlets/myClass';
import OthersClass from './outlets/othersClass';

const App = () => {
    // let [id, SetId] = useState([]);
    // let [class_id, set_Class_id] = useState("");
    return (
        <>
            <BrowserRouter>
                {/* <MainContext.Provider value={{ id, SetId, class_id, set_Class_id }}> */}
                    <Routes>
                        <Route path="signin" element={<Signin />} />
                        <Route path="register" element={<Register />} />
                        <Route path="/users" element={<Window />} >
                            <Route path="dashboard" element={<Home />} />
                            <Route path="myClass" element={<MyClass />} />
                            <Route path="othersClass" element={<OthersClass />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="addclass" element={<Addclass />} />
                            <Route path="joinclass" element={<JoinClass />} />
                        </Route>
                        <Route path="/*" element={<Signin />} />
                    </Routes>
                {/* </MainContext.Provider> */}
            </BrowserRouter>

        </>
    )
}


export default App;

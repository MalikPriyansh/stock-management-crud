import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminView from "./screens/adminView";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./screens/login";
import Signup from "./screens/signup";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import ProtectedRoute from "./screens/protectedRoute";
import StaffView from "./screens/staffView";

function App(){
    return (
        <BrowserRouter>
        <UserAuthContextProvider>
            <Routes>
                <Route path="/" element={<Login></Login>} />
                <Route path="/signup" element={<Signup></Signup>} />
                <Route path="/admin" element={<ProtectedRoute>
                    <AdminView />
                </ProtectedRoute>} /> 
                <Route path="/staff" element={<ProtectedRoute>
                    <StaffView></StaffView>
                </ProtectedRoute>} />
            </Routes>
        </UserAuthContextProvider>
        </BrowserRouter>
    )
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TransactionsList from "./pages/TransactionsList";
import TransactionForm from "./pages/TransactionForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./pages/Logout";
import Report from "./pages/Report";
import EditForm from "../src/pages/Editform";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>} />  
          <Route path="/contact" element={<Contact/>} />
          <Route path="/About" element={<About/>} />
          {/* Authentication Routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout/>} />
                    <Route path="transactions" element={<TransactionsList />} />
                    <Route path="transactions/add" element={<TransactionForm />} />
                    <Route path="transactions/edit/:id" element={<EditForm/>} />
                    <Route path="reports" element={<Report/>} />




                    {/* Fallback for invalid routes */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback for unknown paths */}
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

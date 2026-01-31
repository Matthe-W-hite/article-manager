import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useEffect } from "react";
//import api from "./api/axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import Article from "./pages/Article";
import CreateArticle from "./pages/CreateArticle"
import EditArticle from "./pages/EditArticle";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import AdminCategories from "./pages/AdminCategories";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "./context/UserContext";
//import User from "../../backend/src/models/User";


function App() {
  // Ustaw token w axios przy starcie aplikacji
 /* useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []); */

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
            <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/article/:id" element={<Article />} />
          <Route path="/create-article" element={ <ProtectedRoute> <CreateArticle /> </ProtectedRoute> } />
          <Route path="/edit-article/:id" element={ <ProtectedRoute> <EditArticle /> </ProtectedRoute> } />
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/admin/categories" element={ <AdminRoute> <AdminCategories /> </AdminRoute> } />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

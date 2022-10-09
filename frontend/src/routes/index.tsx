import { Route, Routes, Navigate } from "react-router-dom";

// Pages
import SignIn from '../pages/Signin';
import Dasboard from '../pages/Dasboard';
import Categories from "../pages/Categories";
import AddCategory from "../pages/Add-Category/index";
import UpdateCategory  from "../pages/Update-Category/index";


// @ts-ignore
const Private = ({ children, redirectTo }) => {
  const isAuthenticated = localStorage.getItem("@auth: token") !== null;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/admin/dashboard" element={<Private redirectTo="/login"><Dasboard /></Private>} />
      <Route path="/admin/categorias" element={<Private redirectTo="/login"><Categories /></Private>} />
      <Route path="/admin/adicionar-categoria" element={<Private redirectTo="/login"><AddCategory /></Private>} />
      <Route path="/admin/atualizar-categoria/:id" element={<Private redirectTo="/login"><UpdateCategory /></Private>} />
    </Routes>
  )
}

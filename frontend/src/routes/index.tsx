import { Route, Routes, Navigate } from "react-router-dom";

// Pages
import SignIn from '../pages/Signin';
import Dasboard from '../pages/Dasboard';
import Categories from "../pages/Categories";
import AddCategory from "../pages/Add-Category/index";
import UpdateCategory  from "../pages/Update-Category/index";
import NotFound from "../pages/NotFound";
import AddUser from "../pages/Add-User";
import Products from "../pages/Products";
import AddProduct from "../pages/Add-Product";


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
      <Route path="/admin/adicionar-usuario" element={<Private redirectTo="/login"><AddUser /></Private>} />
      <Route path="/admin/produtos" element={<Private redirectTo="/login"><Products /></Private>} />
      <Route path="/admin/adicionar-produto" element={<Private redirectTo="/login"><AddProduct /></Private>} />
      
      <Route path="/404" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/404" />} />
    </Routes>
  )
}

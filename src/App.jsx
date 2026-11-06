import React from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Inicio from "./Pages/Inicio";
import Catalogo from "./Pages/Catalogo";
import ProductoDetalle from "./Pages/ProductoDetalle";
import Clientes from "./Pages/Clientes";
import Pedidos from "./Pages/Pedidos";
import MisPedidos from "./Pages/MisPedidos";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import Carrito from "./Pages/Carrito";
import Contacto from "./Pages/Contacto";
import AdminProductos from "./Pages/AdminProductos";

function RutaUsuario({
  children,
}) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function RutaAdmin({
  children,
}) {
  const { user } = useAuth();

  if (
    !user ||
    user.role !== "admin"
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Rutas públicas */}

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/producto/:id"
          element={
            <ProductoDetalle />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        {/* Cliente */}

        <Route
          path="/carrito"
          element={
            <RutaUsuario>
              <Carrito />
            </RutaUsuario>
          }
        />

        <Route
          path="/mis-pedidos"
          element={
            <RutaUsuario>
              <MisPedidos />
            </RutaUsuario>
          }
        />

        {/* Administrador */}

        <Route
          path="/clientes"
          element={
            <RutaAdmin>
              <Clientes />
            </RutaAdmin>
          }
        />

        <Route
          path="/pedidos"
          element={
            <RutaAdmin>
              <Pedidos />
            </RutaAdmin>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <RutaAdmin>
              <AdminProductos />
            </RutaAdmin>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={
            <div
              style={{
                textAlign:
                  "center",
                padding: "4rem",
              }}
            >
              <h1>
                404 - Página no
                encontrada
              </h1>
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
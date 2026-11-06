import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  ProductosProvider,
} from "./context/ProductosContext";

import {
  CarritoProvider,
} from "./context/CarritoContext";

import {
  CategoriasProvider,
} from "./context/CategoriasContext";

import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <CategoriasProvider>
            <ProductosProvider>
              <App />
            </ProductosProvider>
          </CategoriasProvider>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
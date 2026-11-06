import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CategoriasContext =
  createContext();

const API_URL =
  "http://localhost:3000/api/categorias";

export function CategoriasProvider({
  children,
}) {
  const [
    categorias,
    setCategorias,
  ] = useState([]);

  const [
    cargandoCategorias,
    setCargandoCategorias,
  ] = useState(true);

  useEffect(() => {
    const cargarCategorias =
      async () => {
        try {
          const respuesta =
            await fetch(API_URL);

          if (!respuesta.ok) {
            throw new Error(
              "No se pudieron obtener las categorías"
            );
          }

          const datos =
            await respuesta.json();

          setCategorias(datos);
        } catch (error) {
          console.error(
            "Error al cargar categorías:",
            error
          );

          setCategorias([]);
        } finally {
          setCargandoCategorias(
            false
          );
        }
      };

    cargarCategorias();
  }, []);

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        cargandoCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

export const useCategorias = () =>
  useContext(CategoriasContext);
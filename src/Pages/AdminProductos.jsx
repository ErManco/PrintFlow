import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useProductos,
} from "../context/ProductosContext";

import {
  useCategorias,
} from "../context/CategoriasContext";

const COLORES_DISPONIBLES = [
  {
    nombre: "Blanco",
    hex: "#ffffff",
  },
  {
    nombre: "Negro",
    hex: "#1f2937",
  },
  {
    nombre: "Gris claro",
    hex: "#e5e7eb",
  },
  {
    nombre: "Rojo",
    hex: "#ef4444",
  },
  {
    nombre: "Azul",
    hex: "#3b82f6",
  },
];

function AdminProductos() {
  const {
    agregarProducto,
  } = useProductos();

  const {
    categorias,
    cargandoCategorias,
  } = useCategorias();

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "299",
  });

  const [
    coloresData,
    setColoresData,
  ] = useState({});

  const [
    imagenGeneral,
    setImagenGeneral,
  ] = useState(null);

  const [
    guardando,
    setGuardando,
  ] = useState(false);

  /*
    Cuando llegan las categorías
    de MySQL seleccionamos
    automáticamente la primera.
  */
  useEffect(() => {
    if (
      categorias.length > 0 &&
      !formData.categoria
    ) {
      setFormData((prev) => ({
        ...prev,
        categoria:
          categorias[0].nombre,
      }));
    }
  }, [
    categorias,
    formData.categoria,
  ]);

  const handleColorToggle = (
    hex
  ) => {
    setColoresData((prev) => {
      const nuevosColores = {
        ...prev,
      };

      if (
        Object.prototype
          .hasOwnProperty.call(
            nuevosColores,
            hex
          )
      ) {
        delete nuevosColores[hex];
      } else {
        nuevosColores[hex] =
          null;
      }

      return nuevosColores;
    });
  };

  const handleColorImage = (
    hex,
    file
  ) => {
    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setColoresData(
        (prev) => ({
          ...prev,
          [hex]:
            reader.result,
        })
      );
    };

    reader.readAsDataURL(file);
  };

  const handleGeneralImage = (
    file
  ) => {
    if (!file) {
      setImagenGeneral(null);

      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setImagenGeneral(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!formData.categoria) {
      alert(
        "Debes seleccionar una categoría."
      );

      return;
    }

    const coloresKeys =
      Object.keys(
        coloresData
      );

    if (
      coloresKeys.length === 0 &&
      !imagenGeneral
    ) {
      alert(
        "Debes subir una imagen general o seleccionar al menos un color con su imagen."
      );

      return;
    }

    if (
      coloresKeys.some(
        (hex) =>
          !coloresData[hex]
      )
    ) {
      alert(
        "Asegúrate de subir una imagen para cada color seleccionado."
      );

      return;
    }

    const productoFinal = {
      ...formData,

      imagen:
        imagenGeneral ||
        coloresData[
          coloresKeys[0]
        ],

      colores:
        coloresData,
    };

    try {
      setGuardando(true);

      await agregarProducto(
        productoFinal
      );

      alert(
        "¡Playera agregada al catálogo!"
      );

      navigate(
        "/catalogo"
      );
    } catch (error) {
      console.error(
        "Error al guardar producto:",
        error
      );

      alert(
        `No se pudo guardar la playera: ${error.message}`
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "0 1rem",
      }}
    >
      <div className="catalog-header">
        <span className="badge-collection">
          ADMIN
        </span>

        <h1>
          Agregar Nueva Plantilla
        </h1>

        <p>
          Registra una nueva playera
          para mostrarla en el
          catálogo.
        </p>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="admin-form"
      >
        {/* NOMBRE */}

        <div className="campo">
          <label>
            Nombre del diseño
          </label>

          <input
            type="text"
            value={
              formData.titulo
            }
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                titulo:
                  e.target.value,
              })
            }
          />
        </div>

        {/* DESCRIPCIÓN */}

        <div className="campo">
          <label>
            Descripción
          </label>

          <textarea
            rows="4"
            value={
              formData.descripcion
            }
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                descripcion:
                  e.target.value,
              })
            }
          />
        </div>

        {/* PRECIO */}

        <div className="campo">
          <label>
            Precio (MXN)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={
              formData.precio
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                precio:
                  e.target.value,
              })
            }
          />
        </div>

        {/* CATEGORÍA */}

        <div className="campo">
          <label>
            Categoría
          </label>

          {cargandoCategorias ? (
            <p>
              Cargando categorías...
            </p>
          ) : categorias.length ===
            0 ? (
            <p className="error-msg">
              No hay categorías
              registradas.
            </p>
          ) : (
            <select
              value={
                formData.categoria
              }
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoria:
                    e.target.value,
                })
              }
            >
              {categorias.map(
                (categoria) => (
                  <option
                    key={
                      categoria.id_categoria
                    }
                    value={
                      categoria.nombre
                    }
                  >
                    {
                      categoria.nombre
                    }
                  </option>
                )
              )}
            </select>
          )}
        </div>

        <hr className="divider" />

        {/* COLORES */}

        <div className="campo">
          <label>
            Selecciona los colores y
            sube su imagen:
          </label>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {COLORES_DISPONIBLES.map(
              (color) => {
                const seleccionado =
                  Object.prototype
                    .hasOwnProperty.call(
                      coloresData,
                      color.hex
                    );

                return (
                  <div
                    key={
                      color.hex
                    }
                    style={{
                      background:
                        "#f9fafb",
                      padding:
                        "1rem",
                      borderRadius:
                        "8px",
                      border:
                        "1px solid #e5e7eb",
                    }}
                  >
                    <label
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap:
                          "0.5rem",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={
                          seleccionado
                        }
                        onChange={() =>
                          handleColorToggle(
                            color.hex
                          )
                        }
                      />

                      <span
                        style={{
                          width:
                            "24px",
                          height:
                            "24px",
                          borderRadius:
                            "50%",
                          backgroundColor:
                            color.hex,
                          border:
                            "1px solid #ccc",
                        }}
                      ></span>

                      {
                        color.nombre
                      }
                    </label>

                    {seleccionado && (
                      <div
                        style={{
                          marginTop:
                            "0.75rem",
                          paddingLeft:
                            "2rem",
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(
                            e
                          ) =>
                            handleColorImage(
                              color.hex,
                              e.target
                                .files[0]
                            )
                          }
                        />

                        {coloresData[
                          color.hex
                        ] && (
                          <img
                            src={
                              coloresData[
                                color
                                  .hex
                              ]
                            }
                            alt={`Vista previa ${color.nombre}`}
                            style={{
                              width:
                                "60px",
                              display:
                                "block",
                              marginTop:
                                "0.5rem",
                              borderRadius:
                                "4px",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* IMAGEN GENERAL */}

        <div
          className="campo"
          style={{
            marginTop:
              "1.5rem",
          }}
        >
          <label>
            Imagen principal general
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleGeneralImage(
                e.target.files[0]
              )
            }
          />

          {imagenGeneral && (
            <img
              src={
                imagenGeneral
              }
              alt="Vista previa"
              style={{
                width: "100px",
                marginTop:
                  "1rem",
                borderRadius:
                  "6px",
              }}
            />
          )}
        </div>

        <button
          type="submit"
          className="btn-primary btn-large"
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          disabled={
            guardando ||
            cargandoCategorias ||
            categorias.length === 0
          }
        >
          {guardando
            ? "Guardando..."
            : "Guardar Playera"}
        </button>
      </form>
    </main>
  );
}

export default AdminProductos;
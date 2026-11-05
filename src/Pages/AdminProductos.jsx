import { useState } from "react";
import { useProductos } from "../context/ProductosContext";
import { useNavigate } from "react-router-dom";

const COLORES_DISPONIBLES = [
  { nombre: "Blanco", hex: "#ffffff" },
  { nombre: "Negro", hex: "#1f2937" },
  { nombre: "Gris claro", hex: "#e5e7eb" },
  { nombre: "Rojo", hex: "#ef4444" },
  { nombre: "Azul", hex: "#3b82f6" },
];

function AdminProductos() {
  const { agregarProducto } = useProductos();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "Geométrico",
    precio: "299",
  });

  // Aquí guardaremos las imágenes por cada color seleccionado
  const [coloresData, setColoresData] = useState({}); 
  // Y la imagen general (si no tiene colores)
  const [imagenGeneral, setImagenGeneral] = useState(null);

  const handleColorToggle = (hex) => {
    setColoresData((prev) => {
      const nuevosColores = { ...prev };
      if (nuevosColores[hex]) {
        delete nuevosColores[hex]; // Si lo desmarca, borramos la imagen
      } else {
        nuevosColores[hex] = null; // Si lo marca, inicializamos vacío
      }
      return nuevosColores;
    });
  };

  const handleColorImage = (hex, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setColoresData((prev) => ({ ...prev, [hex]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleGeneralImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setImagenGeneral(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const coloresKeys = Object.keys(coloresData);
    // Validaciones
    if (coloresKeys.length === 0 && !imagenGeneral) {
      return alert("Debes subir una imagen general O seleccionar al menos un color con su imagen.");
    }
    if (coloresKeys.some((hex) => !coloresData[hex])) {
      return alert("Asegúrate de subir una imagen para cada color seleccionado.");
    }
    
    // Estructura del producto que va a la BD
    const productoFinal = {
      ...formData,
      imagen: imagenGeneral || coloresData[coloresKeys[0]], // Imagen principal (fallback al primer color)
      colores: coloresData // Objeto con { "#ffffff": "base64...", "#000": "base64..." }
    };
    
    agregarProducto(productoFinal);
    alert("¡Playera agregada al catálogo con sus variantes!");
    navigate("/catalogo");
  };

  return (
    <main style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="catalog-header">
        <span className="badge-collection">ADMIN</span>
        <h1>Agregar Nueva Plantilla</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Datos básicos */}
        <div className="campo">
          <label>Nombre del diseño</label>
          <input type="text" required onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
        </div>
        <div className="campo">
          <label>Descripción</label>
          <textarea rows="2" required onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />
        </div>
        <div className="campo">
          <label>Precio (MXN)</label>
          <input type="number" required value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
        </div>
        <div className="campo">
          <label>Categoría</label>
          <select onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
            <option value="Geométrico">Geométrico</option>
            <option value="Floral">Floral</option>
            <option value="Espacial">Espacial</option>
            <option value="Naturaleza">Naturaleza</option>
          </select>
        </div>

        <hr className="divider" />
        
        {/* Selección de Colores e Imágenes */}
        <div className="campo">
          <label>Selecciona los colores y sube su imagen:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {COLORES_DISPONIBLES.map((color) => (
              <div key={color.hex} style={{ background: "#f9fafb", padding: "1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: "bold" }}>
                  <input 
                    type="checkbox" 
                    checked={!!coloresData[color.hex]}
                    onChange={() => handleColorToggle(color.hex)}
                  />
                  <span style={{ 
                    width: "24px", height: "24px", borderRadius: "50%", 
                    backgroundColor: color.hex, border: "1px solid #ccc" 
                  }}></span>
                  {color.nombre}
                </label>

                {/* Si el color está seleccionado, pedimos la imagen */}
                {coloresData[color.hex] !== undefined && (
                  <div style={{ marginTop: "0.75rem", paddingLeft: "2rem" }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={(e) => handleColorImage(color.hex, e.target.files[0])} 
                    />
                    {coloresData[color.hex] && (
                      <img src={coloresData[color.hex]} alt="Preview" style={{ width: "60px", display: "block", marginTop: "0.5rem", borderRadius: "4px" }} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Imagen general (opcional si ya subió colores) */}
        <div className="campo" style={{ marginTop: "1.5rem" }}>
          <label>Imagen principal general (Opcional si ya subiste colores)</label>
          <input type="file" accept="image/*" onChange={(e) => handleGeneralImage(e.target.files[0])} />
        </div>

        <button type="submit" className="btn-primary btn-large" style={{ width: "100%", marginTop: "1rem" }}>
          Guardar Playera
        </button>
      </form>
    </main>
  );
}

export default AdminProductos;
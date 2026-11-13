import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function Personalizar() {
  const { agregarAlCarrito } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados del diseño
  const [colorPlayera, setColorPlayera] = useState("#ffffff");
  const [imagenDiseno, setImagenDiseno] = useState(null);
  const [textoDiseno, setTextoDiseno] = useState("");
  const [colorTexto, setColorTexto] = useState("#1f2937");
  const [tamanoTexto, setTamanoTexto] = useState("24");
  const [posicion, setPosicion] = useState({ x: 50, y: 40 }); // Centro
  
  // Referencia para arrastrar
  const contenedorRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagenDiseno(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Función para arrastrar el diseño dentro de la playera
  const handleDrag = (e) => {
    if (!contenedorRef.current) return;
    const rect = contenedorRef.current.getBoundingClientRect();
    
    // Calculamos la posición en porcentaje (0% a 100%)
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Limitamos para que no se salga del área de la playera
    x = Math.max(10, Math.min(90, x));
    y = Math.max(10, Math.min(90, y));

    setPosicion({ x, y });
  };

  const handleAgregarAlCarrito = () => {
    if (!user) {
      alert("Debes iniciar sesión para guardar tu diseño.");
      return navigate("/login");
    }

    // Creamos un "producto" ficticio con el diseño personalizado
    const productoPersonalizado = {
      id: `custom-${Date.now()}`,
      titulo: "Playera Personalizada",
      descripcion: textoDiseno ? `Diseño con texto: "${textoDiseno}"` : "Diseño personalizado",
      precio: "349", // Precio base de personalización
      imagen: imagenDiseno || "custom", // Guardamos la imagen del diseño
      esPersonalizado: true,
      configuracion: {
        colorPlayera,
        colorTexto,
        tamanoTexto,
        textoDiseno,
        posicion,
      }
    };

    agregarAlCarrito(productoPersonalizado, "M", null);
    alert("¡Tu diseño personalizado se agregó al carrito!");
    navigate("/carrito");
  };

  return (
    <main>
      <div className="catalog-header">
        <span className="badge-collection">CREA TU ESTILO</span>
        <h1>Personaliza tu playera</h1>
        <p>Sube tu diseño, agrega texto y crea una prenda única.</p>
      </div>

      <div className="editor-layout">
        {/* --- PANEL IZQUIERDO: CONTROLES --- */}
        <div className="editor-controls">
          <h3>1. Color de la playera</h3>
          <div className="color-picker-group">
            {["#ffffff", "#1f2937", "#ef4444", "#3b82f6", "#f59e0b"].map((color) => (
              <button
                key={color}
                className={`color-circle ${colorPlayera === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setColorPlayera(color)}
              />
            ))}
          </div>

          <h3>2. Sube tu diseño (PNG sin fondo)</h3>
          <div className="campo">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <h3>3. Agrega texto</h3>
          <div className="campo">
            <input 
              type="text" 
              placeholder="Escribe algo aquí..." 
              value={textoDiseno}
              onChange={(e) => setTextoDiseno(e.target.value)}
              maxLength={20}
            />
          </div>
          
          {textoDiseno && (
            <div className="text-controls">
              <div className="campo">
                <label>Color del texto</label>
                <input type="color" value={colorTexto} onChange={(e) => setColorTexto(e.target.value)} />
              </div>
              <div className="campo">
                <label>Tamaño de letra</label>
                <input type="range" min="12" max="40" value={tamanoTexto} onChange={(e) => setTamanoTexto(e.target.value)} />
              </div>
            </div>
          )}

          <div className="campo" style={{ marginTop: "2rem" }}>
            <button className="btn-primary btn-large" style={{ width: "100%" }} onClick={handleAgregarAlCarrito}>
              Agregar al carrito - $349.00 MXN
            </button>
          </div>
        </div>

        {/* --- PANEL DERECHO: LIENZO (MOCKUP) --- */}
        <div className="editor-canvas-container">
          <p className="helper-text" style={{ textAlign: "center", marginBottom: "1rem" }}>
            Haz clic y arrastra sobre la playera para mover tu diseño
          </p>
          
          <div 
            className="canvas-playera" 
            ref={contenedorRef}
            style={{ backgroundColor: colorPlayera }}
            onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
            onClick={(e) => handleDrag(e)}
          >
            {/* Cuello de la playera (simulado con CSS) */}
            <div className="shirt-neck"></div>
            
            {/* Área de diseño que se puede mover */}
            <div 
              className="design-area"
              style={{
                left: `${posicion.x}%`,
                top: `${posicion.y}%`,
              }}
            >
              {imagenDiseno && (
                <img src={imagenDiseno} alt="Diseño" className="design-image" />
              )}
              {textoDiseno && (
                <p 
                  className="design-text"
                  style={{ 
                    color: colorTexto, 
                    fontSize: `${tamanoTexto}px` 
                  }}
                >
                  {textoDiseno}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Personalizar;
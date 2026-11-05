import { useState } from "react";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí después conectarás tu API para enviar el correo
    setEnviado(true);
    
    // Limpiamos el formulario después de 3 segundos
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    }, 4000);
  };

  return (
    <main>
      <div className="catalog-header" style={{ textAlign: "center" }}>
        <span className="badge-collection">SOPORTE</span>
        <h1>Ponte en contacto</h1>
        <p>¿Tienes dudas sobre un pedido o quieres cotizar un diseño personalizado? Escríbenos.</p>
      </div>

      <div className="contact-layout">
        {/* Información de contacto (Izquierda) */}
        <div className="contact-info-panel">
          <h2>Información de contacto</h2>
          <p className="contact-subtitle">Estamos aquí para ayudarte a crear la playera perfecta.</p>
          
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h4>Dirección</h4>
              <p>Av. Innovación 123, Col. Centro<br/>Ciudad de México, CDMX</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h4>Teléfono</h4>
              <p>+52 (55) 1234-5678</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <h4>Correo</h4>
              <p>hola@printflow.com</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <div>
              <h4>Horario</h4>
              <p>Lunes a Viernes: 9:00 - 18:00<br/>Sábados: 10:00 - 14:00</p>
            </div>
          </div>
        </div>

        {/* Formulario (Derecha) */}
        <div className="contact-form-panel">
          {enviado ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>¡Mensaje enviado!</h3>
              <p>Gracias por escribirnos, te responderemos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="campo">
                <label>Nombre completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="campo">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="campo">
                <label>Asunto</label>
                <input 
                  type="text" 
                  required 
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                  placeholder="¿En qué te podemos ayudar?"
                />
              </div>

              <div className="campo">
                <label>Mensaje</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary btn-large" style={{ width: "100%" }}>
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default Contacto;
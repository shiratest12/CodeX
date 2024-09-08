import React, { useState } from 'react';
import axios from 'axios';

const FormularioContacto = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarFormulario = async (event) => {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const datosFormulario = {
      nombre: nombre,
      correo: correo,
      asunto: asunto,
      mensaje: mensaje,
    };

    try {
      const respuesta = await axios.post('https://ejemplo.com/', datosFormulario); // Reemplaza con tu punto final de envío de formulario
      console.log('Formulario enviado exitosamente:', respuesta);
      // Maneja el envío exitoso (por ejemplo, limpiar el formulario, mostrar mensaje de confirmación)
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Maneja el error de envío (por ejemplo, mostrar mensaje de error)
    }
  };

  return (
    <form onSubmit={enviarFormulario}>
      <div className="mb-3">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      {/* Agrega entradas similares para correo, asunto y mensaje */}
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
};

export default FormularioContacto;
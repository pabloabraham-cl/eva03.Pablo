import React from 'react';
import PropTypes from 'prop-types';
import './PeliculaCard.css'; // Asegúrate de crear este archivo para los estilos

const PeliculaCard = ({ titulo, genero, duracion, clasificacion, sinopsis, horarios }) => {
  // Función para asignar clases según la clasificación
  const getClasificacionClase = (clasificacion) => {
    switch (clasificacion) {
      case 'TE':
        return 'clasificacion-te';
      case '+14':
        return 'clasificacion-14';
      case '+18':
        return 'clasificacion-18';
      default:
        return '';
    }
  };

  return (
    <div className={`pelicula-card ${getClasificacionClase(clasificacion)}`}>
      <h2>{titulo}</h2>
      <p><strong>Género:</strong> {genero}</p>
      <p><strong>Duración:</strong> {duracion} min</p>
      <p><strong>Clasificación:</strong> {clasificacion}</p>
      <p><strong>Sinopsis:</strong> {sinopsis}</p>
      <p><strong>Horarios:</strong> {horarios.join(', ')}</p>
    </div>
  );
};

PeliculaCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  genero: PropTypes.string.isRequired,
  duracion: PropTypes.number.isRequired,
  clasificacion: PropTypes.oneOf(['TE', '+14', '+18']).isRequired,
  sinopsis: PropTypes.string.isRequired,
  horarios: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PeliculaCard;
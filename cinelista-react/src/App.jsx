import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [peliculas, setPeliculas] = useState(() => {
    // Cargar las películas desde localStorage al iniciar
    const savedPeliculas = localStorage.getItem('peliculas');
    return savedPeliculas ? JSON.parse(savedPeliculas) : [];
  });

  const [nuevaPelicula, setNuevaPelicula] = useState({
    titulo: '',
    genero: '',
    duracion: '',
    clasificacion: 'TE',
    sinopsis: '',
    horarios: '',
  });

  // Guardar las películas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
  }, [peliculas]);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaPelicula({ ...nuevaPelicula, [name]: value });
  };

  // Agregar una nueva película
  const agregarPelicula = () => {
    if (!nuevaPelicula.titulo || !nuevaPelicula.genero || !nuevaPelicula.duracion) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const horariosArray = nuevaPelicula.horarios.split(',').map((h) => h.trim());
    setPeliculas([
      ...peliculas,
      {
        ...nuevaPelicula,
        id: Date.now(),
        duracion: parseInt(nuevaPelicula.duracion, 10),
        horarios: horariosArray,
        completada: false,
      },
    ]);

    // Limpiar el formulario
    setNuevaPelicula({
      titulo: '',
      genero: '',
      duracion: '',
      clasificacion: 'TE',
      sinopsis: '',
      horarios: '',
    });
  };

  // Marcar una película como completada
  const marcarCompletada = (id) => {
    setPeliculas(
      peliculas.map((pelicula) =>
        pelicula.id === id ? { ...pelicula, completada: !pelicula.completada } : pelicula
      )
    );
  };

  // Editar una película
  const editarPelicula = (id) => {
    const pelicula = peliculas.find((p) => p.id === id);
    setNuevaPelicula({
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      duracion: pelicula.duracion.toString(),
      clasificacion: pelicula.clasificacion,
      sinopsis: pelicula.sinopsis,
      horarios: pelicula.horarios.join(', '),
    });
    eliminarPelicula(id);
  };

  // Eliminar una película
  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter((pelicula) => pelicula.id !== id));
  };

  // Obtener la clase de estilo según la clasificación
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
    <div className="app">
      <h1>Lista de Películas</h1>
      <div className="formulario">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={nuevaPelicula.titulo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={nuevaPelicula.genero}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duracion"
          placeholder="Duración (min)"
          value={nuevaPelicula.duracion}
          onChange={handleChange}
        />
        <select
          name="clasificacion"
          value={nuevaPelicula.clasificacion}
          onChange={handleChange}
        >
          <option value="TE">TE</option>
          <option value="+14">+14</option>
          <option value="+18">+18</option>
        </select>
        <textarea
          name="sinopsis"
          placeholder="Sinopsis"
          value={nuevaPelicula.sinopsis}
          onChange={handleChange}
        />
        <input
          type="text"
          name="horarios"
          placeholder="Horarios (separados por coma)"
          value={nuevaPelicula.horarios}
          onChange={handleChange}
        />
        <button onClick={agregarPelicula}>Agregar Película</button>
      </div>
      <div className="lista-peliculas">
        {peliculas.map((pelicula) => (
          <div
            key={pelicula.id}
            className={`pelicula-card ${getClasificacionClase(pelicula.clasificacion)} ${
              pelicula.completada ? 'completada' : ''
            }`}
          >
            <h2>{pelicula.titulo}</h2>
            <p><strong>Género:</strong> {pelicula.genero}</p>
            <p><strong>Duración:</strong> {pelicula.duracion} min</p>
            <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
            <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
            <p><strong>Horarios:</strong> {pelicula.horarios.join(', ')}</p>
            <button onClick={() => marcarCompletada(pelicula.id)}>
              {pelicula.completada ? 'Desmarcar' : 'Marcar'}
            </button>
            <button onClick={() => editarPelicula(pelicula.id)}>Editar</button>
            <button onClick={() => eliminarPelicula(pelicula.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
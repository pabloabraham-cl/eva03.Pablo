import React from 'react';
import { peliculas } from 'src/components/listaPeliculas';
import PeliculaCard from 'src/componets/PeliculaCard';

const ListaPeliculas = () => {
  return (
    <div>
      {peliculas.map((pelicula) => (
        <PeliculaCard
          key={pelicula.id}
          titulo={pelicula.titulo}
          genero={pelicula.genero}
          duracion={pelicula.duracion}
          clasificacion={pelicula.clasificacion}
          sinopsis={pelicula.sinopsis}
          horarios={pelicula.horarios}
        />
      ))}
    </div>
  );
};

export default ListaPeliculas;
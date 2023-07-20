/* eslint-disable react/prop-types */
import './Movies.css'

const ListOfMovies = ({ movies }) => {
    return (
        <ul className="movies">
            {
                movies.map(movie => (
                    <li className="movie" key={movie.id}>
                        <h4>{movie.title}</h4>
                        <p>Año: <strong>{movie.year}</strong></p>
                        <img src={movie.img} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

const NoMoviesResults = () => {
    return (
        <h4 className='noMovies'>No se encontraron resultados para esta búsqueda.</h4>
    )
}

export const Movies = ({ movies }) => {
    const hasMovies = movies?.length > 0
    return (
        hasMovies 
        ? <ListOfMovies movies={movies}/> 
        : <NoMoviesResults/>
    )
}
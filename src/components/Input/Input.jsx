import { useSearch } from '../../hooks/useSearch';
import { useMovies } from '../../hooks/useMovies'
import { useCallback, useEffect, useState } from 'react';
import { Movies } from '../Movies/Movies';
import debounce from 'just-debounce-it';
import './Input.css'

const Input = () => {

    const [sort, setSort] = useState(false)

    const { search, setSearch, error } = useSearch()
    const { movies, getMovies, loading } = useMovies(search, sort)

    const debouncedMovies = useCallback(
        debounce(search => {
            console.log("SEARCH", search)
            getMovies(search)
        }, 400)
        , [getMovies]
    )

    const handleChange = (e) => {
        const newSearch = e.target.value
        setSearch(e.target.value)
        debouncedMovies(newSearch)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getMovies(search)
    }

    const handleSort = () => {
        setSort(!sort)
    }

    useEffect(() => {
        console.log("memo movies")
    }, [getMovies])

    return (
        <>
            <header className='header'>
                <h1>StreamBerry</h1>
                <form className='form' action="" onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={search} name='query' type="text" placeholder='Search your movie...' />
                    <input className='checkbox' type="checkbox" onChange={handleSort} checked={sort} />
                    <button type='submit'>Search</button>
                </form>
                {error && <p className='error'>{error}</p>}
            </header>
            {
                (
                    loading 
                    ? <h3 className='loading'>Cargando...</h3>
                    : <Movies movies={movies}/>
                )
            }
            
        </>
    )
}

export default Input
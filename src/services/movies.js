const API_KEY = "4287ad07"

export const searchMovies = async (search) => {
    console.log("SEARCH EN FETCH", search)
    if(search === "") return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search

        return movies?.map(movies => ({
            id: movies.imdbID,
            title: movies.Title,
            year: movies.Year,
            img: movies.Poster
        }))
    } catch (error) {
        throw new Error("Error searching movie")
    }
}
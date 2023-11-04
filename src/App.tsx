import React from 'react'
import "./App.css"
import MovieCard from "./MovieCard.tsx"
import SearchIcon from "./search.svg"

import { useEffect, useState } from "react";

const API_URL = "https://www.omdbapi.com?apikey=d71c9ae6"

const App = () => {

  const [movies, setMovies] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchService, setSearchService] = useState<SearchService | null>(null)

  useEffect(() => {
    setSearchService(new SearchService())
  }, [])

  const searchMovies = async (title: string) => {
    setMovies(await searchService?.search(title))
  }


  return (
    <>
      <div className='app'>
        <h1>MovieLand</h1>
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} onSearchClick={() => searchMovies(searchTerm)} />
        <MovieList movies={movies} />
      </div>
    </>
  )
}

interface ISearchBarProps {
  searchTerm: string
  onSearchTermChange: (searchTerm: string) => void
  onSearchClick: () => void
}

const SearchBar = ({ searchTerm, onSearchTermChange, onSearchClick }: ISearchBarProps) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearchClick()
  }

  return (
    <form className='search' onSubmit={handleFormSubmit}>
      <input
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => { onSearchTermChange(e.target.value) }}
      />
      <img
        src={SearchIcon}
        alt='search'
        onClick={onSearchClick}
      />
    </form>
  )
}

interface IMovieListProps {
  movies: any[]
}

const MovieList = ({ movies }: IMovieListProps) => {
  return (
    <>
      {
        movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (<MovieCard movie={movie} />))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </>
  )
}

class SearchService {
  async search(title: string) {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    return data.Search
  }
}

export default App
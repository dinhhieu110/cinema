import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Shimmer from './components/Shimmer';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const res = await fetch(endpoint, API_OPTIONS);
      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      } else {
        const data = await res.json();
        if (data.Response === 'False') {
          setErrorMsg(data.Error || 'Failed to fetch movies');
          setMovies([]);
          return;
        } else {
          setMovies(data.results || []);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setErrorMsg('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
      setErrorMsg('');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="../public/hero.png" alt="hero img" />
          <h1>
            Find <span className="text-gradient">Movies</span>
            {` You'll Enjoy
            Without The Hassle`}
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Shimmer />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </section>
      </div>
    </main>
  );
};

export default App;

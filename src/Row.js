import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube"
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code that runs based on a specific condition
    useEffect(() => {
        //if [], run once when row loads and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            //the url it sends a request to: https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
            //console.log(request.data.results)
            setMovies(request.data.results)
            return request
        }
        fetchData();
    }, [fetchUrl])

    //console.log(movies)
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then((url) => {
              //https://www.youtube.com/watch?v=XtGdss8Q to get only the 'XtGdss8Q'
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
    };

    return (
        <div className='row'>
            {/* title */}
            <h2>{title}</h2>

            <div className='row__posters'>
                {/* row poster(s) */}
                {movies.map((movie) => (
                    <img
                     key={movie.id}
                     onClick={() => handleClick(movie)}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                     alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
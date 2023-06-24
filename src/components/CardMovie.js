import React from "react";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
const CardMovie = ({ mov }) => {
  return (
    <Col xs="6" sm="6" md="4" lg="3" className="my-1">
      <a href={ !mov.flimLink ? `/movie/${mov.id}` : `${mov.flimLink}`}>
        <div className="card">
          <img src={!mov.postrLink ? `https://image.tmdb.org/t/p/w500/` + mov.poster_path : mov.postrLink } className="card__image" alt="hu" />
          <div className="card__overlay">
            <div className="overlay__text text-center w-100 p-2">
              <p> film name  : {mov.original_title && mov.original_title}</p>
              <p> DATE FILM  :{mov.release_date ? mov.release_date :  Date()}</p>
              <p>VOTE COUNT : {mov.vote_count && mov.vote_count}</p>
              <p>VOTE AVERAGE : {mov.vote_average && mov.vote_average} </p>
            </div>
          </div>
        </div>
      </a>
    </Col >
  );
};

export default CardMovie;

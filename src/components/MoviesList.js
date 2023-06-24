import React, { useState } from "react";
import { Row, Card, Col } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from './Pagination'
import ImageSlider from "../ImageSlider";
import avatarPoster from "../images/avatar-_the_way_of_water-sixteen_nine.jpeg";
import khonWickPoster from "../images/John-Wick-Chapter-4-Movie-OTT-Release-Date.jpg";
import bigMeetsBiggerPoster from "../images/big-meets-bigger.jpeg";
import pussInBootsPoster from "../images/original.jpeg";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const MoviesList = ({ movies, getPage, pageCount }) => {

  const slideArray = [
    {
      images : avatarPoster,
      link :'https://www.avatar.com/movies/avatar-the-way-of-water'
    },
    {
      images :bigMeetsBiggerPoster,
      link :'https://www.warnerbros.com/movies/rampage'
    },
    {
      images :  khonWickPoster ,
      link :'https://johnwick.movie/'
    },
    {
      images : pussInBootsPoster,
      link :'https://www.dreamworks.com/movies/puss-in-boots-the-last-wish#introduction'
    },
]



  const [currentIndex , setCurrentIndex] = useState(1)
  const goToPrev = () => {
    const isfirstSlide = currentIndex === 0
    const newIndex = isfirstSlide ? slideArray.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isfirstSlide = currentIndex === slideArray.length - 1
    const newIndex = isfirstSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const newMovies = JSON.parse(localStorage.getItem('flimInfo'))
                    ? JSON.parse(localStorage.getItem('flimInfo'))
                    : []

  return (
    <div>
      <div className="slideMovie">
        <h2 className="leftArrow" onClick={goToPrev} > prev </h2>
        <h2 className="rightArrow" onClick={goToNext} > next </h2>
        <ImageSlider slider={slideArray} currentIndex={currentIndex} />
      </div>
  
      <div  style={{width:'74%' , margin:'auto'}} className="newMovies mt-3">
      <h2 style={{color:'gray'}}>New Added : </h2>
      <div className="newMovie-container">
          { newMovies.length > 0 &&
            newMovies.map(item => 
              
              (<a href={item.flimLink} className="newMovies-content">
                  <Card className="cardContent" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.postrLink} />
                  <Card.Body className="p-3">
                    <Card.Title>{item.original_title}</Card.Title>
                    <Card.Text className="pb-3" >
                      {item.overview}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>)
            )
          }
      </div>


      </div>



    <Row  style={{width:'75%' , margin:'auto'}} className="mt-3">
    <h2 style={{color:'gray'}}>Recommended : </h2>

      {movies.length >= 1 ? (movies.map((mov) => {
        return ( <CardMovie key={mov.id} mov={mov}  /> )
      })) : <h2 className="text-center p-5">No film ...</h2>}

      {movies.length >= 1 ? (<PaginationComponent getPage={getPage} pageCount={pageCount} />) : null}
    </Row>
    </div>
  );
};

export default MoviesList;

import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from './components/MovieDetails'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  const newMovies = JSON.parse(localStorage.getItem('flimInfo'))
                    ? JSON.parse(localStorage.getItem('flimInfo'))
                    : []
  const [movies, setMovies] = useState([])
  const [pageCount, setpageCount] = useState(0)

  const [formToggle , setFormToggle] = useState(false)
  function disableScroll() {
    // Get the current page scroll position
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
    // if window.scroll is already set, return
    if (window.scroll) return;
  
    // set the scroll position
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  
  function enableScroll() {
    window.onscroll = null;
  }
  
  useEffect(() => {
    if (formToggle) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [formToggle]);

  //get all movies by axios 
  const getAllMovies = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar")
    setMovies([ ...newMovies , ...res.data.results])
    setpageCount(res.data.total_pages)
  }

  //get current page
  const getPage = async (page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&page=${page}`)
    setMovies(res.data.results)
    setpageCount(res.data.total_pages)
  }

  useEffect(() => {
    getAllMovies();
  }, [])

  //to search in api
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${word}&language=en`)
      setMovies(res.data.results)
      setpageCount(res.data.total_pages)
    }
  }
  let movieContentStyle ;
if(!formToggle){
  movieContentStyle = 'displayForm'
}else{
  movieContentStyle = ''
}

// const [flimInfo , setFilmInfo] = useState([])

// const [flimTitle , setFilmTitle] = useState('')
// const [flimDescription , setFilmDescription] = useState('')
// const [flimLink , setFilmLink] = useState('')
// const [postrLink , setPostrLink] = useState('')

// console.log(flimLink , flimTitle ,  flimDescription)
  

// const newMoviesstorage = JSON.parse(localStorage.getItem('flimInfo'))
//                     ? JSON.parse(localStorage.getItem('flimInfo'))
//                     : null

//    const handleFilmInfo = (e) => {
//     e.preventDefault()
//     const handlFilm  = {
//       original_title : flimTitle ,
//       overview : flimDescription,
//       flimLink : flimLink,
//       postrLink : postrLink
//     }
//     setFilmInfo([...flimInfo , handlFilm ])

//     if(newMoviesstorage){
//         localStorage.setItem('flimInfo',JSON.stringify([...flimInfo , ...newMoviesstorage]))
//     }else{
//       localStorage.setItem('flimInfo',JSON.stringify(flimInfo ))
//     }

//     setFilmTitle('')
//     setFilmDescription('')
//     setFilmLink('')
//     setPostrLink('')
//    }
const [flimInfo , setFilmInfo] = useState(JSON.parse(localStorage.getItem('flimInfo')) || []);

const [flimTitle , setFilmTitle] = useState('');
const [flimDescription , setFilmDescription] = useState('');
const [flimLink , setFilmLink] = useState('');
const [postrLink , setPostrLink] = useState('');

console.log(flimLink , flimTitle ,  flimDescription);
  

const handleFilmInfo = (e) => {
  e.preventDefault();
  const handlFilm  = {
    original_title : flimTitle ,
    overview : flimDescription,
    release_date : Date() ,
    flimLink : flimLink,
    postrLink : postrLink
  };
  setFilmInfo([...flimInfo , handlFilm]);
  localStorage.setItem('flimInfo', JSON.stringify([...flimInfo , handlFilm]));

  setFilmTitle('');
  setFilmDescription('');
  setFilmLink('');
  setPostrLink('');
};


  return (
    <div  className="font color-body ">
        <div className={`add-movie-content ${movieContentStyle}`}>
          <form onSubmit={handleFilmInfo} className="addMovieForm">
                  <div onClick={() => setFormToggle(false)}  className="removeFore">x</div>
                  <h3 className="formTitle">Add Film </h3>
                  <input 
                        value={flimTitle} 
                        onChange={(e) => setFilmTitle(e.target.value)}
                        type="text" 
                        placeholder="title" />
                  <input 
                        value={postrLink} 
                        onChange={(e) => setPostrLink(e.target.value)}
                        type="text" 
                        placeholder="image link" />
                  <input 
                        value={flimDescription} 
                        onChange={(e) => setFilmDescription(e.target.value) }
                        type="text" 
                        placeholder="decription" />
                  <input 
                        value={flimLink} 
                        onChange={(e) => setFilmLink(e.target.value) }
                        type="text" 
                        placeholder="link of the trailer" />
                  <input className="submit" type="submit" />
              </form>
        </div>
      <NavBar search={search} />
      <Col style={{position:'absolute' , right:'150px',top:'20px' ,   zIndex:'999'}} >
      <Row>
        <div 
          style={{color:'white' , 
                  backgroundCoor:'red' , 
                  display:'flex' , 
                  alignItems:'center' , 
                  marginRight:'10px',
                  justifyContent:'space-around' ,
                  zIndex:'999',
                fontSize:'20px'}}>
                add movie  
                <h1 onClick={() => setFormToggle(true)} style={{backgroundColor:'black' , 
                              padding:'2px 8px',
                              cursor:'pointer',
                              zIndex:'999',
                              borderRadius:'20px' , 
                              paddingTop:'-25px'}} >+</h1> </div>
      
              </Row>
        </Col>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;

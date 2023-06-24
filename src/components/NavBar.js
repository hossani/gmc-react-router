import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import logo from '../images/logo-design-for-movie-production-company-01--removebg-preview.png'
import { Link } from 'react-router-dom'
const NavBar = ({ search }) => {

  const onSearch = (word) => {
    search(word)
  }
  return (
    <div style={{zIndex:'999'}} className="nav-style w-100">
      <Container>
        <Row className="pt-2 ">
          <Col xs="2" lg="1">
            <a className="logoName" href="/">
              <h1>Mmovies</h1>
            </a>
          </Col>
          <Col xs="10" lg="9" className=" d-flex align-items-center">
            <div className="search  w-100">
              <i className="fa fa-search"></i>
              <input onChange={(e) => onSearch(e.target.value)} type="text" className="form-control" placeholder="search" />
            </div>
          </Col>
  
        </Row>
        </Container>
    </div>
  );
};

export default NavBar;

import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { pullRight, h1 } from './layout.css';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link class="navbar-brand" to="/">
          <Navbar.Brand>
            <img
              src="public/plane logo.jpg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            Goibiba
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;

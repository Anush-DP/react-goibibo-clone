import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link class="navbar-brand" to="/">
          <Navbar.Brand>
            <img
              style={{ margin: "0px 5px" }}
              src="public/plane logo.jpg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            <strong>Goibiba</strong>
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;

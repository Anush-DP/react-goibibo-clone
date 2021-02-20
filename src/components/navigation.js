import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" sticky="top">
      <Container>
        <Link class="navbar-brand" to="/">
          <Navbar.Brand>
            <img
              style={{ margin: '0px 5px' }}
              src="public/plane logo.svg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            <strong>Goibiba</strong>
          </Navbar.Brand>
        </Link>
        <Nav className="justify-content-end">
          <Nav.Link href="#sc">{`<Source code />`}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;

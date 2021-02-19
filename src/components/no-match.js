import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Container>
      <center>
        <h1>Page not found!</h1>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </center>
    </Container>
  );
};

export default NoMatch;

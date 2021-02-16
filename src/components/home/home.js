import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import FlightForm from "./form";

const Home = () => {
  return (
    <Container>
      <center>
        <h1>Flight Ticket Booking</h1>
      </center>
      <br />
      <Jumbotron>
        <FlightForm />
      </Jumbotron>
    </Container>
  );
};

export default Home;

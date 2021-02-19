import React from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import flightsAPI from "../apis/flightsAPI";
import "./flights.css";

const Flight = () => {
  const params = useParams().slug.split("-");
  const url =
    "air-" +
    params[0] +
    "-" +
    params[1] +
    "-" +
    params[2] +
    "--" +
    params[3] +
    "-0-0-" +
    params[4];
  flightsAPI
    .get("[{%22query%22:%22" + url + "-100--%22}]")
    .then((res) => {
      console.log(JSON.parse(res.data.split("\n")[0]));
    })
    .catch((e) => {
      console.log(e.message);
    });
  return (
    <>
      <Container>
        <center>
          <h1>Flights Available</h1>
        </center>
        <br />
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
        <Card className="flights-card" body>
          This is some text within a card body.
        </Card>
      </Container>
    </>
  );
};

export default Flight;

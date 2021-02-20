import React, { useState } from 'react';
import { Card, Container, Spinner, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import flightsAPI from '../apis/flightsAPI';
import { flightLogoURL } from '../apis/flightLogoAPI';
import './flights.css';
import { findFlightNameByKey, findPlaceNameByIata } from './helpers';

const Flight = () => {
  let [data, setData] = useState([]);
  let [done, setDone] = useState(false);
  const params = useParams().slug.split('-');
  const url =
    'air-' +
    params[0] +
    '-' +
    params[1] +
    '-' +
    params[2] +
    '--' +
    params[3] +
    '-0-0-' +
    params[4];
  if (!done)
    flightsAPI
      .get('[{%22query%22:%22' + url + '-100--%22}]')
      .then((res) => {
        let _data = [];
        let x = JSON.parse(res.data.split('\n')[0]);
        x.o.forEach((i) => {
          let arr = i.rk.split('|');
          let arr2 = arr[0].split('$');
          if (arr.length === 1 && arr2.length === 4) {
            let fArr = arr2[3].split('-');
            _data.push({
              origin: findPlaceNameByIata(arr2[0], x.a),
              destination: findPlaceNameByIata(arr2[1], x.a),
              time: arr2[2],
              flightName: { ...findFlightNameByKey(fArr[0], x.c), id: arr2[3] },
              price: i.p,
            });
          }
        });
        console.log(_data);
        setData(_data);
        setDone(true);
      })
      .catch((e) => {
        console.log(e);
      });
  // new Promise(resolve => {
  //   setTimeout(() => resolve(),2000);
  // }).then(r=>{setDone(true)});
  return (
    <>
      <Container>
        <center>
          <h1>Flights Available</h1>
        </center>
        <br />
        {!done ? (
          <center>
            Loading <Spinner animation="border" variant="primary" />
          </center>
        ) : (
          data.map((i) => (
            <Card className="flights-card" body>
              <Card.Header>
                <img
                  className="flight-images"
                  src={flightLogoURL + i.flightName.c + '.gif'}
                  alt={i.flightName.n + ' logo'}
                />
                {` ${i.flightName.n} - ${i.flightName.id}`}
              </Card.Header>
              <Card.Body>
                <Table responsive borderless size="sm">
                  <tbody>
                    <tr>
                      <td>{i.origin.t}</td>
                      <td>{i.time}</td>
                      <td>{i.destination.t}</td>
                      <td>{'\u20B9' + i.price}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};

export default Flight;

import React from "react";
import flightsAPI from "../apis/flightsAPI";

const Flight = () => {
  flightsAPI
    .get("[{%22query%22:%22" + "air-BLR-BOM-20210222--1-0-0-E-100--" + "%22}]")
    .then((res) => {
      console.log(JSON.parse(res.data.split("\n")[0]));
    });
  return <strong>Flight</strong>;
};

export default Flight;

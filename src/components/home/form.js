import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import flightPlacesAPI from "../apis/flightPlacesAPI";
import cloneDeep from "clone-deep";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object({
  origin: Yup.object().required("Required"),
  destination: Yup.object().required("Required"),
  departureDate: Yup.string().required("Required").nullable(),
});
const initialValues = {
  origin: "",
  destination: "",
  departureDate: null,
  travelClass: "E",
  travellers: 1,
};
const loadPlaces = (loc) =>
  new Promise((resolve) => {
    flightPlacesAPI
      .get(loc)
      .then((res) => {
        resolve(cloneDeep(res.data.data.r));
      })
      .catch((res) => {
        resolve([]);
      });
  });
const FlightForm = () => {
  let history = useHistory();
  const onSubmit = (values) => {
    let val =
      values.origin.iata +
      "-" +
      values.destination.iata +
      "-" +
      values.departureDate
        .toISOString()
        .split("T")[0]
        .split("-")
        .reduce((a, i) => a + i) +
      "-" +
      values.travellers +
      "-" +
      values.travelClass;
    history.push("/flights/" + val);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onSubmit,
    validateOnMount: true,
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Origin</Form.Label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadPlaces}
              getOptionLabel={(i) => i.ct.n}
              getOptionValue={(i) => i.ct.n}
              id="origin"
              name="origin"
              onChange={(data) => formik.setFieldValue("origin", data)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Destination</Form.Label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadPlaces}
              getOptionLabel={(i) => i.ct.n}
              getOptionValue={(i) => i.ct.n}
              id="destination"
              name="destination"
              onChange={(data) => formik.setFieldValue("destination", data)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Departure Date</Form.Label>
            <DatePicker
              className="form-control"
              dateFormat="dd/MM/yyyy"
              selected={formik.values.departureDate}
              id="departureDate"
              name="departureDate"
              onChange={(val) => formik.setFieldValue("departureDate", val)}
              onBlur={formik.handleBlur}
              minDate={new Date()}
              value={formik.values.departureDate}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Travel class</Form.Label>
            <Form.Control
              custom="true"
              as="select"
              id="travelClass"
              name="travelClass"
              {...formik.getFieldProps("travelClass")}
            >
              <option value="E">Economy</option>
              <option value="B">Business</option>
              <option value="F">First Class</option>
              <option value="W">Premium Economy</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Travellers</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="9"
              id="travellers"
              name="travellers"
              {...formik.getFieldProps("travellers")}
            />
          </Form.Group>
        </Form.Row>
        <Button
          variant="primary"
          size="lg"
          block
          type="submit"
          disabled={!formik.isValid}
        >
          Search
        </Button>
      </Form>
    </>
  );
};

export default FlightForm;

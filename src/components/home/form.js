import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import Axios from "axios";
import Lodash from "lodash";
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
  travelClass: "",
  travellers: 1,
};
const loadPlaces = (loc) =>
  new Promise((resolve) => {
    let url =
      "https://voyager.goibibo.com/api/v1/flights_search/find_node_by_name_v2/?limit=10&search_query=" +
      loc;
    Axios.get(url)
      .then((res) => {
        resolve(Lodash.cloneDeep(res.data.data.r));
      })
      .catch((res) => {
        console.log(res);
        resolve([]);
      });
  });
const FlightForm = () => {
  let history = useHistory();
  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    history.push("/flights");
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
            <Form.Control.Feedback type="invalid">
              {formik.errors.departureDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Travel class</Form.Label>
            <Form.Control
              custom="true"
              as="select"
              defaultValue="Choose..."
              id="travelClass"
              name="travelClass"
              {...formik.getFieldProps("travelClass")}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
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
          Submit
        </Button>
      </Form>
    </>
  );
};

export default FlightForm;

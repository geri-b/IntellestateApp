import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CitySearchBox = ({cityName, onCityNameChange}) => {

    return (
        <Form.Group controlId="cityName">
            <Form.Control
                type="text"
                placeholder="Enter City Name"
                value={cityName}
                onChange={onCityNameChange}
            />
        </Form.Group>
    );
};

export default CitySearchBox;
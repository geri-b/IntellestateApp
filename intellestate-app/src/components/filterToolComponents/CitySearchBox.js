import React from "react";
import { Form } from "react-bootstrap";

const CitySearchBox = ({cityName, onCityNameChange}) => {

    return (
        <Form.Group controlId="cityName">
            <Form.Control
                type="text"
                placeholder="City"
                value={cityName}
                onChange={onCityNameChange}
                style={{padding: '3px 8px'}}
            />
        </Form.Group>
    );
};

export default CitySearchBox;
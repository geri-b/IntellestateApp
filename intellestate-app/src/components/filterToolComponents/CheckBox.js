import React from 'react';
import { Col } from 'react-bootstrap';

function Checkbox({ label, name, checked, onChange, weight, onWeightChange }) {
    return (
        <div className="form-check d-flex align-items-center">
            <Col className="d-flex justify-content-start">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={checked}
                    onChange={onChange}
                />

                <label className="form-check" htmlFor={name}>
                    {label}
                </label>
            </Col>
            <Col>
                <input
                    type="number"
                    className="form-control ml-2"
                    name={`${name}_weight`}
                    id={`${name}_weight`}
                    value={weight}
                    onChange={onWeightChange}
                    disabled={!checked}
                    style={{ width: "80px" }}
                />
            </Col>
        </div>
    );
}

export default Checkbox;

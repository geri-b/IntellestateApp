import React from 'react';
import { ToggleButton, Col } from 'react-bootstrap';
import invertIcon from '../../images/BrowsePage/InvertIcon.png'

function Checkbox({ invertChecked, onInvertClick, label, name, checked, onChange, weight, onWeightChange }) {
    const invertIconStyle = {
        width: '20px',
        height: '20px',
        backgroundColor: invertChecked ? 'blue' : 'transparent',
    };

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
            <ToggleButton
                variant="light"
                className="btn shadow-none invert-rank"
                active={invertChecked}
                onClick={onInvertClick}
            >
                <img className="invert-icon" src={invertIcon} style={invertIconStyle} />
            </ToggleButton>
        </div>
    );
}

export default Checkbox;

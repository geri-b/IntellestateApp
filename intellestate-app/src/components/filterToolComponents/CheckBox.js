import React from 'react';

function Checkbox({ label, name, checked, onChange, weight, onWeightChange }) {
    return (
        <div className="form-check d-flex align-items-center">
            <input
                className="form-check-input"
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={onChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {label}
            </label>
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
        </div>
    );
}

export default Checkbox;

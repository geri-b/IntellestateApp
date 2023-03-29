import React from 'react';

function Checkbox({ label, name, checked, onChange }) {
    return (
        <div className="form-check">
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
        </div>
    );
}

export default Checkbox;

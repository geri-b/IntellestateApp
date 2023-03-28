
import { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

function PropertyTypeDropdown() {
    const [propertyTypes, setPropertyTypes] = useState({
        residential: false,
        commercial: false,
        institutional: false,
        government: false,
        industrial: false,
        agricultural: false,
        utility: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setPropertyTypes((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    return (
        <Dropdown>
            <Dropdown.Toggle id="property-type-dropdown-button" variant="primary">
                Property Types
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {Object.keys(propertyTypes).map((type) => (
                    <Dropdown.Item as="div" key={type} className="d-flex">
                        <Form.Check
                            inline
                            type="checkbox"
                            id={`${type}-checkbox`}
                            name={type}
                            label={type.charAt(0).toUpperCase() + type.slice(1)}
                            checked={propertyTypes[type]}
                            onChange={handleCheckboxChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PropertyTypeDropdown
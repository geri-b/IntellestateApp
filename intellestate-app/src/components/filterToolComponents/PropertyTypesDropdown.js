
import { Dropdown, Form } from 'react-bootstrap';

function PropertyTypeDropdown({propertyTypes, onCheckboxChange}) {

    return (
        <Dropdown autoClose='outside'>
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
                            onChange={onCheckboxChange}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PropertyTypeDropdown
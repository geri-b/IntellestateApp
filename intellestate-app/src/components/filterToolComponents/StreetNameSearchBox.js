import { Form } from "react-bootstrap";

const StreetNameSearchBox = ({streetName, onstreetNameChange}) => {
    return (
        <Form.Group controlId="streetName">
            <Form.Control
                type="text"
                placeholder="Street"
                value={streetName}
                onChange={onstreetNameChange}
                style={{padding: '3px 8px'}}
            />
        </Form.Group>
    );
};

export default StreetNameSearchBox;
import { Form } from "react-bootstrap";

const StreetNameSearchBox = ({streetName, onstreetNameChange}) => {
    return (
        <Form.Group controlId="streetName">
            <Form.Control
                type="text"
                placeholder="Street"
                value={streetName}
                onChange={onstreetNameChange}
            />
        </Form.Group>
    );
};

export default StreetNameSearchBox;
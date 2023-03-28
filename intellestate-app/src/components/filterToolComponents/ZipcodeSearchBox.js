import { Form } from "react-bootstrap";

const ZipcodeSearchBox = ({zipcodeName, onzipcodeNameChange}) => {

    return (
        <Form.Group controlId="zipcodeName">
            <Form.Control
                type="text"
                placeholder="Enter ZIP Code"
                value={zipcodeName}
                onChange={onzipcodeNameChange}
            />
        </Form.Group>
    );
};

export default ZipcodeSearchBox;
import { Form } from "react-bootstrap";

const ZipcodeSearchBox = ({zipcodeName, onzipcodeNameChange}) => {

    return (
        <Form.Group controlId="zipcodeName">
            <Form.Control
                type="text"
                placeholder="ZIP"
                value={zipcodeName}
                onChange={onzipcodeNameChange}
            />
        </Form.Group>
    );
};

export default ZipcodeSearchBox;
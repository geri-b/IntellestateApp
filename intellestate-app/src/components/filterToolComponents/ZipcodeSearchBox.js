import { Form } from "react-bootstrap";

const ZipcodeSearchBox = ({zipcodeName, onzipcodeNameChange}) => {

    return (
        <Form.Group controlId="zipcodeName">
            <Form.Control
                type="text"
                placeholder="ZIP"
                value={zipcodeName}
                onChange={onzipcodeNameChange}
                style={{padding: '3px 8px'}}
            />
        </Form.Group>
    );
};

export default ZipcodeSearchBox;
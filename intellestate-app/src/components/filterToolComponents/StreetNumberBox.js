import { Form } from "react-bootstrap";

const StreetNumBox = ({streetNum, onStreetNumChange}) => {

    return (
        <Form.Group controlId="streetNum">
            <Form.Control
                type="text"
                placeholder="Street number"
                value={streetNum}
                onChange={onStreetNumChange}
            />
        </Form.Group>
    );
};

export default StreetNumBox;
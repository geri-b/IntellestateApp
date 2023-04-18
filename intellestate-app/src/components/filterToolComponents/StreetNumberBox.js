import { Form } from "react-bootstrap";

const StreetNumBox = ({streetNum, onStreetNumChange}) => {

    return (
        <Form.Group controlId="streetNum">
            <Form.Control
                type="text"
                placeholder="Num"
                value={streetNum}
                onChange={onStreetNumChange}
                style={{padding: '3px 8px'}}
            />
        </Form.Group>
    );
};

export default StreetNumBox;
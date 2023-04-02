import { Form } from "react-bootstrap";

const SuffixSearchBox = ({suffixName, onsuffixNameChange}) => {

    return (
        <Form.Group controlId="suffixName">
            <Form.Control
                type="text"
                placeholder="Suffix"
                value={suffixName}
                onChange={onsuffixNameChange}
            />
        </Form.Group>
    );
};

export default SuffixSearchBox;
import { Form } from "react-bootstrap";

const SuffixSearchBox = ({suffixName, onsuffixNameChange}) => {

    return (
        <Form.Group controlId="suffixName">
            <Form.Control
                type="text"
                placeholder="Sfx"
                value={suffixName}
                onChange={onsuffixNameChange}
                style={{padding: '3px 8px'}}
            />
        </Form.Group>
    );
};

export default SuffixSearchBox;
import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../App.css';

function PropertyCard({ property }) {

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant='light' style={{width: '100%'}}>
                <Card>
                    <Card.Body>
                        <Card.Title>{property.FULL_ADDR}</Card.Title>
                        <Card.Text >
                            <Row>
                                <Col>
                                    <Row className='justify-content-center'>
                                        Price
                                    </Row>
                                    <div className='circle-container'>
                                        <div className='circle'>
                                            {Math.round(property.p_rating * 100) / 100}
                                        </div>
                                    </div>
                                    
                                </Col>
                                <Col>
                                    <Row className='justify-content-center'>
                                        Income
                                    </Row>
                                    <div className='circle-container'>
                                        <div className='circle'>
                                            {Math.round(property.i_rating * 100) / 100}
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <Row className='justify-content-center'>
                                        Diversity
                                    </Row>
                                    <div className='circle-container'>
                                        <div className='circle'>
                                            {Math.round(property.d_rating * 100) / 100}
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <Row className='justify-content-center'>
                                        Crime
                                    </Row>
                                    <div className='circle-container'>
                                        <div className='circle'>
                                            {Math.round(property.c_rating * 100) / 100}
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <Row className='justify-content-center'>
                                        School
                                    </Row>
                                    <div className='circle-container'>
                                        <div className='circle'>
                                            {Math.round(property.s_rating * 100) / 100}
                                        </div>
                                    </div>
                                </Col>
                                <Col className='my-2'>
                                    <Row className='justify-content-center my-2'>
                                        {property.TOTAL_SQUA} sq
                                    </Row>
                                    <Row className='justify-content-center'>
                                        {property.Units} Building
                                    </Row>
                                </Col>
                                <Col className='my-2'>
                                    <Row className='justify-content-center my-2'>
                                        ${property.GCERT3}
                                    </Row>
                                    <Row className='justify-content-center'>
                                        {property.PROPERTY_C}
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Header as="div">
                    <Card>
                        <Card.Body>
                            <Card.Title>{property.FULL_ADDR}</Card.Title>
                        </Card.Body>
                    </Card>
                </Dropdown.Header>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PropertyCard;
import Card from 'react-bootstrap/Card';
import { Row, Col, Button, Dropdown } from 'react-bootstrap';
import '../App.css';

function PropertyCard({ property }) {
  function ratingColor(rating) {
    if (rating === null) return "#ddd";
    else if (rating >= 0.8) return "#0d0";
    else if (rating >= 0.6) return "#7d0";
    else if (rating >= 0.4) return "#dd0";
    else if (rating >= 0.2) return "#d70";
    else if (rating >= 0) return "#d00";
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Button}
        variant="light"
        style={{ width: "100%", minWidth: "370px" }}
      >
        <Card>
          <Card.Body>
            <Card.Header style={{ overflowX: "hidden", textAlign: 'left' }}>
              {property.FULL_ADDR}
            </Card.Header>
            <Card.Text>
              <Row style={{ gap: "5px" }}>
                <Col>
                  <Row className="justify-content-center">Price</Row>
                  <div className="circle-container">
                    <div
                      className="circle"
                      style={{
                        backgroundColor: ratingColor(property.p_rating),
                      }}
                    >
                      {Math.round(property.p_rating * 100)}
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="justify-content-center">Income</Row>
                  <div className="circle-container">
                    <div
                      className="circle"
                      style={{
                        backgroundColor: ratingColor(property.i_rating),
                      }}
                    >
                      {Math.round(property.i_rating * 100)}
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="justify-content-center">Diversity</Row>
                  <div className="circle-container">
                    <div
                      className="circle"
                      style={{
                        backgroundColor: ratingColor(property.d_rating),
                      }}
                    >
                      {Math.round(property.d_rating * 100)}
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="justify-content-center">Crime</Row>
                  <div className="circle-container">
                    <div
                      className="circle"
                      style={{
                        backgroundColor: ratingColor(property.c_rating),
                      }}
                    >
                      {Math.round(property.c_rating * 100)}
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="justify-content-center">School</Row>
                  <div className="circle-container">
                    <div
                      className="circle"
                      style={{
                        backgroundColor: ratingColor(property.s_rating),
                      }}
                    >
                      {Math.round(property.s_rating * 100)}
                    </div>
                  </div>
                </Col>
                <Col className="my-2" xs={5} sm={4} md={3} lg={3} xxl={2}>
                  <Row className="justify-content-center my-2">
                    {property.TOTAL_RES_AREA + property.TOTAL_COM_AREA} sq.
                  </Row>
                  <Row className="justify-content-center">
                    {property.RES_BLDG_CNT + property.COM_BLDG_CNT} Bldg.
                  </Row>
                </Col>
                <Col className="my-2" xs={5} sm={4} md={3} lg={3} xxl={2}>
                  <Row className="justify-content-center my-2">
                    ~${property.GCERT3}
                  </Row>
                  <Row className="justify-content-center">
                    {property.SiteCat1}
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
                            <Card.Body>
                                <Card.Text>
                                    {property.ZIPCODE}
                                </Card.Text>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Dropdown.Header>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PropertyCard;
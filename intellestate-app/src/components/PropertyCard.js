import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import React, { useState } from 'react';

function PropertyCard({ property, onHeaderClick, onBodyClick, onButtonClick }) {
  function ratingColor(rating) {
    if (rating === null) return "#ddd";
    else if (rating >= 0.8) return "#0d0";
    else if (rating >= 0.6) return "#7d0";
    else if (rating >= 0.4) return "#dd0";
    else if (rating >= 0.2) return "#d70";
    else if (rating >= 0) return "#d00";
  }

  const [headerHover, setHeaderHover] = useState(false);
  const [bodyHover, setBodyHover] = useState(false);

  return (
    <Card style={{ width: "100%", minWidth: "370px" }}>
      <Card.Header
        style={{ overflowX: "hidden", textAlign: 'left', backgroundColor: headerHover ? '#f8f9fa' : 'transparent' }}
        onClick={() => onHeaderClick(property)}
        onMouseEnter={() => setHeaderHover(true)}
        onMouseLeave={() => setHeaderHover(false)}
      >
        {property.FULL_ADDR}
        <Button
          className="btn btn-sm"
          style={{
            marginLeft: '100px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick(property);
          }}
        >
          Update Graphs
        </Button>
      </Card.Header>
      <Card.Body
        onClick={() => onBodyClick(property)}
        onMouseEnter={() => setBodyHover(true)}
        onMouseLeave={() => setBodyHover(false)}
        style={{ backgroundColor: bodyHover ? '#f8f9fa' : 'transparent' }}

      >
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
      </Card.Body>
      {property.showExtraInfo && (
        <Card.Body>
          <Card.Title>{property.FULL_ADDR}</Card.Title>
          <Card.Text>
            {property.ZIPCODE}
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}

export default PropertyCard;
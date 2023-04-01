import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import React, { useState } from 'react';
import graphIcon from '../images/BrowsePage/BarGraphIcon.png'

function PropertyCard({ property, onHeaderClick, onBodyClick, onButtonClick }) {
  function ratingColor(rating) {
    if (rating === null) return "#ddd";
    else if (rating >= 0.8) return "#0d0";
    else if (rating >= 0.6) return "#9d0";
    else if (rating >= 0.4) return "#dd0";
    else if (rating >= 0.2) return "#d70";
    else if (rating >= 0) return "#d00";
  }

  const [headerHover, setHeaderHover] = useState(false);
  const [bodyHover, setBodyHover] = useState(false);

  return (
    <Card style={{ width: "100%", minWidth: "370px", color: "#414243", /*boxShadow: '0px 1px 3px 2px lightgrey', border: 'none'*/ }}>
      <Card.Header
        className='property-card-header'
        style={{ overflowX: "hidden", textAlign: 'left', backgroundColor: headerHover ? '#eaebec' : '#f1f2f3', cursor: headerHover ? 'pointer' : 'default' }}
        onClick={() => onHeaderClick(property)}
        onMouseEnter={() => setHeaderHover(true)}
        onMouseLeave={() => setHeaderHover(false)}
      >
        <div>{property.FULL_ADDR}</div>
        <Button
          variant='light'
          className="btn shadow-none show-more"
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick(property);
          }}
        >
          <img className='bar-graph-icon' src={graphIcon} style={{width: '20px', height: '20px'}}></img>
        </Button>
      </Card.Header>
      <Card.Body
        className='property-card-body'
        onClick={() => onBodyClick(property)}
        onMouseEnter={() => setBodyHover(true)}
        onMouseLeave={() => setBodyHover(false)}
        style={{ backgroundColor: bodyHover ? '#f8f9fa' : 'white', cursor: bodyHover ? 'pointer' : 'default' }}

      >
        <Row className='card-body-row' style={{ gap: "5px" }}>
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
          <Col className="col fw-bold" xs={5} sm={4} md={3} lg={3} xl={2} xxl={2} style={{padding: 0}}>
            <Row className="justify-content-center align-items-center">
              {property.TOTAL_RES_AREA + property.TOTAL_COM_AREA} sq.
            </Row>
            <Row className="justify-content-center align-items-center">
              {property.RES_BLDG_CNT + property.COM_BLDG_CNT} Bldg.
            </Row>
          </Col>
          <Col className="col fw-bold" xs={5} sm={4} md={3} lg={3} xl={2} xxl={2} style={{paddingLeft: 0}}>
            <Row className="justify-content-center align-items-center">
              ~${property.GCERT3}
            </Row>
            <Row className="justify-content-center align-items-center">
              {property.SiteCat1}
            </Row>
          </Col>
        </Row>
        <Row>
          {property.showExtraInfo && (
            <Card.Body>
              <Card.Title style={{ borderBottom: '1px solid #ccc'}}>PROPERTY INFORMATION</Card.Title>
              <Card.Text style={{ marginBottom: '-20px' }}>
                <Row>
                <Col className="text-left" style={{ whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
                Owner: <span style={{ fontWeight: 'bold' }}> {property.PARCL_OWN2} </span>
                </Col>
                <Col className="text-center" style={{ whiteSpace: 'nowrap' }}>
                Units: <span style={{ fontWeight: 'bold' }}> {property.Units2}</span>
                </Col>
                <Col className="text-right" style={{ whiteSpace: 'nowrap' }}>
                  Land Price: <span style={{ fontWeight: 'bold' }}> ${property.GCERT1} </span>
                </Col>
                </Row>

                <Row>
                <Col className="text-left" style={{ whiteSpace: 'nowrap' }}>
                  Transfer Date: <span style={{ fontWeight: 'bold' }}> {property.TRANSFER_DATE} </span>
                </Col>
                <Col className="text-center" style={{ whiteSpace: 'nowrap' }}>
                  Description: <span style={{ fontWeight: 'bold' }}> {property.SiteCat2} </span>
                </Col>
                <Col className="text-right" style={{ whiteSpace: 'nowrap' }}>
                  Building Price: <span style={{ fontWeight: 'bold' }}> ${property.GCERT2} </span>
                </Col>
                </Row>

                <Row>
                  <Col className="text-left" style={{ whiteSpace: 'nowrap' }}>
                  Transfer Price: <span style={{ fontWeight: 'bold' }}> {property.SALES_AMOU == 0 ? 'No Information' : `$${property.SALES_AMOU}`} </span>
                </Col>
                <Col className="text-center" style={{ whiteSpace: 'nowrap' }}>
                  Neighborhood: <span style={{ fontWeight: 'bold' }}> {property.NEIGHBORHOOOD} </span>
                </Col>
                <Col className="text-right" style={{ whiteSpace: 'nowrap' }}>
                  Acres: <span style={{ fontWeight: 'bold' }}> {property.TOTAL_ACRE} </span>
                </Col>
                </Row>

              </Card.Text>
            </Card.Body>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
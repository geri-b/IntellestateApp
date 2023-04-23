import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import React, { useState } from 'react';
import graphIcon from '../images/BrowsePage/BarGraphIcon.png'

function PropertyCard({ property, onHeaderClick, onBodyClick, onButtonClick }) {
  function ratingColor(rating) {
    if (rating === null) return "#bbb";
    else if (rating >= 0.8) return "#0d0";
    else if (rating >= 0.6) return "#9d0";
    else if (rating >= 0.4) return "#dd0";
    else if (rating >= 0.2) return "#d70";
    else if (rating >= 0) return "#d00";
  }

  function ratingBackgroundColor(rating) {
    if (rating === null) return "#e0e0e0";
    else if (rating >= 0.8) return "#d0ffd0";
    else if (rating >= 0.6) return "#efffc8";
    else if (rating >= 0.4) return "#ffffc0";
    else if (rating >= 0.2) return "#ffdfd0";
    else if (rating >= 0) return "#ffd0d0";
  }

  function ratingDescription(ratingName, rating) {
    if (ratingName === 'price' || ratingName === 'school') {
      if (rating === null) return 'N/A';
      else if (rating >= 0.8) return 'Excellent';
      else if (rating >= 0.6) return 'Great';
      else if (rating >= 0.4) return 'Average';
      else if (rating >= 0.2) return 'Bad';
      else if (rating >= 0) return 'Awful';
    } else if (ratingName === 'income' || ratingName === 'diversity') {
      if (rating === null) return 'N/A';
      else if (rating >= 0.8) return 'Very High';
      else if (rating >= 0.6) return 'High';
      else if (rating >= 0.4) return 'Average';
      else if (rating >= 0.2) return 'Low';
      else if (rating >= 0) return 'Very Low';
    } else if (ratingName === 'crime') {
      if (rating === null) return 'N/A';
      else if (rating >= 0.8) return 'Very Low Crime';
      else if (rating >= 0.6) return 'Low Crime';
      else if (rating >= 0.4) return 'Moderate Crime';
      else if (rating >= 0.2) return 'High Crime';
      else if (rating >= 0) return 'Very High Crime';
    }
  }

  const markerColor = {
    'Residential': 'lightskyblue',
    'Commercial': 'forestgreen',
    'Agricultural': '#e70',
    'Utility': '#7d7',
    'Government': 'royalblue',
    'Institutional': '#e8b828',
    'Industrial': 'saddlebrown',
    'Mixed': 'purple',
    'Other': 'grey',
  };

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
          title='Show Detailed Statistics'
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick(property);
          }}
        >
          <img className='bar-graph-icon' src={graphIcon} style={{width: '20px', height: '20px'}} alt='Show Details'></img>
        </Button>
      </Card.Header>
      <Card.Body
        className='property-card-body'
        onClick={() => onBodyClick(property)}
        onMouseEnter={() => setBodyHover(true)}
        onMouseLeave={() => setBodyHover(false)}
        style={{ backgroundColor: bodyHover ? '#f8f9fa' : 'white', cursor: bodyHover ? 'pointer' : 'default', display: 'grid', padding: '5px 5px 1rem 5px' }}

      >
        <Row style={{padding: '2px 0 2px 0'}}>
          <Col className='col fw-bold' style={{lineHeight: '100%'}}>
            ~${property.GCERT3}
          </Col>
          <Col className='col fw-bold' style={{lineHeight: '100%'}}>
            {property.TOTAL_RES_AREA + property.TOTAL_COM_AREA} sqft.
          </Col>
          <Col className='col fw-bold' style={{lineHeight: '100%'}}>
            {property.COM_BLDG_CNT === '0' ? property.RES_BLDG_COUNT : property.COM_BLDG_CNT} Bldg.
          </Col>
          <Col className='col fw-bold' style={{lineHeight: '100%', color: markerColor[property.SiteCat1 === '' ? 'Other' : property.SiteCat1]}}>
            {property.SiteCat1 === '' ? 'N/A' : property.SiteCat1}
          </Col>
        </Row>
        <Row className='card-body-row property-ratings-row' style={{ gap: "5px", margin: '5px 0' }}>
          <Col style={{backgroundColor: ratingBackgroundColor(property.p_rating)}}>
            <Row className="justify-content-center"><b>Price</b></Row>
            <div className="circle-container">
              <div
                className="circle"
                style={{
                  backgroundColor: ratingColor(property.p_rating),
                }}
              >
                {Math.round(property.p_rating * 100) / 10}
              </div>
            </div>
            <Row className="justify-content-center" style={{fontSize: '12px', margin: 0}}>{ratingDescription('price', property.p_rating)}</Row>
          </Col>
          <Col style={{backgroundColor: ratingBackgroundColor(property.c_rating)}}>
            <Row className="justify-content-center"><b>Crime</b></Row>
            <div className="circle-container">
              <div
                className="circle"
                style={{
                  backgroundColor: ratingColor(property.c_rating),
                }}
              >
                {Math.round(property.c_rating * 100) / 10}
              </div>
            </div>
            <Row className="justify-content-center" style={{fontSize: '12px', margin: 0}}>{ratingDescription('crime', property.c_rating)}</Row>
          </Col>
          <Col style={{backgroundColor: ratingBackgroundColor(property.s_rating)}}>
            <Row className="justify-content-center"><b style={{padding: 0}}>School</b></Row>
            <div className="circle-container">
              <div
                className="circle"
                style={{
                  backgroundColor: ratingColor(property.s_rating),
                }}
              >
                {Math.round(property.s_rating * 100) / 10}
              </div>
            </div>
            <Row className="justify-content-center" style={{fontSize: '12px', margin: 0}}>{ratingDescription('school', property.s_rating)}</Row>
          </Col>
          <Col style={{backgroundColor: ratingBackgroundColor(property.i_rating)}}>
            <Row className="justify-content-center"><b>Income</b></Row>
            <div className="circle-container">
              <div
                className="circle"
                style={{
                  backgroundColor: ratingColor(property.i_rating),
                }}
              >
                {Math.round(property.i_rating * 100) / 10}
              </div>
            </div>
            <Row className="justify-content-center" style={{fontSize: '12px', margin: 0}}>{ratingDescription('income', property.i_rating)}</Row>
          </Col>
          <Col style={{backgroundColor: ratingBackgroundColor(property.d_rating)}}>
            <Row className="justify-content-center"><b>Diversity</b></Row>
            <div className="circle-container">
              <div
                className="circle"
                style={{
                  backgroundColor: ratingColor(property.d_rating),
                }}
              >
                {Math.round(property.d_rating * 100) / 10}
              </div>
            </div>
            <Row className="justify-content-center" style={{fontSize: '12px', margin: 0}}>{ratingDescription('diversity', property.d_rating)}</Row>
          </Col>
        </Row>
        <div>
        <Row style={{margin: '-4px 0 0 0', position: 'absolute', color: '#888', width: '100%'}}>
          {/* <Col style={{padding: 0, fontSize: '12px'}}>
            Compared to City
          </Col> */}
          <Col style={{padding: 0, fontSize: '12px'}}>
            *Compared to the Cuyahoga County average.
          </Col>
        </Row>
        </div>
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
                  Transfer Price: <span style={{ fontWeight: 'bold' }}> {property.SALES_AMOU === 0 ? 'No Information' : `$${property.SALES_AMOU}`} </span>
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
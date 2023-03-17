import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilterTools from '../components/FilterTools';
import SortTools from '../components/SortTools';
import PropertyCardGrid from "../components/PropertyCardGrid";

function BrowsPageLayout() {
const properties = [
    {
      "parcelpin": "01010102",
      "full_address": "11408 LAKE AVE, CLEVELAND, OH, 44102",
      "price": 525000,
      "bedroom": 4,
      "bathroom": 2,
      "square_ft": 1300,
      "county_price_rating": 0.6,
      "city_price_rating": 0.5,
      "total_tract_population": 613,
      "white": 0.435,
      "black": 0.289,
      "indigenous": 0.002,
      "asian": 0.241,
      "pacific": 0.001,
      "multirace": 0.032,
      "hispanic": 0.087,
      "score_adjusted": 0.9314598572639,
      "total_crimes": 95,
      "city_population": 17000,
      "crime_ratio": 0.0055,
      "school_rating": 4,
      "indsutry1": "education",
      "indsutry2": "government",
      "indsutry3": "real estate",
      "indsutry4": "insurance",
      "indsutry5": "retail"
    },
    {
      "parcelpin": "01010103",
      "full_address": "11410 LAKE AVE, CLEVELAND, OH, 44102",
      "price": 475000,
      "bedroom": 2,
      "bathroom": 1,
      "square_ft": 1000,
      "county_price_rating": 0.8,
      "city_price_rating": 0.7,
      "total_tract_population": 550,
      "white": 0.55,
      "black": 0.2,
      "indigenous": 0.003,
      "asian": 0.23,
      "pacific": 0.001,
      "multirace": 0.017,
      "hispanic": 0.11,
      "score_adjusted": 0.9429119598572639,
      "total_crimes": 70,
      "city_population": 13500,
      "crime_ratio": 0.0052,
      "school_rating": 3,
      "indsutry1": "transportation",
      "indsutry2": "construction",
      "indsutry3": "hospitality",
      "indsutry4": "technology",
      "indsutry5": "manufacturing"
    },
    {
      "parcelpin": "01010104",
      "full_address": "11412 LAKE AVE, CLEVELAND, OH, 44102",
      "price": 600000,
      "bedroom": 3,
      "bathroom": 3,
      "square_ft": 1700,
      "county_price_rating": 0.9,
      "city_price_rating": 0.8,
      "total_tract_population": 750,
      "white": 0.65,
      "black": 0.15,
      "indigenous": 0.001,
      "asian": 0.18,
      "pacific": 0.001,
      "multirace": 0.015,
      "hispanic": 0.12,
      "score_adjusted": 0.9520111111,
      "total_crimes": 60,
      "city_population": 15000,
      "crime_ratio": 0.004,
      "school_rating": 5,
      "indsutry1": "healthcare",
      "indsutry2": "finance",
      "indsutry3": "legal",
      "indsutry4": "energy",
      "indsutry5": "agriculture"
    },
    {
      "parcelpin": "01010105",
      "full_address": "11414 LAKE AVE, CLEVELAND, OH, 44102",
      "price": 450000,
      "bedroom": 1,
      "bathroom": 1,
      "square_ft": 800,
      "county_price_rating": 0.5,
      "city_price_rating": 0.4,
      "total_tract_population": 400,
      "white": 0.4,
      "black": 0.3,
      "indigenous": 0.002,
      "asian": 0.15,
      "pacific": 0.001,
      "multirace": 0.125,
      "hispanic": 0.025,
      "score_adjusted": 0.8554823629,
      "total_crimes": 120,
      "city_population": 12000,
      "crime_ratio": 0.01,
      "school_rating": 2,
      "indsutry1": "entertainment",
      "indsutry2": "food services",
      "indsutry3": "tourism",
      "indsutry4": "marketing",
      "indsutry5": "art"
    }
  ]

  return (
    <Container fluid='true'>
      <Row>
        <FilterTools />
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <SortTools />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Property Listings</h1>
              <PropertyCardGrid properties={properties} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BrowsPageLayout;
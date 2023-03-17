import Card from 'react-bootstrap/Card';

function PropertyCard({ property }) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{property.full_address}</Card.Title>
                <Card.Text>
                    Price: ${property.price}<br />
                    Bedrooms: {property.bedroom}<br />
                    Bathrooms: {property.bathroom}<br />
                    Square feet: {property.square_ft}<br />
                    Price Rating (County): {property.county_price_rating}<br />
                    Price Rating (City): {property.city_price_rating}<br />
                    Block Population: {property.total_tract_population}<br />
                    White Percentage: {Math.round(property.white*100)}%<br />
                    Black Percentage: {Math.round(property.black*100)}%<br />
                    Asian Percentage: {Math.round(property.asian*100)}%<br />
                    Indigenous Percentage: {(property.indigenous*100).toFixed(1)}%<br />
                    Mulitrace Percentage: {Math.round(property.multirace*100)}%<br />
                    Hispanic Percentage: {Math.round(property.hispanic*100)}%<br />
                    Pacific Percentage: {(property.pacific*100).toFixed(1)}%<br />
                    Diversity Score: {Math.round(property.score_adjusted*100)}%<br />
                    total_crimes: {property.total_crimes}<br />
                    city_population: {property.city_population}<br />
                    crime_ratio: {Math.round(property.crime_ratio*100)}<br />
                    Indsutry1: {property.indsutry1}<br />
                    indsutry2: {property.indsutry2}<br />
                    indsutry3: {property.indsutry3}<br />
                    indsutry4: {property.indsutry4}<br />
                    indsutry5: {property.indsutry5}<br />
                    

                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PropertyCard;
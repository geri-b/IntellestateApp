import PropertyCard from './PropertyCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function PropertyCardGrid({ properties }) {

    return (
        <div>
            {properties.map(property => (
                <Row key={property.parcelpin}>
                    <Col>
                        <PropertyCard property={property} />
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default PropertyCardGrid;
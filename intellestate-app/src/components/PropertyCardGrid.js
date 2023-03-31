import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function PropertyCardGrid({ properties }) {
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleHeaderClick = (property) => {
        if (selectedProperty === property.PARCELPIN) {
            setSelectedProperty(null);
        } else {
            setSelectedProperty(property.PARCELPIN);
        }
    };

    const handleBodyClick = (property) => {
        if (selectedProperty === property.PARCELPIN) {
            setSelectedProperty(null);
        } else {
            setSelectedProperty(property.PARCELPIN);
        }
    };

    const handleButtonClick = (property) => {
        // Your logic for handling button click
    };
    return (
        <div>
            {properties.map(property => (
                <Col key={property.PARCELPIN} className='my-2'>
                        <PropertyCard 
                            property={{ ...property, showExtraInfo: selectedProperty === property.PARCELPIN }}
                            onHeaderClick={handleHeaderClick}
                            onBodyClick={handleBodyClick}
                            onButtonClick={handleButtonClick}
                        />
                </Col>
            ))}
        </div>
    );
}

export default PropertyCardGrid;
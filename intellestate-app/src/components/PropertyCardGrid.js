import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function PropertyCardGrid({ properties }) {
    const [selectedProperty, setSelectedProperty] = useState([]);

    const handleHeaderClick = (property) => {
        if (selectedProperty.includes(property.PARCELPIN)) {
            let p_index = selectedProperty.indexOf(property.PARCELPIN);
            setSelectedProperty(selectedProperty.slice(0, p_index).concat(selectedProperty.slice(p_index+ 1, selectedProperty.length)));
        } else {
            setSelectedProperty(selectedProperty.concat([property.PARCELPIN]));
        }
    };

    const handleBodyClick = (property) => {
        if (selectedProperty.includes(property.PARCELPIN)) {
            setSelectedProperty([]);
        } else {
            setSelectedProperty([property.PARCELPIN]);
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
                            property={{ ...property, showExtraInfo: selectedProperty.includes(property.PARCELPIN) }}
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
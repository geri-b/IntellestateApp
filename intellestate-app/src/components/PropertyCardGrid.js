import PropertyCard from './PropertyCard';
import Col from 'react-bootstrap/Col';



function PropertyCardGrid({ properties, openedProperties, setOpenedProperties, showDetails }) {

    const handleHeaderClick = (property) => {
        showDetails(property);
        if (openedProperties.includes(property.PARCELPIN)) {
            let p_index = openedProperties.indexOf(property.PARCELPIN);
            setOpenedProperties(openedProperties.slice(0, p_index).concat(openedProperties.slice(p_index+ 1, openedProperties.length)));
        } else {
            setOpenedProperties(openedProperties.concat([property.PARCELPIN]));
        }
    };

    const handleBodyClick = (property) => {
        if (openedProperties.includes(property.PARCELPIN)) {
            let p_index = openedProperties.indexOf(property.PARCELPIN);
            setOpenedProperties(openedProperties.slice(0, p_index).concat(openedProperties.slice(p_index+ 1, openedProperties.length)));
        } else {
            setOpenedProperties(openedProperties.concat([property.PARCELPIN]));
        }
    };

    const handleButtonClick = (property) => {
        showDetails(property);
    };

    // Handling duplicates
    
    return (
        <div>
            {properties.map(property => (
                <Col key={property.PARCELPIN} className='my-2'>
                        <PropertyCard 
                            property={{ ...property, showExtraInfo: openedProperties.includes(property.PARCELPIN) }}
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
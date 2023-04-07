import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CitySearchBox from './filterToolComponents/CitySearchBox';
import ZipcodeSearchBox from './filterToolComponents/ZipcodeSearchBox';
import StreetNameSearchBox from './filterToolComponents/StreetNameSearchBox';
import ConfirmSearchButton from './filterToolComponents/ConfirmSearchButton';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import '../App.css';
import StreetNumBox from './filterToolComponents/StreetNumberBox';
import SuffixSearchBox from './filterToolComponents/SuffixSearchBox';

function HomepageToolsFilter(props, ref) {
    //City Search Hooks
    const [cityName, setCityName] = useState('');

    const handleCityNameChange = (e) => {
        setCityName(e.target.value);
        props.setResetData(true);
    };

    //Zipcode search hooks
    const [zipcodeName, setzipcodeName] = useState('');

    const handlezipcodeNameChange = (e) => {
        setzipcodeName(e.target.value);
        props.setResetData(true);
    };
    //Street search hooks
    const [streetName, setstreetName] = useState('');

    const handlestreetNameChange = (e) => {
        setstreetName(e.target.value);
        props.setResetData(true);
    };
    // StreetNum search hooks
    const [streetNum, setStreetNum] = useState('');

    const handlestreetNumChange = (e) => {
        setStreetNum(e.target.value);
        props.setResetData(true);
    };
    // Suffux Search hooks
    const [suffixName, setSuffixName] = useState('');

    const handlesSuffixfNameChange = (e) => {
        setSuffixName(e.target.value);
        props.setResetData(true);
    };

    //Post to Server
    const handleSubmit = async (page = 1) => {
        props.setSearchInProgress(true); // Set the searchInProgress flag to true when search is initiated
        const requestBody = {
            city: cityName,
            ZIPCODE: zipcodeName,
            streetNum: streetNum,
            suffixName: suffixName,
            STREET: streetName,
        };

        try {
            const response = await fetch("http://localhost:3001/searchHP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            props.onDataUpdate(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Container className="filters-container p-3 rounded">
            <h2 className="my-4 text-center">Find a Property</h2>
            <Card className="mb-3">
                <Card.Header>Location Filters</Card.Header>
                <Card.Body>
                    <Row className="my-2">
                        <Col xs={12} className="my-2">
                            <CitySearchBox cityName={cityName} onCityNameChange={handleCityNameChange} />
                        </Col>
                        <Col xs={12} className="my-2">
                            <ZipcodeSearchBox zipcodeName={zipcodeName} onzipcodeNameChange={handlezipcodeNameChange} />
                        </Col>
                        <Col xs={12} className="my-2">
                            <StreetNameSearchBox streetName={streetName} onstreetNameChange={handlestreetNameChange} />
                        </Col>
                        <Col xs={12} className="my-2">
                            <StreetNumBox streetNum={streetNum} onStreetNumChange={handlestreetNumChange} />
                        </Col>
                        <Col xs={12} className="my-2">
                            <SuffixSearchBox suffixName={suffixName} onsuffixNameChange={handlesSuffixfNameChange} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Row className='justify-content-center my-3'>
                <ConfirmSearchButton
                    onSearchClick={() => { handleSubmit(1); }}
                    searchInProgress={props.searchInProgress}
                />
            </Row>
        </Container>
    );
}

export default HomepageToolsFilter;

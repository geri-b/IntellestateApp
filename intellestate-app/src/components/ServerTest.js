import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

function ServerTest() {
    const [data, setData] = useState([]);
    const [filterValue, setFilterValue] = useState(); // default filter value

    useEffect(() => {
        fetch('http://localhost:3001/income_rating')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    }
    return (
        <div>
            <h1>My View</h1>
            <Form>
                <Form.Group controlId="formFilter">
                    <Form.Label>Filter by Percent High:</Form.Label>
                    <Form.Control type="number" value={filterValue} onChange={handleFilterChange}/>
                </Form.Group>
            </Form>
            {data.filter(row => row.parcelpin === filterValue).map(row => (
                <div key={row.parcelpin}>
                    <p>Parcelpin: {row.parcelpin}</p>
                    <p>county: {row.county}</p>
                    <p>City: {row.city}</p>
                    <p>price: {row.price}</p>
                </div>
            ))}
        </div>
    );
}

export default ServerTest;
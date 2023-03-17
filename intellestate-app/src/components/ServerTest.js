import { useState, useEffect } from 'react';

function ServerTest() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/income_rating')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <h1>My View</h1>
            {data.map(row => (
                <div key={row.tract}>
                    <p>Tract: {row.tract}</p>
                    <p>Total: {row.total}</p>
                    <p>Percent Low: {row.percent_low}</p>
                    <p>Percent Med: {row.percent_med}</p>
                    <p>Percent High: {row.percent_high}</p>
                    <p>Score: {row.score}</p>
                </div>
            ))}
        </div>
    );
}

export default ServerTest;
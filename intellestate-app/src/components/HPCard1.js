import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HPCard1({changePage}) {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Business Hotspot Analysis</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          Allowing you to gain insights into where different types of bussineses are prominent in Cuyahoga County.
        </Card.Text>
        <Button variant="primary" onClick={changePage}>Explore</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard1;
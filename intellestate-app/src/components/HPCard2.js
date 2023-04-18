import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HPCard2({changePage}) {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Property Recommendation</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          Advanced algorithms to provide intelligent real estate 
          recommendations based on your preferences.
        </Card.Text>
        <Button variant="primary" onClick={changePage}>Browse</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard2;
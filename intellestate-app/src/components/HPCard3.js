import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HPCard3({changePage}) {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Food Desert Identifier</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          With detailed insights and analytics, we help you better understand food insecurity in your community.
        </Card.Text>
        <Button variant="primary" onClick={changePage}>Find out</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard3;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BrowsePageLayout from '../layout/BrowsPageLayout';

function HPCard3() {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Food Desert Identifier</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          With detailed insights and analytics, we help you better understand food insecurity in your community.
        </Card.Text>
        <Button variant="primary" onClick={() => window.location.href = '/BrowsePageLayout'}>Find out</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard3;
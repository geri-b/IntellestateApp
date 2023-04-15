import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BrowsePageLayout from '../layout/BrowsPageLayout';

function HPCard2() {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Property Recommendation</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          Advanced algorithms to provide intelligent real estate 
          recommendations based on your preferences.
        </Card.Text>
        <Button variant="primary" onClick={() => window.location.href = '/BrowsePageLayout'}>Browse</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard2;
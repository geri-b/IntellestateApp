import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BrowsePageLayout from '../layout/BrowsPageLayout';

function HPCard1() {
  return (
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>Business Hotspot Analysis</Card.Title>
        <Card.Text style={{ fontStyle: "italic" }}>
          Allowing you to gain insights into where different types of bussineses are prominent in Cuyahoga County.
        </Card.Text>
        <Button variant="primary" onClick={() => window.location.href = '/BrowsePageLayout'}>Explore</Button>
      </Card.Body>
    </Card>
  );
}

export default HPCard1;
import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar() {
  return (
    <Form inline style={{
      position: 'static',
      top: '50%',
      left: '50%',
      zIndex: '1',
      width: '400px'
    }}>
      <FormControl type="text" placeholder="Enter an address, or zipcode" className="mr-sm-2"/>
        <Button variant="outline-info" className="my-2">Search</Button>
    </Form >
  );
}

export default SearchBar;

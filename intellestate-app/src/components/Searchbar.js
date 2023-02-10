import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar() {
  return (
    <Form inline>
      <FormControl type="text" placeholder="Enter an address, or zipcode" className="mr-sm-2"/>
        <Button variant="outline-info">Search</Button>
    </Form>
  );
}

export default SearchBar;

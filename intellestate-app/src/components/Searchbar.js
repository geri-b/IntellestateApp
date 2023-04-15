import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar() {
  return (
    <Form style={{
      position: 'static',
      top: '50%',
      left: '50%',
      zIndex: '1',
      width: '500px'
    }}>
      <FormControl type="text" placeholder="Enter an address or zipcode" className="mr-sm-2" style={{height: '40px'}}/>
        <Button variant="outline-info" className="my-2" style= {{ background: "rgb(255,255,255,2)" }}>Search</Button>
    </Form >
  );
}

export default SearchBar;

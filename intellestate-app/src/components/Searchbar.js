import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function SearchBar(props) {

  return (
    <Form style={{
      position: 'static',
      top: '50%',
      left: '50%',
      zIndex: '1',
      width: '500px'
    }}>
      <FormControl 
        type="text" 
        placeholder="Enter a City" 
        className="mr-sm-2" 
        style={{ height: '40px' }}
        value={props.cityName}
        onChange={props.onCityNameChange}
      />
      <Button variant="outline-info" className="my-2" style={{ background: "rgb(255,255,255,2)" }} onClick={props.changePage}>Search</Button>
    </Form >
  );
}

export default SearchBar;

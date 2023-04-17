import Button from 'react-bootstrap/Button';

function ConfirmSearchButton({onSearchClick, searchInProgress}) {


  return (
    <>
      <Button 
        style={{width: '100%'}} 
        variant="primary" 
        onClick={onSearchClick}
        disabled={searchInProgress} // Disable the button when search is in progress
        >
          {searchInProgress ? "Searching..." : "Search"}
      </Button>{''}
    </>
  );
}

export default ConfirmSearchButton;
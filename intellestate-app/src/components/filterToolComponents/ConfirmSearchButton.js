import Button from 'react-bootstrap/Button';

function ConfirmSearchButton({onSearchClick}) {


  return (
    <>
      <Button style={{maxWidth: '200px'}} variant="primary" onClick={onSearchClick}>Search</Button>{''}
    </>
  );
}

export default ConfirmSearchButton;
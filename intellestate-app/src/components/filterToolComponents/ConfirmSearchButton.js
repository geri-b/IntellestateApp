import Button from 'react-bootstrap/Button';

function ConfirmSearchButton({onSearchClick}) {


  return (
    <>
      <Button variant="primary" onClick={onSearchClick}>Search</Button>{''}
    </>
  );
}

export default ConfirmSearchButton;
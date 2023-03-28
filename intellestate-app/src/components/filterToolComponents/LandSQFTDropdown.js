import { useState } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';


function LandSQFTDropdown() {
    //Price Range Hooks
    const [minSQFT, setminSQFT] = useState('');
    const [maxSQFT, setmaxSQFT] = useState('');




    const handleLandminSQFTChange = (event) => {
        setminSQFT(event.target.value);
    };


    const handleLandmaxSQFTChange = (event) => {
        setmaxSQFT(event.target.value);
    };


    const handleApplyClick = () => {
        // Do something with the min and max price values
        console.log(`Selected price range: ${minSQFT} - ${maxSQFT}`);
    };


    return (
        <DropdownButton
            id="land-sqft-dropdown-button"
            title="Land Square Footage"
        >
            <div className="m-2">
                <label htmlFor="min-price-input" className="form-label">
                    Min Square Footage:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="min-sqft-input"
                    placeholder="Enter min SQFT"
                    value={minSQFT}
                    onChange={handleLandminSQFTChange}
                />
            </div>
            <div className="m-2">
                <label htmlFor="max-sqft-input" className="form-label">
                    Max Square Footage:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="max-sqft-input"
                    placeholder="Enter max SQFT"
                    value={maxSQFT}
                    onChange={handleLandmaxSQFTChange}
                />
            </div>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleApplyClick}>Apply</Dropdown.Item>
        </DropdownButton>
    );
}


export default LandSQFTDropdown


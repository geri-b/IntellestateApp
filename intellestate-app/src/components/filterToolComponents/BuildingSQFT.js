import { useState } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';

function BuildingSQFT() {
    //Price Range Hooks
    const [minSQFT, setminSQFT] = useState('');
    const [maxSQFT, setmaxSQFT] = useState('');


    const handleminSQFTChange = (event) => {
        setminSQFT(event.target.value);
    };

    const handlemaxSQFTChange = (event) => {
        setmaxSQFT(event.target.value);
    };

    const handleApplyClick = () => {
        // Do something with the min and max price values
        console.log(`Selected price range: ${minSQFT} - ${maxSQFT}`);
    };

    return (
        <DropdownButton
            id="building-sqft-dropdown-button"
            title="Building Square Footage"
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
                    onChange={handleminSQFTChange}
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
                    onChange={handlemaxSQFTChange}
                />
            </div>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleApplyClick}>Apply</Dropdown.Item>
        </DropdownButton>
    );
}

export default BuildingSQFT
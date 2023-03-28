import { useState } from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';

function PriceRangeDropdown() {
    //Price Range Hooks
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleApplyClick = () => {
        // Do something with the min and max price values
        console.log(`Selected price range: ${minPrice} - ${maxPrice}`);
    };

    return (
        <DropdownButton
            id="price-range-dropdown-button"
            title="Select Price Range"
        >
            <div className="m-2">
                <label htmlFor="min-price-input" className="form-label">
                    Min Price:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="min-price-input"
                    placeholder="Enter min price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="m-2">
                <label htmlFor="max-price-input" className="form-label">
                    Max Price:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="max-price-input"
                    placeholder="Enter max price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </div>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleApplyClick}>Apply</Dropdown.Item>
        </DropdownButton>
    );
}

export default PriceRangeDropdown
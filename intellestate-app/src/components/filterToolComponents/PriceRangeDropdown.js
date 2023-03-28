
import { DropdownButton, Dropdown} from 'react-bootstrap';

function PriceRangeDropdown({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, onApplyClick }) {

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
                    onChange={onMinPriceChange}
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
                    onChange={onMaxPriceChange}
                />
            </div>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onApplyClick}>Apply</Dropdown.Item>
        </DropdownButton>
    );
}

export default PriceRangeDropdown
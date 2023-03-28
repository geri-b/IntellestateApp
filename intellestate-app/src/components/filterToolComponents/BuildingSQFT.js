import { DropdownButton, Dropdown } from 'react-bootstrap';

function BuildingSQFT({ minSQFT, maxSQFT, onMinSQFTChange, onMaxSQFTChange, onApplyClick }) {

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
                    onChange={onMinSQFTChange}
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
                    onChange={onMaxSQFTChange}
                />
            </div>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onApplyClick}>Apply</Dropdown.Item>
        </DropdownButton>
    );
}

export default BuildingSQFT
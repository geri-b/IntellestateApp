
import { DropdownButton, Dropdown, Row} from 'react-bootstrap';

function PriceRangeDropdown({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, onApplyClick }) {

    return (
        <Row style={{display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: 'min-content auto auto', gap: '5px', padding: '0 1rem', alignItems: 'center'}}>
                <div style={{whiteSpace: 'nowrap', padding: 0, display: 'grid', alignContent: 'center', width: '105px', justifyContent: 'left'}}>
                    Property Price
                </div>
                <input
                    type="number"
                    className="form-control"
                    id="min-price-input"
                    placeholder="Min"
                    value={minPrice}
                    onChange={onMinPriceChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
                -
                <input
                    type="number"
                    className="form-control"
                    id="max-price-input"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={onMaxPriceChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
        </Row>
    );
}

export default PriceRangeDropdown
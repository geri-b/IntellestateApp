import {Row} from 'react-bootstrap';

function BuildingSQFT({ minSQFT, maxSQFT, onMinSQFTChange, onMaxSQFTChange}) {

    return (
        <Row style={{display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: 'min-content auto auto', gap: '5px', padding: '0 1rem', alignItems: 'center'}}>
                <div style={{whiteSpace: 'nowrap', padding: 0, display: 'grid', alignContent: 'center', width: '105px', justifyContent: 'left'}}>
                    Building SQFT
                </div>
                <input
                    type="number"
                    className="form-control"
                    id="min-bsqft-input"
                    placeholder="Min"
                    value={minSQFT}
                    onChange={onMinSQFTChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
                -
                <input
                    type="number"
                    className="form-control"
                    id="max-bsqft-input"
                    placeholder="Max"
                    value={maxSQFT}
                    onChange={onMaxSQFTChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
        </Row>
    );
}

export default BuildingSQFT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function LandSQFTDropdown({ minSQFT, maxSQFT, onMinSQFTChange, onMaxSQFTChange}) {
  return (
    <Row style={{display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: 'min-content auto auto', gap: '5px', padding: '0 1rem', alignItems: 'center'}}>
                <div style={{whiteSpace: 'nowrap', padding: 0, display: 'grid', alignContent: 'center', width: '105px', justifyContent: 'left'}}>
                    Land SQFT
                </div>
                <input
                    type="number"
                    className="form-control"
                    id="min-lsqft-input"
                    placeholder="Min"
                    value={minSQFT}
                    onChange={onMinSQFTChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
                -
                <input
                    type="number"
                    className="form-control"
                    id="max-lsqft-input"
                    placeholder="Max"
                    value={maxSQFT}
                    onChange={onMaxSQFTChange}
                    style={{padding: '3px 8px', MozAppearance: 'textfield', textAlign: 'center'}}
                />
        </Row>
  );
}

export default LandSQFTDropdown;



// import { DropdownButton, Dropdown, Form} from 'react-bootstrap/Form';


// function LandSQFTDropdown({ minSQFT, maxSQFT, onMinSQFTChange, onMaxSQFTChange, onApplyClick }) {

//     return (
//         // <DropdownButton
//         //     id="land-sqft-dropdown-button"
//         //     title="Land Square Footage"
//         // >
//             <div className="m-2">
//                 <label htmlFor="min-price-input" className="form-label">
//                     Min Square Footage:
//                 </label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     id="min-sqft-input"
//                     placeholder="Enter min SQFT"
//                     value={minSQFT}
//                     onChange={onMinSQFTChange}
//                 />
//             </div>
//             <div className="m-2">
//                 <label htmlFor="max-sqft-input" className="form-label">
//                     Max Square Footage:
//                 </label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     id="max-sqft-input"
//                     placeholder="Enter max SQFT"
//                     value={maxSQFT}
//                     onChange={onMaxSQFTChange}
//                 />
//             </div>
//             // <Dropdown.Divider />
//             /* <Dropdown.Item onClick={onApplyClick}>Apply</Dropdown.Item> */
//         // </DropdownButton>
//     );
// }


// export default LandSQFTDropdown


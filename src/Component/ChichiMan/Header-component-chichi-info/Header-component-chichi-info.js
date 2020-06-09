import React, {Component} from 'react';
import {CardBody} from "reactstrap";

class HeaderComponentChichiInfo extends Component {
    render() {
        return (
            <div className='d-flex justify-content-start align-items-center  grayPurpulColor fs-2vw w-100' dir='rtl'   >
                <h3 className='glyph-icon iconsminds-arrow-left-in-circle ml-2 fs-2vw'/>
                <h3 className=" fs-2vw">
                    {this.props.header}
                </h3>
            </div>
        );
    }
}

export default HeaderComponentChichiInfo;
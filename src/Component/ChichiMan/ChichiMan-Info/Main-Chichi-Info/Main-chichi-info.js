import React, {Component} from 'react';
 import ChichiManInfoCard from "./sub/ChichiManInfoCard/ChichiManInfoCard";

class MainChichiInfo extends Component {
    render() {
        return (
            <div className='d-flex w-100'>
                <div className='col-4'>
                    <ChichiManInfoCard id={1}/>
                </div>
                <div className='col-4'>
                    <ChichiManInfoCard id={2}/>
                </div>
                <div className='col-4'>
                    <ChichiManInfoCard id={3}/>
                </div>
            </div>
        );
    }
}

export default MainChichiInfo;
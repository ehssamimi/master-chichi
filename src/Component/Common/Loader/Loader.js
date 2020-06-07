import React, {Component} from 'react';
import loader from "../../../assets/img/loader.svg";
import {Row} from "reactstrap";
import {Colxx} from "../../../components/common/CustomBootstrap";

class Loader extends Component {
    render() {
        return (
            <Row xxs="12" className="pl-0 pr-0 mb-5    ">
                <Colxx xxs="12 d-flex justify-content-center align-items-center">
                    <div className='col-6   '>
                        <img src={loader} alt='loader ' className='img-self-fill'/>
                    </div>
                </Colxx>
            </Row>

            // <div className='detail-section-2 z-2 w-100 d-flex justify-content-center align-items-center  '  >
            //     <div className='col-6   '>
            //         <img src={loader} alt='loader ' className='img-self-fill'/>
            //     </div>
            // </div>
        );
    }
}

export default Loader;
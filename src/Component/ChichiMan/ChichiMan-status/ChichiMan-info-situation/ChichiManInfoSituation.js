import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
  import HeaderComponentChichiInfo from "../../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiManInfoSituation extends Component {
    constructor(props) {
        super(props);
        this.state={
            subRow:{
                Situations:{'header':"وضعیت ها",'sub':{'ارتباط با سرور':'بلی','در صف بودن یا نبودن':"بلی",' نوبت صف':"22",'درصد شارژ باتری':"30%",'موقعیت یاب':'روشن'}},
            }
        }
    }

    render() {
        let{subRow}=this.state;
        return (
            <div>
                <Card>
                    <CardBody>
                        <HeaderComponentChichiInfo header="وضعیت ها"/>
                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                            <CollapseRow store={subRow.Situations}/>
                          </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfoSituation;
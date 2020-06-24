import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
import ChichiManInfoCollapseWithImage from "./ChichiMan-info-collapse-with-image/ChichiMan-info-collapse-with-image";
 import HeaderComponentChichiInfo from "../../ChichiMan-Info/Header-component-chichi-info/Header-component-chichi-info";
import {ChichiManIfoDetail} from './../../../functions/ServerConnection'
 import ChichimanInfoCollapseWithoutImg from "./ChichiMan-info-collapse-without-img/ChichimanInfoCollapseWithoutImg";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";
import Loader from "../../../Common/Loader/Loader";

class ChichiManInfoSubmitInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            subRow:{},
            id:''
        }
    }
    async componentDidMount(){
        const {match: {params}} = this.props;
         let subRow=await ChichiManIfoDetail(params.userId);
            this.setState({
            subRow,id:params.userId
        });
     }

    render() {
        let{subRow,id}=this.state;
        return (
            <div>

                {
                    Object.entries(subRow).length!==0?
                        <Card>
                            <CardBody>
                                <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                                    <HeaderComponentChichiInfo header="اطلاعات ثبت نام"/>
                                    <CollapseRow store={subRow.Identify} col={'col-6'}/>
                                    <ChichiManInfoCollapseWithImage store={subRow.PersonalInfo} col={'col-6'} id={id} step={'step3'}
                                                                    image={[subRow['PersonalInfo']['Images']['Profile'], subRow['PersonalInfo']['Images']['SERIAL_IMAGE'], subRow['PersonalInfo']['Images']['SSN_IMAGE']]}
                                                                    label={['عکس پرسنلی','تصویر شناسنامه' ,'تصویر کارت ملی' ]}
                                                                    className='col-4'/>
                                    <ChichiManInfoCollapseWithImage store={subRow.vehicle} col={'col-6'} id={id} step={'step4'}
                                                                    image={[subRow['vehicle']['images']['LicenseImage'], subRow['vehicle']['images']['VehicleCardImage']]}
                                                                    label={[ 'تصویر گواهی نامه ','تصویر کارت وسیله نقلیه']}
                                                                    className='col-6'/>
                                    <ChichiManInfoCollapseWithImage store={subRow.contract} col={'col-4'} id={id} step={'step5'}
                                                                    image={[subRow['contract']['images']['contract'], subRow['contract']['images']['soePishine'],subRow['contract']['images']['safteh']]}
                                                                    label={['تصویر قرارداد' ,'تصویر گواهی سو پیشینه' ,'تصویر سفته']}
                                                                    className='col-4'/>

                                    <ChichimanInfoCollapseWithoutImg  store={subRow.BankInfo} col={'col-6'} id={id} step={'step6'} />

                                </div>
                            </CardBody>
                        </Card>:<div className='col-6 offset-3 '><Loader/></div>
                }

            </div>
        );
    }
}

export default ChichiManInfoSubmitInfo;
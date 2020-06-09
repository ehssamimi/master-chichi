import React, {Component} from 'react';
import Doughnut from "../../../../components/charts/Doughnut";
import { ThemeColors } from '../../../../helpers/ThemeColors'
 import HeaderComponentChichiInfo from "../../Header-component-chichi-info/Header-component-chichi-info";
import {Card, CardBody} from "reactstrap";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

 const colors = ThemeColors();

// ************chichiMan vote emoji*************
const doughnutChartData={
    labels: ['خیلی بد', 'بد', 'متوسط','خوب', 'خیلی خوب' ],
    datasets: [
        {
            label: '',
            borderColor: ["#2a93d5", "#ad8c1b", "#c43d4b", "#104978", "#5a5a5a"],
            backgroundColor: [
                "rgba(42, 147, 213, 0.1)",
                "rgba(173, 140, 23, 0.1)",
                "rgba(196, 61, 75, 0.1)",
                "rgba(16, 73, 120, 0.1)",
                "rgba(90, 90, 90, 0.1)",
            ],
            borderWidth: 2,
            data: [10, 5, 20 ,25, 20 ]
        }
    ],
};


class ChichiManInfoVoteChichiManToUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            subRow:{
                // ***************chichi comment to store and customer**************
                Situations:[{'header':"IR3020215",'sub':{'انبارداری':'اطلاعاتی ثبت نشد','مشتری':"اطلاعاتی ثبت نشد" }},{'header':"IR3020215",'sub':{'انبارداری':'اطلاعاتی ثبت نشد','مشتری':"اطلاعاتی ثبت نشد" }},]

            }
        }
    }


    render() {
        let{subRow}=this.state;
        return (
            <Card>
                <CardBody>
                    <div className='d-flex flex-column h-100'>
                        <HeaderComponentChichiInfo header="نظرسنجی چی چی من به کاربر"/>
                        <div className='w-100 d-flex '>
                            {/*******piechart*****/}
                            <div className="col-6 chart-container">
                                <Doughnut shadow data={doughnutChartData}/>
                            </div>
                            {/*******right information about vote chichi to store and customer */}
                            <div className=' col-6 d-flex flex-wrap justify-content-start' dir='rtl'>
                                {
                                    subRow.Situations.length>0?subRow.Situations.map((item,index)=> <CollapseRow store={item} col='col-12' index={index} />):''
                                }
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>

        );
    }
}

export default ChichiManInfoVoteChichiManToUser;
import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";

import CollapseCheckoutRow from "./Collapse-Checkout-row/CollapseCheckoutRow";
import ax from'./../../../../assets/img/4th-1.jpg'
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";

class ChichiManInfoCheckOut extends Component {
    constructor(props) {
        super(props);
        this.state={

            subRow:{
                MonthPay:{'header':"تسویه حساب حقوق ثابت ",'sub':{'مبلغ':'1,300,500','تاریخ پرداخت':'18/9/98','ساعت پرداخت ':"21:45",'مسئول پرداخت':"اقای احمد ذوقی",'بابت ماه':"آبان" }},
                PercentPay:{'header':"تسویه حساب درصد",'sub':{'درصد':'70%','مبلغ کل هزینه پیک':'1,300,500','مبلغ':"5,000,000",'تاریخ پرداخت':"18/9/98",'ساعت پرداخت':'21:45','مسئول پرداخت':"اقای احمد ذوقی",'بابت ماه':"آبان" }},
             }

        }
    }
    componentDidMount(){



    }
    render() {
        let{Keys,Items,subRow}=this.state;
        return (
            <div>
                <Card>
                    <CardBody>
                        <HeaderComponentChichiInfo header="تسویه حساب"/>
                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                         <CollapseCheckoutRow store={subRow.MonthPay} ax={ax} label={"نوع پرداخت"} value={"آنلاین"}/>
                         <CollapseCheckoutRow store={subRow.PercentPay} ax={ax} label={"نوع پرداخت"} value={"فیش واریزی"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfoCheckOut;
import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiManInfoSituation extends Component {
    constructor(props) {
        super(props);
        this.state={
            Items:{'شماره سفارش':'IR32513','نام و نام خانوادگی':'هوشنک ابتهاج'  ,'ساعت سفر':'16:08:21'  ,   'وضعیت سفر':'انتظار بسته برای پیک'  ,'آدرس':"زحل، قمر کویینتزار، شهر نیگارا، میدان سیزارتا، کوچه دالی، پلا 13"
            },
            subRow:{
                Situations:{'header':"وضعیت ها",'sub':{'ارتباط با سرور':'بلی','در صف بودن یا نبودن':"بلی",' نوبت صف':"22",'درصد شارژ باتری':"30%",'موقعیت یاب':'ساری، میدان امام، حیابان آزادی، جنب فروشگاه رفاه'}},

            }
        }
    }
    componentDidMount(){

        let {Items} = this.state;
        let Keys;
        Keys=Object.keys(Items);
        this.setState({
            Keys
        },()=>{
            console.log(this.state.Keys);

        });

    }
    render() {
        let{Keys,Items,subRow}=this.state;
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
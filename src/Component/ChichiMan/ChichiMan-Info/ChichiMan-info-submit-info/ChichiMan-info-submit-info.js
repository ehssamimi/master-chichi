import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
 import ChichiManInfoCollapseWithImage from "./ChichiMan-info-collapse-with-image/ChichiMan-info-collapse-with-image";
import ax from './../../../../assets/img/4th-1.jpg'
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiManInfoSubmitInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            Items:{'شماره سفارش':'IR32513','نام و نام خانوادگی':'هوشنک ابتهاج'  ,'ساعت سفر':'16:08:21'  ,   'وضعیت سفر':'انتظار بسته برای پیک'  ,'آدرس':"زحل، قمر کویینتزار، شهر نیگارا، میدان سیزارتا، کوچه دالی، پلا 13"
            },
            subRow:{
                Identify:{'header':"اهراز هویت ",'sub':{'شماره موبایل':'09112561701','کد 4 رقمی اهراز هویت ':'1234' }},
                PersonalInfo:{'header':"اطلاعات شخصی",'sub':{'نام و نام خانوادگی':'احسان صمیمی راد','شماره تماس منزل':'011-333652929','شماره شناسنامه':"85644",'شماره ملی':"20922024971",'آدرس':'ساری، میدان امام ، کوی پاسدار ، کوچه سوم پلاک116' }},
                vehicle:{'header':"اطلاعات وسیله نقلیه",'sub':{"شماره گواهینامه":'4','نام وسیله نقلیه':'چی چی نقلیه','شماره پلاک':"116 ",'شماره کارت وسیله نقیله':"IR-32-5354" }},
                contact:{'header':"مستندات قرارداد",'sub':{"تاریخ شروع":'98-8-12','تاریخ پایان':'98-8-10','شماره نامه/فرم':"12-89-98 ",'شماره پیوست':"IR-32-5354" ,'حقوق ثابت':"1,500,795",'قرارداد درصدی':"55%"}},
                BankInfo:{'header':"اطلاعات بانکی",'sub':{"شماره کارت":'6037-9985-123-456-6','شماره حساب':'IR-2315','نام بانک':"صادرات ",'شعبه':"بلوار کشاورز",'شماره شبا':"IR-209132154835",'نام و نام خاتوادگی صاحب حساب':"احمد ذوقی" }},
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
                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                            <HeaderComponentChichiInfo header="اطلاعات ثبت نام"/>

                            {/*{Keys ?*/}
                                {/*Keys.map((todo, index) =>*/}
                                    {/*<ShowShowline label={todo} value={Items[todo]} key={index} col={ todo==='آدرس'?'col-12':'col-6' } className='fS1vw'/>*/}
                                {/*) : ''*/}
                            {/*}*/}
                            <CollapseRow store={subRow.Identify} col={'col-6'}/>
                               <ChichiManInfoCollapseWithImage store={subRow.PersonalInfo} col={'col-6'} image={[ax,ax,ax]} label={['تصویر شناسنامه','تصویر کارت ملی','عکس پرسنلی ']} className='col-4'/>
                              <ChichiManInfoCollapseWithImage store={subRow.vehicle} col={'col-6'} image={[ax,ax]} label={['تصویر کارت وسیله نقلیه','تصویر گواهی نامه ']} className='col-6'/>
                             <ChichiManInfoCollapseWithImage store={subRow.contact} col={'col-4'} image={[ax,ax]} label={['تصویر سفته','تصویر گواهی سو پیشینه']} className='col-6'/>

                            <CollapseRow store={subRow.BankInfo} col={'col-6'}/>
                            {/*<CollapseRow store={subRow.DurationProcess}/>*/}
                            {/*<VoteToChichiManInInfo store={subRow.Vote}/>*/}
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfoSubmitInfo;
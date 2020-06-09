import React, {Component} from 'react';
import {Card, CardBody, Collapse} from "reactstrap";
 import VoteToChichiManInInfo from "../Vote-ChichiMan-info/VoteToChichiManInInfo";
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiMAnInfoHistoryTrip extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
            Items:{'شماره سفارش':'IR32513','نام و نام خانوادگی':'هوشنک ابتهاج'  ,'ساعت سفر':'16:08:21'  ,   'وضعیت سفر':'انتظار بسته برای پیک'  ,'آدرس':"زحل، قمر کویینتزار، شهر نیگارا، میدان سیزارتا، کوچه دالی، پلا 13"
            },
            subRow:{
                trips:{'header':"سفرها",'sub':{'سفرهای موفق':'12','لغو شده توسط پیک':'2','لعو شده توسط کاربر':"1" }},
                SuccsessTrips:{'header':"اطلاعات سفر های موفق",'sub':{'کد سفارش ':'IR-1235462','تاریخ سفر':'8-12-98','ساعت سفر':"21:08:12", 'زمان تخمینی ':'30دقیقه','ساعت و زمان انتظار انبار برای پیک':'21:15:23- 5دقیقه','ساعت و زمان تحویل تا تایید پیک':"21:18:23 - 2دقیقه ",'ساعت و زمان انجام سفر':"21:08:12 - 8دقیقه ", ' ساعت و زمان برگشت':'21:30:15 -20 دقیقه',
                        'زمان انجام':'40 دقیقه ','سهم پیک از سفر':'4,500',"ایموجی":'4','نقاط قوت':'خوش تیبپ ، خوش هیکل ، خوش سر و زبون ، با ختواده و دارای شغل عالی ','نقاط ضعف':"دست بزن ، خشن ، دارای توهمات شیزوفرنی، کمی متمایل به حالات سادیسم "
                    }},
                denyTripChichiMan:{'header':"اطلاعات سفرهای لغو شده توسط پیک",'sub':{'کد سفارش ':'IR-1235462','تاریخ سفر':'8-12-98','ساعت سفر':"21:08:12", 'زمان تخمینی ':'30دقیقه','ساعت لغو':"21:08:12", 'علت لعو سفر':'حال نکرد' , 'وضعیت سفر در لحظه لغو':'در حال رسیدن به مقصد'  }},
                denyTripUser:{'header':"اطلاعات سفرهای لغو شده توسط کاربر",'sub':{'کد سفارش ':'IR-1235462','تاریخ سفر':'8-12-98','ساعت سفر':"21:08:12", 'زمان تخمینی ':'30دقیقه', 'ساعت و زمان انتظار انبار برای پیک':'21:15:23- 5دقیقه','ساعت و زمان تحویل تا تایید پیک':"21:18:23 - 2دقیقه ",'ساعت و زمان انجام سفر':"21:08:12 - 8دقیقه ", ' ساعت و زمان برگشت':'21:30:15 -20 دقیقه', 'زمان انجام':'21:30:15 ', 'علت لعو سفر':'دیرکرد عملکرد پیک ', 'سهم پیک از سفر':'4,000' }},
            },
            History: [
            {
                'header': "روز قبل ",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },
            {
                'header': "دو روز قبل ",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },
            {
                'header': "هفته جاری ",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },
            {
                'header': "هفته گذشته ",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },
            {
                'header': "ماه جاری",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },
            {
                'header': "ماه گذشته",
                'sub': {
                    'تعداد سفر': '10',
                    'درآمد': '1,200,300',
                    'زمان تقریبی کل': "6:20:10",
                    'زمان انجام کل': "5:20:12",
                    'موفق': '7', 'لغو توسط کاربر': '2', 'خرابی وسیله نقلیه': "1"
                }
            },

        ],collapse:false
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
    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        let{Keys,Items,subRow,History}=this.state;
        return (
            <div>
                <Card>
                     {/*<div dir='rtl' className="text-right ">*/}

                    {/*</div>*/}

                    <CardBody>
                        <HeaderComponentChichiInfo header="تاریخچه سفر"/>
                         <div className='d-flex flex-wrap justify-content-start' dir='rtl'>


                            <CollapseRow store={subRow.trips}/>
                            <div className='mt-5 col-12'>
                                <div className='d-flex justify-content-start align-items-center ' onClick={this.toggle} >
                                    {
                                        this.state.collapse?
                                            <h3 className='simple-icon-minus icon-glyph ml-2'/>
                                            :
                                            <h3 className='simple-icon-plus icon-glyph ml-2'/>

                                    }
                                    <h3 className='purpleColor'>بر اساس تاریخ:</h3>
                                </div>
                                <Card>
                                    <Collapse isOpen={this.state.collapse}>
                                        <div className='d-flex  w-100 flex-wrap '  >
                                            {History ?
                                                History.map((todo, index) =>
                                                    <CollapseRow store={todo} color={"blueColor"}/>
                                                ) : ''
                                            }
                                        </div>
                                    </Collapse>
                                </Card>
                                <hr/>
                                <VoteToChichiManInInfo store={subRow.SuccsessTrips}/>
                                <VoteToChichiManInInfo store={subRow.denyTripUser}/>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiMAnInfoHistoryTrip;
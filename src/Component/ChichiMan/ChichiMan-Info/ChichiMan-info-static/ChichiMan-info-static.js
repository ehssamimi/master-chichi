import React, {Component} from 'react';
import {Card, CardBody, Collapse} from "reactstrap";
  import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiManInfoStatic extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
            Items:{'شماره سفارش':'IR32513','نام و نام خانوادگی':'هوشنک ابتهاج' ,'ساعت سفر':'16:08:21' , 'وضعیت سفر':'انتظار بسته برای پیک','آدرس':"زحل، قمر کویینتزار، شهر نیگارا، میدان سیزارتا، کوچه دالی، پلا 13"
            },
            subRow:{
                TotalInfo:{'header':"اطلاعات کلی هر بخش ",'sub':{'تعداد سفر':'10','درآمد':'1,200,300','زمان تقریبی کل':"6:20:10",'زمان انجام کل':"5:20:12" }},
                BaseOnSuccess:{'header':"بر اساس موفقیت",'sub':{'موفق':'7','لغو توسط کاربر':'2','خرابی وسیله نقلیه':"1" }},
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

            ],

            collapse:false
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

                    <CardBody>
                        <HeaderComponentChichiInfo header="آمار ها"/>

                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                            {/*{Keys ?*/}
                                {/*Keys.map((todo, index) =>*/}
                                    {/*<ShowShowline label={todo} value={Items[todo]} key={index} col={ todo==='آدرس'?'col-12':'col-6' } className='fS1vw'/>*/}
                                {/*) : ''*/}
                            {/*}*/}
                            <CollapseRow store={subRow.TotalInfo}/>
                            <CollapseRow store={subRow.BaseOnSuccess}/>

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

                            </div>
                            {/*<VoteToChichiManInInfo store={subRow.Vote}/>*/}
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfoStatic;
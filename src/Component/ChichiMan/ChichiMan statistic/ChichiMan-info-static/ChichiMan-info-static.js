import React, {Component} from 'react';
import {Card, CardBody, Collapse} from "reactstrap";
  import HeaderComponentChichiInfo from "../../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";

class ChichiManInfoStatic extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
            subRow:{
                /*********summery chichi info   **********/
                TotalInfo:{'header':"اطلاعات کلی چی چی من ",'sub':{'تعداد سفر':'10','درآمد':'1,200,300','زمان تقریبی کل':"6:20:10",'زمان انجام کل':"5:20:12" }},
                /*********  summery chichi info travel **********/
                BaseOnSuccess:{'header':"اطلعات سفر ها ",'sub':{'موفق':'7','لغو توسط کاربر':'2','خرابی وسیله نقلیه':"1" }},
             },
                /*********  chichi info history **********/
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

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    render() {
        let{ subRow,History}=this.state;
        return (
            <div>
                <Card>

                    <CardBody>
                        <HeaderComponentChichiInfo header="آمار ها"/>

                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                            {/*********summery chichi info   **********/}
                            <CollapseRow store={subRow.TotalInfo}/>
                            {/*********  summery chichi info travel **********/}

                            <CollapseRow store={subRow.BaseOnSuccess}/>

                            {/*********  chichi info history **********/}
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
                         </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfoStatic;
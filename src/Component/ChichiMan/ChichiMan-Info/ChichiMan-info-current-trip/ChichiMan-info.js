import React, {Component} from 'react';
import {Card, CardBody } from "reactstrap";
  import VoteToChichiManInInfo from "../Vote-ChichiMan-info/VoteToChichiManInInfo";
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import CollapseRow from "../../../Common/CollapseRow/CollapseRow";
import {ShowShowline} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";

class ChichiManInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            Items:{'شماره سفارش':'IR32513','نام و نام خانوادگی':'هوشنک ابتهاج'  ,'ساعت سفر':'16:08:21'  ,   'وضعیت سفر':'انتظار بسته برای پیک'  ,'آدرس':"زحل، قمر کویینتزار، شهر نیگارا، میدان سیزارتا، کوچه دالی، پلا 13"
            },
            subRow:{
                TimeProcess:{'header':"زمان شروع هر بخش ",'sub':{'زمان انجام پرداخت':'20:05','زمان ثبت شده':'21:18','جمع آوری در انبار':"21:45",' تایید پیک':"22",'رسیدن پیک':"22:30",'تحویل گیرنده':"22:45"}},
                DurationProcess:{'header':"مدت زمان هر بخش",'sub':{'زمان انجام پرداخت':'70','زمان ثبت شده':'5','جمع آوری در انبار':"30",' تایید پیک':"15",'رسیدن پیک':'20','تحویل گیرنده':'15'}},
                Vote:{'header':"نظرسنحی",'sub':{"ایموجی":'4','نقاط قوت':'خوش تیبپ ، خوش هیکل ، خوش سر و زبون ، با ختواده و دارای شغل عالی ','نقاط ضعف':"دست بزن ، خشن ، دارای توهمات شیزوفرنی، کمی متمایل به حالات سادیسم " }},
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

                       <HeaderComponentChichiInfo header="سفر فعلی"/>
                        <div className='d-flex flex-wrap justify-content-start' dir='rtl'>
                            {Keys ?
                                Keys.map((todo, index) =>
                                    <ShowShowline label={todo} value={Items[todo]} key={index} col={ todo==='آدرس'?'col-12':'col-6' } className='fS1vw'/>
                                ) : ''
                            }
                            <CollapseRow store={subRow.TimeProcess}/>
                            <CollapseRow store={subRow.DurationProcess}/>
                            <VoteToChichiManInInfo store={subRow.Vote}/>
                        </div>
                     </CardBody>
                </Card>
            </div>
        );
    }
}

export default ChichiManInfo;
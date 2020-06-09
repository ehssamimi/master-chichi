import React, {Component} from 'react';
import Doughnut from "../../../../components/charts/Doughnut";
import { ThemeColors } from '../../../../helpers/ThemeColors'
import Bar from "../../../../components/charts/Bar";
import HeaderComponentChichiInfo from "../Header-component-chichi-info/Header-component-chichi-info";
import {Card, CardBody} from "reactstrap";
const colors = ThemeColors();
const doughnutChartData={
    labels: ['خیلی بد', 'بد', 'متوسط','خوب', 'خیلی خوب' ],
    datasets: [
        {
            label: '',
            borderColor: ["#2a93d5", "#ad8c1b", "#c43d4b", "#104978", "#5a5a5a"
                // , colors.themeColor6
                // ,"#922c88"
            ],
            backgroundColor: [
                "rgba(42, 147, 213, 0.1)",
                "rgba(173, 140, 23, 0.1)",
                "rgba(196, 61, 75, 0.1)",
                "rgba(16, 73, 120, 0.1)",
                "rgba(90, 90, 90, 0.1)",
                // colors.themeColor6_10,
                // "rgba(146, 34, 146, 0.1)",
            ],
            borderWidth: 2,
            data: [10, 5, 20 ,25, 20 ]
        }
    ]
};
 const barChartData = {
    labels: ['رفتار محترمانه', 'به موقع رسیدن', 'ظاهر مناسب', 'دریافت در محل دقیق' ],
    datasets: [
        {
            label: 'نقاط قوت',
            borderColor: colors.themeColor1,
            backgroundColor: colors.themeColor1_10,
            data: [110, 120, 112, 115,100],
            borderWidth: 2
        },

    ]
}

const barChartData2 = {
    labels: ['تاخیر در رسیدن', 'توهین و بی احترامی', 'ظاهر نامناسب', 'عدم دریافت در محل دقیق' , 'درخواست مبلغ اضافی', 'بسته بندی مخدوش', 'عدم تطابق وسیله نقلیه', 'عدم تطابق چی چی من' ],
    datasets: [
        {
            label: 'نقاط ضعف',
            borderColor: colors.themeColor2,
            backgroundColor: colors.themeColor2_10,
            data: [110, 120, 112, 115,110, 120, 112, 115,100],
            borderWidth: 2
        },
    ]
}
class ChichiManInfoVote extends Component {
    render() {
        return (
            <Card>
                <CardBody>

                    <div className='d-flex flex-column h-100'>
                        <HeaderComponentChichiInfo header="اطلاعات ثبت نام"/>

                        <div className='w-100 d-flex '>
                            <div className="col-6 chart-container">
                                <Doughnut shadow data={doughnutChartData}/>
                            </div>
                            <div className="col-6 chart-container">
                                <Bar shadow data={barChartData}/>
                            </div>
                        </div>
                        <div className="col-12 chart-container h-40vh mt-2 ">
                            <Bar shadow data={barChartData2}/>
                        </div>
                    </div>

                </CardBody>
            </Card>

        );
    }
}

export default ChichiManInfoVote;
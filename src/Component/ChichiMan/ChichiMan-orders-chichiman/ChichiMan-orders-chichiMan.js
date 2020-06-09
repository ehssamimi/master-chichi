import React, {Component} from 'react';
import ax from './../../../assets/img/4th-1.jpg'
 import ChichiManOrderSituationInRow from "./ChichiMan-Order-Situation-In-Row/ChichiManOrderSituationInRow";

class ChichiManOrdersChichiMan extends Component {
    constructor(props) {
        super(props);
        this.state={
            subRow: [
                {
                    'header': "در صف ",
                    'image': ax,
                    'sub': [{
                        'product_id': 'ir 2023526',
                        'name': 'سهند میرزایی',
                        'time': "00:20"
                    }, {'product_id': 'ir 2023526', 'name': 'سهند میرزایی', 'time': "00:20"} ]
                },
                {
                    'header': "در حال دریافت از انبار ",
                    'image': ax,
                    'sub': [{
                        'product_id': 'ir 2023526',
                        'name': 'سهند میرزایی',
                        'time': "00:20"
                    }, {'product_id': 'ir 2023526', 'name': 'سهند میرزایی', 'time': "00:20"}]
                },
                {
                    'header': "در حال ارسال ",
                    'image': ax,
                    'sub': [{
                        'product_id': 'ir 2023526',
                        'name': 'سهند میرزایی',
                        'time': "00:20"
                    }, {'product_id': 'ir 2023526', 'name': 'سهند میرزایی', 'time': "00:20"}]
                },
                {
                    'header': "تحویل به مشتری ",
                    'image': ax,
                    'sub': [{
                        'product_id': 'ir 2023526',
                        'name': 'سهند میرزایی',
                        'time': "00:20"
                    }, {'product_id': 'ir 2023526', 'name': 'سهند میرزایی', 'time': "00:20"}]
                },
                {
                    'header': "برگشت به انبار ",
                    'image': ax,
                    'sub': [{
                        'product_id': 'ir 2023526',
                        'name': 'سهند میرزایی',
                        'time': "00:20"
                    }, {'product_id': 'ir 2023526', 'name': 'سهند میرزایی', 'time': "00:20"}]
                },
            ]
        }
    }
    render() {
        let{subRow}=this.state;
        return (
            <div className='  w-100 d-flex ' dir='rtl'>

                {subRow.length>0 ?
                    subRow.map((todo, index) =>
                        <ChichiManOrderSituationInRow Main={todo} index={index} {...this.props}/>
                    ) : ''
                }

            </div>
        );
    }
}

export default ChichiManOrdersChichiMan;
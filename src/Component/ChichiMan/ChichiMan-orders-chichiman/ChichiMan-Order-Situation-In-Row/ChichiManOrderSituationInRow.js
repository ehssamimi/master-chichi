import React, {Component} from 'react';
import {RowShowShowColEdit} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";
// import RowShowShowColEdit from "../../../Support/Users/UserDetails/sub/RowShowShowColEdit/RowShowShowColEdit";

class ChichiManOrderSituationInRow extends Component {
    render() {
        var{Main}=this.props;
        let{sub}=Main;


        return (
            <div className={[' text-center flex-column m-3',this.props.type==='chichiman'?'w-20':'col-3'].join(' ')}>
                <div className='w-100 text-center   fs-1vw mb-2'>
                    {
                        this.props.type==='chichiman'?
                            <span className='col-8 font-weight-bold   '>{Main['header']}</span>:
                            <span className='col-8 font-weight-bold'>{Main['header']}</span>
                    }
                </div>
                <div className='w-100 '>
                    <img src= {Main['image']}  alt="ax" className='img-self-fill br02'/>
                </div>
                <div className="dashboard-logs w-100  " dir='rtl'>
                    <div className="  w-100">
                        <div>
                            {sub.length>0 ?
                                sub.map((todo, index) =>
                                    <div key={index} className='w-100 d-flex flex-column  mt-3 brb-td  '>
                                         <div className='text-right d-flex align-items-center w-100 '><span className="log-indicator align-middle border-theme-1 "></span><span className="font-weight-medium  fs-12vw mr-3 pt-1">{todo['product_id']}</span></div>
                                        <div className='text-right d-flex align-items-center w-100  '><span className=" font-weight-medium w-50  text-muted fs-08vw">{todo['name']}</span><span className="font-weight-medium w-50 pt-1 fs-08vw text-muted ">{todo['time']}</span></div>
                                        <div className='  mt-2'>
                                        </div>
                                        <RowShowShowColEdit/>
                                    </div>

                                ) : ''
                            }
                        </div>
                        {/*<table className="table table-sm table-borderless">*/}
                            {/*<tbody>*/}
                            {/*{sub.length>0 ?*/}
                                {/*sub.map((todo, index) =>*/}
                                    {/*<tr key={index} className='w-100  fs-12vw brb-td-transparent '>*/}

                                        {/*/!*<td className='mr-0 pr-0 ml-0 pl-0 text-right  '><span className="log-indicator align-middle border-theme-1"></span></td>*!/*/}
                                        {/*<td className='text-right d-flex align-items-center w-100 '><span className="log-indicator align-middle border-theme-1 "></span><span className="font-weight-medium  fs-12vw mr-3 pt-1">{todo['product_id']}</span></td>*/}
                                        {/*<td className='text-right d-flex align-items-center w-100 brb-td '><span className=" font-weight-medium w-50 text-muted fs-08vw">{todo['name']}</span><span className="font-weight-medium w-50 pt-1 fs-08vw text-muted">{todo['time']}</span></td>*/}
                                        {/*/!*<td className="text-right"><span className=" font-weight-medium">{todo['name']}</span></td>*!/*/}
                                        {/*/!*<td className="text-left ml-0 pl-0"><span className="text-muted">{todo['time']}</span></td>*!/*/}
                                    {/*</tr>*/}
                                {/*) : ''*/}
                            {/*}*/}
                            {/*</tbody>*/}
                        {/*</table>*/}

                    </div>
                </div>
            </div>

        );
    }
}

export default ChichiManOrderSituationInRow;
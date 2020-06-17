import React, {Component} from 'react';

import HeaderSectionHomePage from "../HeaderSectionHomePage/HeaderSectionHomePage";
import HeaderCategoriyInput from "../../CategoriesHomePage/HeaderCategoriyInput/HeaderCategoriyInput";

class CategoriesHomePage extends Component {
    OnClickImg(type) {
        // console.log(type)
        if (this.props.ClickImg) {
            this.props.ClickImg(type)
        }
    }

    render() {
        let{ax1,ax2,ax3,ax4,header,error}=this.props;

        return (
            <div id='addSlider'>
                    {/*<HeaderSectionHomePage header={this.props.header}/>*/}
                {
                    this.props.Edit?
                        <span dir='rtl' className='ml-2 d-flex align-items-end fs-13vw '>
                                نام : {header}
                        </span>

                        :
                        <HeaderCategoriyInput header={this.props.header} {...this.props}/>

                }

                <div className=' d-flex w-100'>
                    <div className='d-flex col-6 flex-column paddingZero  '>
                        <div className='height25vh w-100  mt-1 mb-1 pointer ' onClick={this.OnClickImg.bind(this,'1')}>
                            <img src={ax1} className='img-self-fill br02'/>
                        </div>
                        <div className='height20vh w-100  mt-1 mb-1  pointer' onClick={this.OnClickImg.bind(this,'2')}>
                            <img src={ax2} className='img-self-fill br02'/>
                        </div>
                    </div>
                    <div className='d-flex col-6 flex-column padding-top-Zero padding-bottom-Zero padding-right-Zero pl-2 '>
                        <div className='height20vh w-100 mt-1 mb-1 pointer  ' onClick={this.OnClickImg.bind(this,'3')}>
                            <img src={ax3} className='img-self-fill br02'/>
                        </div>
                        <div className='height25vh w-100 mt-1 mb-1  pointer' onClick={this.OnClickImg.bind(this,'4')}>
                            <img src={ax4} className='img-self-fill br02'/>
                        </div>
                    </div>

                </div>

                <div className='d-flex flex-column col-12'>
                    {/*{*/}
                        {/*error['name'].length>1?<span className='alert alert-danger mt-3 col-12 text-right'>{  error['name']}</span>:""*/}
                    {/*}*/}
                    {/*{*/}
                        {/*error['component'].length>1?<span className='alert alert-danger mt-3 col-12 text-right'>{ error['component']}</span>:""*/}
                    {/*}*/}


                    {
                        error['component'].length>1 || error['name'].length>1 ?<span className='alert alert-danger mt-3 col-12 text-right'> {  error['name']+error['component']} </span>:""
                    }

                </div>
            </div>


        );
    }
}

export default CategoriesHomePage;
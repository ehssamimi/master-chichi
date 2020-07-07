import React, {Component} from 'react';
import HeaderNameHomPage from "../../../../Common/ComponentFunctional/HeaderNameHomPage/HeaderNameHomPage/HeaderNameHomPage";

class CategoriesHomePage extends Component {


    render() {
        let{ax1,ax2,ax3,ax4,header,error,Edit}=this.props;

        return (
            <div id='addSlider'>

                <HeaderNameHomPage header={header} error={error} Edit={Edit} handelChangeName={ (e)=>{ this.props.GetCategoriesName(e.target.value)} }/>

                <div className=' d-flex w-100'>
                    <div className='d-flex col-6 flex-column paddingZero  '>
                        <div className='h-25em w-100    mb-1 pl-1 pointer ' onClick={()=>this.props.ClickImg("1")}>
                            <img src={ax1} className='img-self-fill br02' alt={"ax1"}/>
                        </div>
                        <div className='h-20em w-100    mb-1 pl-1  pointer' onClick={()=>this.props.ClickImg("2")}>
                            <img src={ax2} className='img-self-fill br02' alt={"ax2"}/>
                        </div>
                    </div>
                    <div className='d-flex col-6 flex-column padding-top-Zero padding-bottom-Zero padding-right-Zero pl-2 '>
                        <div className='h-20em w-100   mb-1 pointer  ' onClick={()=>this.props.ClickImg("3")}>
                            <img src={ax3} className='img-self-fill br02' alt={"ax3"}/>
                        </div>
                        <div className='h-25em w-100   mb-1  pointer' onClick={()=>this.props.ClickImg("4")}>
                            <img src={ax4} className='img-self-fill br02' alt={"ax4"}/>
                        </div>
                    </div>

                </div>
                { error!==undefined && error['component']? (
                    <div className="invalid-feedback d-block">
                        { error['component']}
                    </div>
                ) : null}

            </div>


        );
    }
}

export default CategoriesHomePage;
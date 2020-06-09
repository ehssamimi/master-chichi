import React, {Component} from 'react';
import {Collapse} from "reactstrap";
 import {RowShowShowColEdit} from "../../../../Common/RowShowShowColEdit/ShowInRowComponents";

class CollapseCheckoutRow extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true ,store:'',sub:[],Keys:''};
    }

    componentDidMount() {
        let {store} = this.props;
        let {sub} = store;
        let Keys;
        Keys=Object.keys(sub);
        this.setState({
            store, sub,Keys
        });
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.collapse){
    //         if (props.collapse !== state.collapse) {
    //             return {
    //                 collapse: props.collapse,
    //             };
    //         }
    //         // Return null if the state hasn't changed
    //         return null
    //     }
    //
    // }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        let{store,sub,Keys}=this.state;
        // console.log(Keys);
        return (
            <div className='mt-5 col-12'>
                {/*<Card>*/}
                {/*<CardBody>*/}
                <div className='d-flex justify-content-start align-items-center ' onClick={this.toggle} >
                    {
                        this.state.collapse?
                            <h3 className='simple-icon-minus icon-glyph ml-2'/>
                            :
                            <h3 className='simple-icon-plus icon-glyph ml-2'/>
                    }
                    <h3 className='purpleColor'>{store.header}:</h3>
                </div>

                <Collapse isOpen={this.state.collapse} >
                    <div className='d-flex w-100'>
                        <div className='d-flex  col-8 flex-wrap h-20vh '  >
                            {Keys ?
                                Keys.map((todo, index) =>
                                     <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={ todo==='مسئول پرداخت'?'col-6':'col-6' } className='fS1vw'/>
                                ) : ''
                            }
                        </div>
                        <div className='col-4 h-20vh d-flex flex-column align-items-center justify-content-center'>
                            <img src={this.props.ax} alt={'checkout'} className="img-self-fill"/>

                            <div className={['d-flex', 'fs-08vw'].join(' ')}
                                 dir='rtl'>
                            <span className='  gray spanWithOutBreak'>{this.props.label} <span
                                className='pl-2'>:</span></span>
                                <span className="DRTl  d-flex  ">{this.props.value}</span>
                            </div>

                         </div>
                    </div>

                </Collapse>
                {/*</CardBody>*/}

                {/*</Card>*/}
                <hr/>
            </div>
        );
    }
}

export default CollapseCheckoutRow;
import React, {Component} from 'react';
import { Collapse  } from 'reactstrap';
 // import ShowShowline from "../../../Support/Users/UserDetails/sub/Support/sub/ReportUserBox/ShowShowLine/ShowShowline";
 import ax1 from './../../../../assets/img/Emoji/enable/1.svg'
 import ax2 from './../../../../assets/img/Emoji/enable/2.svg'
 import ax3 from './../../../../assets/img/Emoji/enable/3.svg'
 import ax4 from './../../../../assets/img/Emoji/enable/4.svg'
 import ax5 from './../../../../assets/img/Emoji/enable/5.svg'
import {ShowShowline} from "../../../Common/RowShowShowColEdit/ShowInRowComponents";

class VoteToChichiManInInfo extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true ,store:'',sub:[],Keys:'',ax:""};
    }

    componentDidMount() {
        let {store} = this.props;
        let {sub} = store;
        let Keys;
        Keys=Object.keys(sub);
        this.setState({
            store, sub,Keys
        });
        let ax;
        // console.log(sub['ایموجی']);
        switch(sub['ایموجی']) {
            case "1":
                ax = ax1;
                break;
            case "2":
                ax = ax2;
                break;
            case "3":
                ax = ax3;
                break;
            case "4":
                ax = ax4;
                break;
            case "5":
                ax = ax5;
                break;
            default:
            // code block
        }
        this.setState({
            ax
        });
        console.log(sub['ایموجی'])

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
        let{store,sub,Keys,ax}=this.state;

        console.log('ax');
        console.log(ax);
        return (
            <div className='mt-5 col-12 p-0'>
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

                <Collapse isOpen={this.state.collapse}>
                    <div className='d-flex  w-100 flex-wrap '>
                        {/*<div className={['d-flex', 'mt-2', 'col-4',"align-items-center"].join(' ')}*/}
                             {/*dir='rtl'>*/}
                            {/*<span className='collapseValue gray spanWithOutBreak'>ایموجی <span*/}
                                {/*className='pl-2'>:</span></span>*/}
                            {/*<div className='col-sm-10 col-md-4'>*/}
                                {/*<img src={ax} alt={ax} className='img-self-fill'/>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        <div className='d-flex  w-100 flex-wrap '  >
                            {Keys ?
                                Keys.map((todo, index) =>
                                    <div key={index} className={['d-flex','flex-wrap',todo === 'آدرس' ? 'col-12' : this.props.col || 'col-6'].join(" ")}>
                                        {
                                            todo==='ایموجی'?
                                            <div className={['d-flex', 'mt-2', 'col-4', "align-items-center"].join(' ')}
                                            dir='rtl'>
                                            <span className='collapseValue gray spanWithOutBreak'>ایموجی <span
                                            className='pl-2'>:</span></span>
                                            <div className='col-sm-10 col-md-4'>
                                            <img src={ax} alt={ax} className='img-self-fill'/>
                                            </div>
                                            </div>
                                        :
                                            <ShowShowline label={todo} value={sub[todo]} key={index}
                                                          // col={todo === 'آدرس' ? 'col-12' : this.props.col || 'col-6'}
                                                          col={'col-12'}
                                                          className='fS1vw'/>
                                        }
                                    </div>

                                ) : ''
                            }
                        </div>



                        {/*<ShowShowline label={'نقاط قوت'} value={sub['نقاط قوت']} col={'col-4'} className='fS1vw'/>*/}
                        {/*<ShowShowline label={'نقاط ضعف'} value={sub['نقاط ضعف']} col={'col-4'} className='fS1vw'/>*/}
                    </div>
                </Collapse>

                <hr/>
            </div>
        );
    }
}

export default VoteToChichiManInInfo;
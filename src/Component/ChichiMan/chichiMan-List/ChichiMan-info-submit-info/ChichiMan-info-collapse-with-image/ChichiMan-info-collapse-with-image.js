import React, {Component} from 'react';
import { Collapse } from 'reactstrap';
import { FaUserEdit } from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {RowShowShowColEdit} from "../../../../Common/RowShowShowColEdit/ShowInRowComponents";

class
ChichiManInfoCollapseWithImage extends Component {
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



    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        let{store,sub,Keys}=this.state;
        let{image,className,label}=this.props;


         return (
            <div className='  col-12   mb-4 pb-5'>

                <div className='d-flex justify-content-start align-items-center ' onClick={this.toggle} >
                    {
                        this.state.collapse?
                            <h3 className='simple-icon-minus icon-glyph mr-2'/>
                            :
                            <h3 className='simple-icon-plus icon-glyph mr-2'/>

                    }
                    <h3 className={this.props.color||"purpleColor"}>{store.header}:</h3>
                    <NavLink to={`/chichi-man/sign-in/${this.props.id}/${this.props.step}`} className="ml-auto">
                    <div  className='  h3-style'>
                        <FaUserEdit/>
                    </div>
                    </NavLink>

                </div>

                <Collapse isOpen={this.state.collapse} className="h-100 pb-2">
                    <div>
                        <div className='d-flex  w-100 flex-wrap '  >
                            {Keys ?
                                Keys.map((todo, index) =>
                                    <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={ todo==='آدرس'?'col-12':this.props.col||'col-4'} className='fS1vw'/>
                                ) : ''
                            }
                        </div>
                        <div className='d-flex mt-2  '>
                            {image.length>0 ?
                                image.map((todo, index) =>
                                    <div key={index} className={[' h-min-15em  h-max-30em','d-flex','flex-column', ' ' ,'align-items-center' , className || ''].join(' ')}>
                                        <label htmlFor={index}><RowShowShowColEdit label={'عکس'} value={label[index] }  col={ 'col-12'} className='fS1vw'/>
                                            </label>
                                        <img src={todo} alt={todo} className='img-self-fill br10px'/>
                                    </div>
                                ) : ''
                            }
                        </div>
                    </div>

                </Collapse>

                <hr/>
            </div>
        );
    }
}

export default ChichiManInfoCollapseWithImage;
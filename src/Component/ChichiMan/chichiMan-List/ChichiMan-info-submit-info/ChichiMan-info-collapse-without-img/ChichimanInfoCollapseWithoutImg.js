import React, {Component} from 'react';
import { Collapse  } from 'reactstrap';
 import {NavLink} from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import {RowShowShowColEdit} from "../../../../Common/RowShowShowColEdit/ShowInRowComponents";
class ChichimanInfoCollapseWithoutImg extends Component {
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
                    <h3 className={this.props.color||"purpleColor"}>{store.header}:</h3>
                    <NavLink to={`/chichi-man/sign-in/${this.props.id}/${this.props.step}`}>
                        <div  className=' mr-auto h3-style'>
                            <FaUserEdit/>
                        </div>
                    </NavLink>
                </div>

                <Collapse isOpen={this.state.collapse}>
                    <div className='d-flex  w-100 flex-wrap '  >
                        {Keys ?
                            Keys.map((todo, index) =>
                                <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={ todo==='آدرس'?'col-12':this.props.col||'col-4'} className='fS1vw'/>
                            ) : ''
                        }
                    </div>
                </Collapse>
                {/*</CardBody>*/}

                {/*</Card>*/}
                <hr/>
            </div>
        );
    }
}

export default ChichimanInfoCollapseWithoutImg;
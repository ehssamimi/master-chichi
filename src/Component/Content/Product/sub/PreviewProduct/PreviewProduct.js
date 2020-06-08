import React, {Component} from 'react';
import ax from "./../../../../../assets/img/4th.jpg";
import {Button, Card, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {RowShowShowColEdit} from '../../../../Common/RowShowShowColEdit/ShowInRowComponents'
 import {  TweenMax} from "gsap/TweenMax";
import {NavLink} from "react-router-dom";
import {DeleteProduct} from "../../../../functions/ServerConnection";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";

class PreviewProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            sub:{},Main:{},Keys:[],DeleteModal:false
        };
        this.deleteToggle = this.deleteToggle.bind(this);
    }

    // *********separate  data from props ********
    componentDidMount(){
        let{sub,Main}=this.props;
        let Keys;
        Keys=Object.keys(sub);
        this.setState({
            sub,Keys,Main
        });
    }
    // *********handel delete modal ********

    deleteToggle() {
        this.setState(state => ({ DeleteModal: !state.DeleteModal }));
    }
    // *********  delete function ********
    async handelDelete(){
        let {Main}=this.state;
        let deleteProduct =await DeleteProduct(Main['name']);
        let{state,Description}=deleteProduct;
        if (state ) {
            NotificationManager.success(
                "congratulation",
                "محصول شما با موفقیت حذف شد",
                3000,
                null,
                null,
                "success"
            );

            let id=Main['id'];
            const $el = document.getElementById(`${id}`);
            const duration = 2;
            const from = { opacity: 0};
            TweenMax.to($el, duration, from);
            this.deleteToggle();

            setTimeout(() => {
                $el.remove();
            }, 1000)


        } else {
            this.deleteToggle();
            NotificationManager.error(
                "error",
                Description,
                3000,
                null,
                null,
                "error"
            );
        }


    }


    render() {
        let{sub,Keys,Main}=this.state;
        let {Off}=Main;


        return (
            <div className={[' heightCard align-items-center  mt-3 position-relative', this.props.class.length>1?this.props.class:"" ].join(' ')} id={Main['id']}>

                     <Card className='d-flex flex-column h-100 align-items-center br-product w-100'>
                         {/********** product off and percentage*********/}

                         {
                             Off !== undefined ?
                                 Off['Enable'] ?
                                     <div className='w-100 '>
                                         <div className='triangle   '>
                                         </div>
                                         <span className='persentSale'>{ Off['Percentage']*100  }%</span>
                                     </div>
                                     :
                                     ""
                                 : ""
                         }

                         <div className='col-3  positionAction d-flex flex-column align-items-center '>
                             <button
                                 className='badge  remove_category w-100 d-flex justify-content-center   cursor-pointer'
                                 onClick={this.deleteToggle}> delete
                             </button>
                             <NavLink to={`/content/product/add/${Main['id']}`} className="d-flex">
                                 <button
                                     className='badge  edit_category w-100 d-flex justify-content-center mt-2  cursor-pointer '> edit
                                 </button>
                             </NavLink>
                         </div>

                         <NavLink to={`/content/product/each/info/${Main['id']}`} className="d-flex mb-2">
                             {/**********background product image********/}
                             <div className="h-10-vw d-flex align-items-end  ">
                            <div className="bg-circle-product d-flex justify-content-center align-items-center position-relative">
                                <div className="ax-Product-circle">
                                    <img src={Main['Images']} alt={ax} className="img-self-fill"/>
                                </div>
                            </div>
                        </div>
                         </NavLink>

                         <NavLink to={`/content/product/each/info/${Main['id']}`} className="d-flex">

                        <div className="h-15-vw d-flex align-items-center justify-content-center flex-column w-100">
                            <p className="fs-13vw color-gray text-center">{Main['name']}</p>
                            <div className=' w-100 '>
                                {/********** product value*********/}
                                {
                                    Off !== undefined ?
                                        Off['Enable'] ?
                                            <div className='d-flex col-12   '>
                                                   <span className="FS-c-1 color-gray col-6 text-center "
                                                         dir='rtl'>{Main['PrevPrice']}  تومن </span>
                                                <span className="FS-c-1 color-gray lineOverText text-muted col-6 text-center "
                                                      dir='rtl'>{Main['CurrentPrice']} تومن </span>
                                            </div> :

                                            <div className='d-flex col-12   '>
                                                   <span className="fs-1vw color-gray col-12 text-center "
                                                         dir='rtl'>{Main['PrevPrice']}  تومن </span>
                                            </div>
                                        : ""
                                }
                            </div>
                            <div className='d-flex  w-100 flex-wrap justify-content-center' dir='rtl'>
                                {Keys ?
                                    Keys.map((todo, index) =>
                                        <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={todo==='دسته بندی'?'col-12':'col-6'} className='p-0 d-flex justify-content-center ' />
                                    ) : ''
                                }


                            </div>
                        </div>


                         </NavLink>
                    </Card>



                <Modal
                    isOpen={this.state.DeleteModal}
                    size="lg"
                    toggle={this.deleteToggle}
                >
                    <ModalHeader toggle={this.deleteToggle}>
                    </ModalHeader>
                    <ModalBody>
                        آیا مطممئین هستید که می خواهید این محصول را حذف کنید؟                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handelDelete.bind(this)}>بله</Button>{' '}
                        <Button color="secondary" onClick={this.deleteToggle}>بی خیال</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

export default PreviewProduct;
import React, {Component} from 'react';
import ax from "../../../../../assets/img/4th.jpg";
import {Button, Card, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {DeleteProduct, GetProductDetail} from './../../../../functions/ServerConnection'
import RowShowShowColEdit from "../../../../Common/RowShowShowColEdit/RowShowShowColEdit";
import Loader from "../../../../Common/Loader/Loader";
import {NavLink} from "react-router-dom";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";


class PreviewProductDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteToggle = this.deleteToggle.bind(this);

        this.state={
            id:'',productSeparate:[],sub:"",Keys:'',DeleteModal:false
        }
    }

    // ***** get product details with params id **********
      async componentDidMount() {
         const {match: {params}} = this.props;
          let each=await GetProductDetail(params.Id);
          let productSeparate=[];
          // ******create Main and sub********
          let Main = {
              "Description": each['Description'],
              "Attribute": each['Attribute'],
              "name": each['Name'],
              "Images": each['Images'][0],
              "Off": each['Off'],
              "id": each['_id'],
          };
          let sub = {
              "قیمت قبلی": each['PrevPrice'],
              "قیمت جدید": each['CurrentPrice'],
              "مشاهده": each['ViewCount'],
              "تعداد": each['Count'],
              "تولید": each['Manufacture'],
              "دسته بندی": each['Category'],
          };
          let row={'Main':Main,'sub':sub};
          productSeparate.push(row);
          let Keys;
          Keys=Object.keys(sub);
          this.setState({
               Keys,productSeparate
          });
    }

    // **********delete function********
    async handelDelete(){
        let Main=this.state.productSeparate[0]['Main'];
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
            this.props.history.push('/content/product/all')

        } else {
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

    // ********* handel delete product ********
    deleteToggle() {
        this.setState(state => ({ DeleteModal: !state.DeleteModal }));
    }

    render() {
        let { productSeparate} = this.state;
        if (productSeparate.length > 0) {
            var {Main, sub} = productSeparate[0];
            var {Keys} = this.state;
            var {Off} =  Main;
         }


        return (


            productSeparate.length>0?

                <div className='w-100' dir='ltr'>
                    <Card className='w-100 flex-row  m-0  br-product ' style={{height:"auto",minHeight:"40vh"}}>
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

                        <div className='col-8 d-flex flex-column align-items-center justify-content-center'>
                            <p className="fs-13vw color-gray">{Main['name']}</p>
                            <div className='d-flex  w-100 flex-wrap justify-content-center' dir='rtl'>
                                {Keys ?
                                    Keys.map((todo, index) =>
                                        <RowShowShowColEdit label={todo} value={sub[todo]} key={index} col={todo==='ادرس'?'col-12':'col-6'} className='p-0 d-flex justify-content-center' />
                                    ) : ''
                                }
                            </div>
                            <div className=' w-100  '>
                                <div className="     text-center" dir='rtl'>
                                    <p>{Main['Attribute']}</p>
                                </div>
                                <div className=" text-center" dir='rtl'>
                                    <p>{Main['Description']} </p>
                                </div>
                            </div>
                        </div>

                        <div className='col-4 p-0 position-relative'>
                            {/**********background top-right********/}
                            <div className="quarter-circle-top-right">

                            </div>
                            <div className="w-100 d-flex product-div-img-detail h-100 " >
                                <div className='col-9 h-100 d-flex align-items-center justify-content-end'>
                                    {/***********image Product*******/}
                                    <img src={Main['Images'] || ax} alt="ax" className="w-75 h-75"/>
                                </div>
                                <div className='col-3 '>
                                    <div className=' w-100 h-100   d-flex  flex-column mt-3 justify-content-start   '>
                                        {/***************Buttons********/}
                                        <div className='col-3 d-flex flex-column justify-content-around '>
                                            {/***************Delete Button********/}
                                            <div  className="w-100 d-flex btn btn-primary justify-content-center align-items-center">
                                                <button
                                                    className=' w-100 d-flex justify-content-center   cursor-pointer b-0     btn-primary'   onClick={this.deleteToggle}> <span className='glyph-icon iconsminds-folder-close'></span>
                                                </button>
                                            </div>
                                            {/***************edit Button********/}
                                            <NavLink to={`/content/product/add/${Main['id']}`} className="w-100 d-flex btn btn-secondary justify-content-center align-items-center">
                                                <button
                                                    className=' w-100 d-flex justify-content-center   cursor-pointer b-0    btn-secondary'> <span className='glyph-icon iconsminds-folder-edit'></span>
                                                </button>
                                            </NavLink>
                                        </div>

                                    </div>
                                </div>
                             </div>
                        </div>
                    </Card>

                    {/**************Modal for delete Product:are us sure?************/}
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


                :<Loader/>
        );
    }
}

export default PreviewProductDetail;
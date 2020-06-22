import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
  import {
     Button,
     Card,
     Modal, ModalBody, ModalFooter, ModalHeader
 } from "reactstrap";
import {DeleteCategory} from '../../../../functions/ServerConnection'
import {  TweenMax} from "gsap/TweenMax";
import NotificationManager from "../../../../../components/common/react-notifications/NotificationManager";

class CategoryEachItems extends Component {
    constructor(props) {
        super(props);
        this.deleteToggle = this.deleteToggle.bind(this);
        this.state={
            DeleteModal:false
        }
    }
    // **********Handel Delete Category Modal********
    deleteToggle() {
        this.setState(state => ({ DeleteModal: !state.DeleteModal }));
    }

     async DeleteCategory(){
        let deleteProduct = await DeleteCategory(this.props.data['name']);
        var id = this.props.data['_id'];
        let {state, Description} = deleteProduct;
        if (state) {
            NotificationManager.success(
                "congratulation",
                "محصول شما با موفقیت حذف شد",
                3000,
                null,
                null,
                "success"
            );
            // **********delete and fade-out element********
            const $el = document.getElementById(`${id}`);
            const duration = 2;
            const from = {opacity: 0};
            TweenMax.to($el, duration, from);
            setTimeout(() => {
                $el.remove();
            }, 2000)
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
        this.deleteToggle();

    }

    render() {
        let {data}=this.props;
         return (
             <div >
                 <Card className="d-flex flex-column mb-4 br02 h-100 box-shadow-custom" id={data._id}>
                     {/**********show category image and go to category info in ./category/categoryInfo  ***********/}
                     <div className='position-relative'>
                         <NavLink to= {`/content/category/detail/info/${data._id}`} className="d-flex h-15em w-100 ">
                             <img src={data.image} alt="profile" className='w-100  br-tr2'/>
                         </NavLink>
                     </div>

                     <div className=" d-flex flex-grow-1 min-width-zero">
                         <div className='w-100 d-flex flex-column justify-content-between    align-items-center h-9em  '>

                              {/******************category name*********/}
                              <div className="w-100">
                                  <div
                                      className={['d-flex', 'collapseSpanHeight', 'text-center d-flex justify-content-center align-items-center', 'align-items-end', ' p-0 ', 'col-12'].join(' ')}
                                      dir='rtl'>
                                      <span className='collapseValue gray'> نام  <span className='pl-2'>:</span></span>
                                      <span className=' collapseValue '>{data.name}</span>
                                  </div>
                              </div>


                             {/******************category Update and Delete Btn and go to Category image Update*********/}
                             <div className="w-100">
                                 <div className='col-8 offset-2 d-flex justify-content-around   align-items-center'>
                                     <button
                                         className='p-badge  remove_category col-6 d-flex justify-content-center FS-c-1  cursor-pointer'
                                         onClick={this.deleteToggle}  > حذف
                                     </button>
                                     <NavLink to={`/content/category/each/info/${data._id}`} className="d-flex    col-6">
                                         <button
                                             className=' p-badge edit_category w-100 d-flex justify-content-center FS-c-1   cursor-pointer '  > ویرایش
                                         </button>
                                     </NavLink>

                                 </div>
                             </div>


                         </div>
                     </div>
                 </Card>

                 {/**************Modal for delete Category:are us sure?************/}
                 <Modal
                     isOpen={this.state.DeleteModal}
                     size="lg"
                     toggle={this.deleteToggle}
                 >
                     <ModalHeader toggle={this.deleteToggle}>
                     </ModalHeader>
                     <ModalBody>
                         آیا مطممئین هستید که می خواهید این  دسته بندی را حذف کنید؟                    </ModalBody>
                     <ModalFooter>
                         <Button color="primary" onClick={this.DeleteCategory.bind(this)}>بله</Button>{' '}
                         <Button color="secondary" onClick={this.deleteToggle}>بی خیال</Button>
                     </ModalFooter>
                 </Modal>
             </div>

        );
    }
}

export default CategoryEachItems;
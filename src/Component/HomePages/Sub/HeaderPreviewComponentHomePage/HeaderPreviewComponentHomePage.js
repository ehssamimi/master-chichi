import React, {Component} from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TooltipeCompoent from "./TooltipeCompoent/TooltipeCompoent";

class HeaderPreviewComponentHomePage extends Component {
    Edit(header) {
        this.props.handelEdit(header)
    }

    render() {
        return (

            <div className='  mb-2 d-flex justify-content-end  h-4vh align-items-center    '>

                <div className='d-flex ml-auto  '>
                    {this.props.baner ? "" :
                        <TooltipeCompoent className="d-flex fs-15vw color-theme-1 m-2 BtnHeaderComponent"
                                          text="ویرایش" id="edit"
                                          HandelClick={() => this.Edit.bind(this, this.props.Name)}>
                            <FaRegEdit/>
                        </TooltipeCompoent>
                    }
                    {this.props.select?<div className=' d-flex fs-15vw color-theme-1 m-2    BtnHeaderComponent  iconsminds-cursor-click-2' onClick={this.Edit.bind(this, this.props.Name,this.props.select)}> </div>:
                        <TooltipeCompoent className="d-flex  fs-15vw  color-theme-1 m-2   BtnHeaderComponent" text="حذف" id="delete" HandelClick={() => this.props.handelclickDelete }><MdDeleteForever/></TooltipeCompoent>
                       }

                </div>
                <span dir='rtl' className='ml-2 d-flex align-items-end fs-13vw'>
                                نام :  {this.props.Name}
                 </span>

            </div>

        );
    }
}

export default HeaderPreviewComponentHomePage;
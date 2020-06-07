import React, {Component} from 'react';
import ax from './../../../assets/img/4th.jpg'
import {
    Card,
    FormGroup
} from "reactstrap";
import SubCategoryElement from "./SUb/SubCategoryElement/SubCategoryElement";
import {  getCategoryDetailwithId,  Add_Remove_SubCategory} from "../../functions/ServerConnection";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";
import TweenMax from 'gsap/TweenMax'
import RowShowShowColEdit from "../../Common/RowShowShowColEdit/RowShowShowColEdit";


class ContentCategoryInfo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            SubCatInfo:undefined,
            name:'',
            error:{name :""},
            loader:false,
            catName:'',
            image:ax
        }
    }

    async componentDidMount(){
        // *************get id from params and get Category Detail with that id**********
        const {match: {params}} = this.props;
        let CatInfo= await getCategoryDetailwithId(params.Id);
        console.log(CatInfo);
        this.setState({
            SubCatInfo: CatInfo['sub_categories'],
            catName: CatInfo['name'],
            image: CatInfo['image']
        })

    }
    // ***********handel get Name of sub-category for add to category **********
    handleChange(event) {
        this.setState({name: event.target.value});
    }


    // ***********when delete subcategory need to update the list of sub-category this function do this  **********
    async UpdateSubCategory( ){
        const {match: {params}} = this.props;
        let CatInfo= await getCategoryDetailwithId(params.Id);
        this.setState({
            SubCatInfo:CatInfo['sub_categories'],
            catName:CatInfo['name']
        });
    }


        // *************submit Sub-category name to add category **********
    async handleSubmit(event) {
        // *********checking validation- in this case need to have a name to submit to server**********
         var  validate=true;
        let{name }=this.state;
          if (name.length<1){
            validate = false;
            let {error} = this.state;
            error['name'] = "اسم باید مشخص شود ";
            this.setState({
                error
            })
        }else {
            let {error} = this.state;
            error['name'] = "";
            this.setState({
                error
            })
        }

        // *********if validate is true then submit name to add subcategory**********
        if (validate===true){
            this.setState({
                loader:true
            });

             let{name,catName}=this.state;
             let addCat=await Add_Remove_SubCategory( 'add',catName,name);
             this.setState({
                loader:false
            });
             let {state,Description}= addCat ;
            if (state===200){
                NotificationManager.success(
                    "congratulation",
                    "your Sub-category add",
                    3000,
                    null,
                    null,
                    "success"
                );
                 return validate;

            } else {
                NotificationManager.error(
                    "error",
                    Description,
                    3000,
                    null,
                    null,
                    "error"
                );
                return false;
            }

        }else {
            return validate;
        }
    }
    // *********Handel click add/submit input **********

    async handelClickAdd(){
         let input=document.getElementById('input-text');
         let icon=document.getElementById('icon');
                // *********cahnge icon of input to add /submit***********
            if (!input.classList.contains("active")) {
                TweenMax.fromTo(input, 1, { opacity: 1}, {width:'96%'});
                input.classList.add("active");
                icon.classList.add("iconsminds-previous");
                icon.classList.remove("iconsminds-add");
            } else {
                // *********send name of subcategory to category even checking this name was validate  or not  *********
                let Submit= await this.handleSubmit();
                 if (Submit){
                    const {match: {params}} = this.props;
                    let CatInfo= await getCategoryDetailwithId(params.Id);
                    this.setState({
                        SubCatInfo:CatInfo['sub_categories'],
                        catName:CatInfo['name']
                    });
                    TweenMax.fromTo(input, 1 ,{ opacity: 0,  }, {width:0});
                    input.classList.remove("active");
                    icon.classList.add("iconsminds-add");
                    icon.classList.remove("iconsminds-previous");
                }

            }

    }




    render() {
        let{SubCatInfo,error,catName}=this.state;
         return (
            <Card>
                <div className='col-sm-12   m-0' style={{minHeight:"30vh"}} dir='rtl'
                >
                    {/***********Header image category********/}
                    <div className="w-100 d-flex justify-content-center ">
                        {/*let{label,value,col,className}=this.props;*/}
                       <RowShowShowColEdit label="دسته بندی" value={this.state.catName} />
                    </div>
                        <div className='h-20em   col-8 marginAuto  mt-1'>

                            <img src={this.state.image} alt="categoryImg" className='w-100 fit-cover h-100 br-rounded'/>
                        </div>
                    {/***********sub-category lists with delete items ********/}

                    <div className='d-flex flex-column col-sm-12   p-0'>
                        {
                            SubCatInfo !== undefined ?
                                SubCatInfo.map((name, index) =>
                                    <SubCategoryElement {...this.props} name={name} key={index} catName={catName} UpdateSubCategory={this.UpdateSubCategory.bind(this)}/>
                                ) :
                                <div className='d-flex justify-content-center align-items-center'><p>این دسته بندی هیچ
                                    زیر مجموعه ای ندارد</p></div>
                        }

                        {/***********input form submit ********/}
                        <div className='d-flex col-12 h-100 align-items-center p-0'>
                            <div id='icon' className='glyph-icon iconsminds-add purpleColor fs-23vw' onClick={this.handelClickAdd.bind(this)}></div>

                            <form onSubmit={this.handleSubmit}  className='col-12 p-0'  >
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <div className='w-100 d-flex  '   >
                                        <FormGroup className="form-group has-float-label position-relative opacity-0" id='input-text'>
                                            <input type="text"  className="form-control mt-2  " value={this.state.name || ''}
                                                   onChange={this.handleChange}  />
                                        </FormGroup>
                                     </div>
                                    {/***********error of input ********/}
                                    <div className='d-flex flex-column col-6'>
                                        {
                                            error['name'].length>1?<span className='alert alert-danger mt-3 col-12'>{error['name']}</span>:""
                                        }
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>


            </Card>
        );
    }
}

export default ContentCategoryInfo;
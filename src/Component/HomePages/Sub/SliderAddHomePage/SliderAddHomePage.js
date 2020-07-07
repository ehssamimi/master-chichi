import React, {Component} from 'react';
import { FaPlusCircle } from "react-icons/fa";
 import  ax  from './../../../../assets/img/4th.jpg'
 import {    AddSlider, UpdateSliders,    allMainSlider, GetSliderDetail, GetImageId
} from "../../../functions/ServerConnection";
import PreviewMainSlider from "./PreviewSliderMAin/PreviewMainSlider";
import NewHeaderSlider from "../HeaderSlider/Add/NewHeaderSlider";
import {Link} from "react-scroll/modules";
import AddSliderWithSuggest from "./Add-slider-with-suggest/AddSliderWithSuggest";
import ModalWithChild from "../../../Common/Modals/ModalWithChild/ModalWithChild";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import {success_Notification} from "../../../functions/componentHelpFunction";
 class SliderAddHomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            files: [{id: 0, img: ax}, {id: 1, img: ax}, {id: 2, img: ax}],
            id: '',
            modalLarge: false,
            header: '',
            Edit: false,
            Sliders: [{Position: 0, Image: '', Destination: '', DestinationId: ''}, {
                Position: 1,
                Image: '',
                Destination: '',
                DestinationId: ''
            }, {Position: 2, Image: '', Destination: '', DestinationId: ''}],
            SlidersPrev: [],
            headerPlaceHolder: '',
            error: {header: "", atLeast: ""},
            showLoader: false,
            EditName: ""
        }
    }
    async componentDidMount(){
      let Sliders=  await allMainSlider();
      console.log( Sliders);
      this.setState({
          SlidersPrev:Sliders
      })

    }

    GetSliderType(id){
        console.log(id);
        this.setState({
            id
        });
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    }
    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };
    GetData(file, Destination, label, Base64, DestinationString){
         let NewLabel=label.slice(4,5);
        this.setState(state => {
            let situation=state.files.filter(item => item.id === NewLabel-1);
            if (situation.length > 0) {
                let files = state.files;
                let Sliders = state.Sliders;
                files[NewLabel - 1].img = Base64;
                Sliders[NewLabel - 1].Image=file;
                Sliders[NewLabel - 1].Destination=DestinationString;
                Sliders[NewLabel - 1].DestinationId=Destination;
                return {
                    files, Sliders
                };
            } else {
                let files = state.files;
                let Sliders = state.Sliders;
                let id = files.length;
                let img = {id: id, img: Base64};
                let NewImg = {Position: id, Image: file, Destination: DestinationString,DestinationId:Destination};
                files.push(img);
                Sliders.push(NewImg);
                return {
                    files, Sliders
                };
            }

        });
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));

    }
    GetCategoriesName(header){
        console.log(header);
        this.setState({
            header
        })
    }
     AddExtraSlider( ){
         let id = this.state.files.length;
         this.setState({
             id
         });
         this.setState(prevState => ({
             modalLarge: !prevState.modalLarge
         }));
     }
     validateForm=(callback)=> {

         let  Errors={header:"",atLeast:""};
         let {Sliders,header}=this.state;
         let Number=0,i;
         for (i = 0 ; i < Sliders.length; i++) {
             if (Sliders[i].Destination.length>1) {
                 Number+=1
             }
         }
         let formValidate=true;


         if (header.length===0) {
             formValidate = false;
             Errors['header'] = "عنوان اسلایدر باید وارد شود ";
         }
         if (Number<3) {
             formValidate = false;
             Errors['atLeast'] = "حداقل سه عکس باید برای اسلایدر در نظر گرفته شود ";
         }


         this.setState({
             error:Errors
         },()=>{
             console.log(this.state.Errors)
         })
         return callback(formValidate)
     };

     async HandelSubmit(){


         this.validateForm(async (validate)=> {

             if (validate) {
                 // ***get initials***
                 let {Sliders,header}=this.state;
                 let Number=0,i;
                 for (i = 0 ; i < Sliders.length; i++) {
                     if (Sliders[i].Destination.length>1) {
                         Number+=1
                     }
                 }

                        // ***set loader and recignize all operation well***
                            this.setState(prevState => ({
                             showLoader:!prevState.showLoader,
                             }));
                            let Submit=true;



                 // ***create slider****
                 let SliderId = await AddSlider(header,Number);
                 if (SliderId ==='') {
                     this.setState(prevState => ({
                         showLoader:!prevState.showLoader,
                     }));
                     Submit=false;
                 }
                 console.log('SliderID',SliderId);

                 // ****update sliders with image and destination**
                 for (i = 0 ; i < Sliders.length; i++) {
                     if (Sliders[i].Destination.length>1) {
                         // let idax1 = await sendImg(Sliders[i].Image, 'Public');
                         let idax1 = await GetImageId(Sliders[i].Image, 'Public');
                         let updateCategories1 = await UpdateSliders(header, Sliders[i].Position, idax1, Sliders[i].Destination, Sliders[i].DestinationId);
                         console.log(updateCategories1);
                         if (idax1==="" || updateCategories1!==200) {
                             this.setState(prevState => ({
                                 showLoader:false
                             }));
                             Submit=false;
                         }
                     }
                 }

                 // ****check all operations is well or not **
                 if(Submit===true){
                     success_Notification("اسلایدر مورد نظر اضافه شد ")
                     let SlidersPrev=  await allMainSlider();
                     this.setState(prevState => ({
                         showLoader:false,SlidersPrev
                     }));
                 }

              } else {
                 console.log(this.state.Errors)
             }
         })

     }

     async handelEdit(){
         this.setState(prevState => ({
             showLoader:!prevState.showLoader,
         }));
         let Submit=true;
        console.log(this.state.Sliders);
         let{Sliders,headerPlaceHolder}=this.state;
         let i;
         for (i = 0 ; i < Sliders.length; i++) {
             if (Sliders[i].Image!==''){
                  let idax1 = await GetImageId(Sliders[i].Image, 'Public');
                 let updateCategories1 = await UpdateSliders(headerPlaceHolder, i, idax1 ,Sliders[i].Destination, idax1);

                 if (idax1==="" || updateCategories1!==200) {
                     this.setState(prevState => ({
                         showLoader:false
                     }));
                     Submit=false;
                 }
                 console.log(updateCategories1);
             }

         }
         if(Submit===true){
             success_Notification("اسلایدر مورد نظر به روز رسانی شد")
             let SlidersPrev=  await allMainSlider();

             this.setState(prevState => ({
                 showLoader:false,SlidersPrev
             }));
         }
     }

     async ClickEdit(name) {
         console.log(name);
         this.setState(prevState => ({
             showLoader:!prevState.showLoader,
             EditName:name
         }));
         let Slider=await GetSliderDetail(name);
         let {Items}=Slider;

         let i,files=[],Sliders=[];
         for (i = 0 ; i < Items.length; i++) {
             let img = {id: Items[i].Position, img: Items[i].Image};
             let images={Position:i,Image:'',Destination:'',DestinationId:''};
             Sliders.push(images);
             files.push(img);
         }

         this.setState(prevState => ({
             showLoader:!prevState.showLoader, files, Sliders:Sliders,headerPlaceHolder:Slider.Name,Edit:true
         }));
         let goTop=document.getElementById('goTop');
         goTop.click();
     }
    render() {
          let{SlidersPrev,headerPlaceHolder,files,Edit}=this.state;
         // console.log(SlidersPrev);
        return (
            <div className='d-flex  '>


                {/*****ADD / Edit Slider******/}
                <div className='col-6' >
                    <IsLoaderComponent isLoader={this.state.showLoader}>
                        <div className="w-100">
                            <NewHeaderSlider DetailImages={files} GetSliderType={this.GetSliderType.bind(this)}
                                             GetCategoriesName={this.GetCategoriesName.bind(this)}
                                             header={headerPlaceHolder || 'انتخاب نام'} Edit={Edit} error={this.state.error} />
                            {/*****Actions******/}
                            <div className='d-flex w-100 align-items-center h-7vh '>
                                {
                                    this.state.Edit ?
                                        <button className='btn btn-primary ' onClick={this.handelEdit.bind(this)}>ویرایش</button>
                                        :
                                        <div className='d-flex w-100 align-items-center  '>
                                            <button className='btn btn-primary ' onClick={this.HandelSubmit.bind(this)}>ارسال</button>
                                            <span className='fs-24vw color-theme-2 ml-auto btn d-flex align-items-center pr-0'
                                                  onClick={this.AddExtraSlider.bind(this)}><FaPlusCircle/></span>
                                        </div>
                                }
                            </div>
                        </div>
                    </IsLoaderComponent>

                </div>



                {/*****preview /delete Slider******/}
                <div className='col-6' >
                    <IsLoaderComponent isLoader={!(SlidersPrev.length>0 && Array.isArray(SlidersPrev))}>
                        {
                            SlidersPrev.map((slider, index) => <PreviewMainSlider id={slider._id} key={slider._id} header={slider.Name}
                                                                                  slider={slider} clickEdit={this.ClickEdit.bind(this)}
                                                                                  showLoader={this.state.showLoader} EditName={this.state.EditName}
                            />)
                        }
                    </IsLoaderComponent>
                </div>



                {/*****Open Modal for select Imgr******/}
                <ModalWithChild isOpen={this.state.modalLarge}  toggle={()=>{this.toggleLarge()}}>
                    <div className='col-12 d-flex flex-column'>
                        <AddSliderWithSuggest header={`عکس(${this.state.id+1 })`} GetData={this.GetData.bind(this)}/>
                    </div>
                </ModalWithChild>




                {/*****Go top for when click on edit imag******/}
                <Link name="first" activeClass="active" className="first" to="addSlider" spy={true} smooth={true} duration={900} offset={-130}>
                    <button className='d-none' id='goTop'>go top</button>
                </Link>

            </div>
        );
    }
}

export default SliderAddHomePage;
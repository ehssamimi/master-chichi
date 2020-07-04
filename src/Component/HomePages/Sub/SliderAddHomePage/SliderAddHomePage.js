import React, {Component} from 'react';
import SliderOnePage from "../ShowPreviewHomePage/SliderOnePage/SliderOnePage";
import {detailImages} from "../../../../data/carouselItems";
import MultiFiles from "./MultiFile/MultiFiles";
import { FaPlusCircle } from "react-icons/fa";
import FormAddSlider from "./FormAddSlider/FormAddSlider";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import  ax  from './../../../../assets/img/4th.jpg'
import CropImgCropper from "../CropImg/CropImgCropper";
import loader from '../../../../assets/img/loader.svg'
import {
    AddSlider,
    sendImg,
    UpdateSliders,
    allMainSlider,
    GetSliderDetail,
    AddHeaderSlider, UpdateHeaderSliders, GetImageId
} from "../../../functions/ServerConnection";
import PreViewBanner from "../Banner/PreViewBanner/PreViewBanner";
// import {animateScroll as scroll, Events, Link} from "react-scroll/modules";
import PreviewMainSlider from "./PreviewSliderMAin/PreviewMainSlider";
import NewHeaderSlider from "../HeaderSlider/Add/NewHeaderSlider";
import {Link} from "react-scroll/modules";
import Loader from "../Loader/Loader";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import {TweenMax} from "gsap/TweenMax";
import AddSliderWithSuggest from "./Add-slider-with-suggest/AddSliderWithSuggest";
 class SliderAddHomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            files:[
                {
                    id: 0,
                    img:ax
                },
                {
                    id: 1,
                    img:ax
                },{
                    id: 2,
                    img:ax
                },
            ],id:'', modalLarge:false,header:'',Edit:false,Sliders:[{Position:0,Image:'',Destination:'',DestinationId:''},{Position:1,Image:'',Destination:'',DestinationId:''},{Position:2,Image:'',Destination:'',DestinationId:''}
            // ,{Position:2,Image:'',Destination:''}

            ],SlidersPrev:[],headerPlaceHolder:'',error:{header:"",atLeast:""},showLoader:false,EditName:""
        }
    }
    async componentDidMount(){
      let Sliders=  await allMainSlider();
      console.log( Sliders);
      this.setState({
          SlidersPrev:Sliders
      })

    }
    handelMultiFiles(files){
        console.log(typeof (files));
        this.setState({
            files
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

     async HandelSubmit(){

         let {Sliders,header}=this.state;
         let i;
         // let Number=Sliders.length;
         let Number=0;
         for (i = 0 ; i < Sliders.length; i++) {
             if (Sliders[i].Destination.length>1) {
                 Number+=1
             }
         }
         var validateSlider=true;
         if (header.length<1){
             validateSlider = false;
             let {error} = this.state;
             error['header'] = "header is not here";
             this.setState({
                 error
             })
         }else {
             let {error} = this.state;
             error['header'] = "";
             this.setState({
                 error
             })
         }
         if (Number<3) {
             validateSlider=false;
             let {error} = this.state;
             error['atLeast'] = "at last 3 component";
             return(
                 this.setState({
                     error
                 }))
         }else {
             let {error} = this.state;
             error['atLeast'] = "";
             this.setState({
                 error
             })
         }

         if (validateSlider){
             this.setState(prevState => ({
                 showLoader:!prevState.showLoader,
             }));
             let Submit=true;
             let SliderId = await AddSlider(header,Number);
             if (SliderId ==='error') {
                 NotificationManager.error(
                     "error",
                     "your Slider don't accept",
                     3000,
                     null,
                     null,
                     "error"
                 );
                 this.setState(prevState => ({
                     showLoader:!prevState.showLoader,
                 }));
                 Submit=false;
             }
             console.log('SliderID',SliderId);
             console.log(SliderId);
             for (i = 0 ; i < Sliders.length; i++) {
                 if (Sliders[i].Destination.length>1) {
                     // let idax1 = await sendImg(Sliders[i].Image, 'Public');
                     let idax1 = await GetImageId(Sliders[i].Image, 'Public');
                     let updateCategories1 = await UpdateSliders(header, Sliders[i].Position, idax1, Sliders[i].Destination, Sliders[i].DestinationId);
                     console.log(updateCategories1);
                     if (idax1==='error' || updateCategories1!==200) {
                         NotificationManager.error(
                             "error",
                             "your Slider don't accept",
                             3000,
                             null,
                             null,
                             "error"
                         );
                         this.setState(prevState => ({
                             showLoader:false
                         }));
                         Submit=false;
                     }

                 }
             }
             if(Submit===true){
                 NotificationManager.success(
                     "congratulation",
                     "your Slider add",
                     3000,
                     null,
                     null,
                     "success"
                 );
                 let SlidersPrev=  await allMainSlider();
                 this.setState(prevState => ({
                     showLoader:false,SlidersPrev
                 }));
             }
             console.log(header)
         }
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
                 // let idax1 = await sendImg(Sliders[i].Image, 'Public');
                 let idax1 = await GetImageId(Sliders[i].Image, 'Public');
                 let updateCategories1 = await UpdateSliders(headerPlaceHolder, i, idax1 ,Sliders[i].Destination, idax1);

                 if (idax1==='error' || updateCategories1!==200) {
                     NotificationManager.error(
                         "error",
                         "your Slider don't accept",
                         3000,
                         null,
                         null,
                         "error"
                     );
                     this.setState(prevState => ({
                         showLoader:false
                     }));
                     Submit=false;
                 }
                 console.log(updateCategories1);
             }

         }
         if(Submit===true){
             NotificationManager.success(

                 "congratulation",
                 "your Slider edit",
                 3000,
                 null,
                 null,
                 "success"
             );
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

         let i;let files=[];let Sliders=[];
         for (i = 0 ; i < Items.length; i++) {
             let img = {id: Items[i].Position, img: Items[i].Image};
             let images={Position:i,Image:'',Destination:'',DestinationId:''};
             Sliders.push(images);
             files.push(img);
         }
         this.setState({
             files, Sliders:Sliders,headerPlaceHolder:Slider.Name,Edit:true
         }, () => {

         });
         this.setState(prevState => ({
             showLoader:!prevState.showLoader
         }));
         let goTop=document.getElementById('goTop');
         goTop.click();


     }
    render() {
          let{SlidersPrev,headerPlaceHolder,files,Edit}=this.state;
         // console.log(SlidersPrev);
        return (
            <div className='d-flex  '>
                <div className='col-6' >
                    {
                        this.state.showLoader?
                            <Loader/>
                            :      <NewHeaderSlider DetailImages={files} GetSliderType={this.GetSliderType.bind(this)}
                                                                      GetCategoriesName={this.GetCategoriesName.bind(this)}
                                                                      header={headerPlaceHolder || 'انتخاب نام'} Edit={Edit} />
                    }

                    <div className='d-flex w-100 align-items-center h-7vh '>
                        {this.state.Edit? <button className='btn btn-primary ' onClick={this.handelEdit.bind(this)}>ویرایش</button>:<button className='btn btn-primary' onClick={this.HandelSubmit.bind(this)}>ارسال</button>}

                        {this.state.Edit? "":<span className='fs-24vw color-theme-2 ml-auto btn d-flex align-items-center pr-0'  onClick={this.AddExtraSlider.bind(this)}><FaPlusCircle/></span>}
                    </div>

                    <div className='d-flex flex-column'>
                        {
                            this.state.error['header'].length>1?<span className='alert alert-danger mt-3'>{this.state.error['header']}</span>:""
                        }
                        {
                            this.state.error['atLeast'].length>1?<span className='alert alert-danger mt-3'>{this.state.error['atLeast']}</span>:""
                        }
                    </div>

                </div>

                <div className='col-6' >
                    {
                        SlidersPrev.length>0 && Array.isArray(SlidersPrev)  ?
                             SlidersPrev.map((slider, index) => <PreviewMainSlider id={slider._id} key={slider._id}
                                                                                  header={slider.Name}
                                                                                  slider={slider}
                                                                                  clickEdit={this.ClickEdit.bind(this)}
                                                                                  showLoader={this.state.showLoader}
                                                                                  EditName={this.state.EditName}
                            />) :
                        <Loader/>
                     }
                </div>

                {/*</div>*/}
                {/*<MultiFiles MultiFile={this.handelMultiFiles.bind(this)}/>*/}
            {/*</div>*/}

                <Modal
                    isOpen={this.state.modalLarge}
                    size="lg"
                    toggle={this.toggleLarge}
                >
                    <ModalHeader toggle={this.toggleLarge}>
                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex flex-column'>
                            {/*<FormAddSlider header={`عکس(${this.state.id+1 })`} GetData={this.GetData.bind(this)}/>*/}
                            <AddSliderWithSuggest header={`عکس(${this.state.id+1 })`} GetData={this.GetData.bind(this)}/>
                        </div>
                    </ModalBody>
                </Modal>
                <Link name="first" activeClass="active" className="first" to="addSlider" spy={true} smooth={true} duration={900} offset={-130}>
                    <button className='d-none' id='goTop'>go top</button>
                </Link>

            </div>
        );
    }
}

export default SliderAddHomePage;
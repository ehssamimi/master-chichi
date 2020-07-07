import React, {Component} from 'react';
 import CategoriesHomePage from "../../Sub/ShowPreviewHomePage/Categories/CategoriesHomePage";
import ax from "../../../../assets/img/4th.jpg";
import { GetCatNameFunction,UpdateCategories ,GetCategoriesAll ,GetCategorieyDetail} from '../../../functions/ServerConnection'
import PreviewCategories from "./PreviewCategories/PreviewCategories";
 import Loader from "../Loader/Loader";
 import {Link} from "react-scroll/modules";
import ModalGetIdImgCategories from "./Modal-get-id-img-category/ModalGetIDImgCategories";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import ModalWithChild from "../../../Common/Modals/ModalWithChild/ModalWithChild";
import {success_Notification} from "../../../functions/componentHelpFunction";

class CategoriesAddHomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            Destination1:'',
            Destination2:'',
            Destination3:'',
            Destination4:'',
            ax1:'',
            ax2:'',
            ax3:'',
            ax4:'',
            ax1File:'',
            ax2File:'',
            ax3File:'',
            ax4File:'',
            type:'1',value:'',
            idax1:'',idax2:'',
            idax3:'',idax4:'',
            modalLarge: false,
            CatName:'',
            CategoriesList:'',
            header:'',Edit:false,id:'',showLoader:false,EditName:'',error:{header :"", component:""}
        } ;

    }
    async componentDidMount(){
        let CategoriesList = await GetCategoriesAll();
        if (CategoriesList!==""){
            this.setState(prevState => ({
                CategoriesList
            }));
        }

    }

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    GetImgType(type){
         this.setState({
            type
        });
        this.toggleLarge();
    }

    GetImgFile(file,Destination , label ,base64){

        switch(label) {
            case 'عکس اول':
                this.setState({
                    Destination1:Destination, ax1File:file ,ax1:base64
                });
                break;
            case 'عکس دوم':
                this.setState({
                    Destination2:Destination, ax2File:file ,ax2:base64
                });
                break;
            case 'عکس سوم':
                this.setState({
                    Destination3:Destination, ax3File:file ,ax3:base64
                });
                break;
            case 'عکس چهارم':
                this.setState({
                    Destination4:Destination, ax4File:file ,ax4:base64
                });
                break;
            default:
                console.log("cant know why? but your sucks")
        }
        this.toggleLarge();

    }


    async ClickEdit(value ,id) {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
            EditName:value
        }));

        let data= await GetCategorieyDetail(value);
        if (data!==""){
            console.log(data);
            let header=data.Name;
            let ax1=data.Items[0].Image;
            let ax2=data.Items[1].Image;
            let ax3=data.Items[2].Image;
            let ax4=data.Items[3].Image;
            let ax1File = '';
            let ax2File = '';
            let ax3File = '';
            let ax4File = '';
            this.setState({
                header,ax1,ax2,ax3,ax4,Edit:true,id,ax1File,ax2File,ax3File,ax4File
            })

            this.setState(prevState => ({
                showLoader:!prevState.showLoader
            }));
            let goTop=document.getElementById('goTop');
            goTop.click();
        }

    }
    validateForm=(callback)=> {
         let  Errors={header :"", component:""};
        let {ax1File, ax2File, ax3File, ax4File, CatName} = this.state;
        let formValidate=true;

        if (ax1File.length<1 || ax2File.length<1 || ax3File.length<1 || ax4File.length<1) {
            formValidate = false;
            Errors['component'] = "باید 4 عکس انتخاب شوند ";
        }
        if (CatName.length<1) {
            formValidate = false;
            Errors['header'] = "اسم باید مشخص شود ";
        }

        this.setState({
            error:Errors
        })
        return callback(formValidate)
    };


    async HandelSubmit(){

        let {ax1File, ax2File, ax3File, ax4File, CatName, Destination1, Destination2, Destination3, Destination4} = this.state;
        let Destinations=[Destination1,Destination2,Destination3,Destination4];
         this.validateForm(async (validate)=> {
            if (validate) {
                this.setState(prevState => ({
                    showLoader:!prevState.showLoader,
                }));
                let acceptCategoryName=false;
                let ctaImg=[ax1File, ax2File, ax3File, ax4File];
                // ******create category*****
                let catNameServer = await GetCatNameFunction(CatName);
                if (catNameServer==="") {
                    this.setState(prevState => ({
                        showLoader:false
                    }));
                }else {
                    acceptCategoryName=true;
                }
                if (acceptCategoryName===true){
                    var axandCategoryok=true;

                    // ******add image to each category item*****

                    for (let i=0;i<ctaImg.length;i++) {
                            let updateCategories1 = await UpdateCategories(catNameServer, i, ctaImg[i] ,Destinations[i] );
                            console.log("items");
                            console.log(catNameServer, i, ctaImg[i] ,Destinations[i]);
                            console.log(updateCategories1);
                            if (updateCategories1===''){
                                this.setState(prevState => ({
                                    showLoader:false
                                }));
                                axandCategoryok=false;
                                 return axandCategoryok
                            }
                    }
                    if (axandCategoryok===true ) {
                     success_Notification("دسته بندی جدید اضافه شد")
                        let CategoriesList = await GetCategoriesAll();

                        if (CategoriesList!==""){
                            this.setState(prevState => ({
                                showLoader:false,CategoriesList
                            }));
                        }

                    }
                }


             } else {
                console.log(this.state.error)
            }
        })


    }
    async handelEdit(){

        this.setState(prevState => ({
            showLoader:true
        }));

        let {ax1File, ax2File, ax3File, ax4File, CatName, Destination1, Destination2, Destination3, Destination4,id} = this.state;

        let Destinations=[Destination1,Destination2,Destination3,Destination4];

        var catNameServer = id ;

        var submit=true;

        // ***check if each items change then update items*********
        if (ax1File!==''){

            let updateCategories1 = await UpdateCategories(catNameServer, "0", ax1File , Destinations[0]);

            if (updateCategories1!==200){
                submit=false;
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
        }

        if (ax2File!==''){
             let updateCategories2 = await UpdateCategories(catNameServer, "1", ax2File , Destinations[1]);

            if (updateCategories2!==200){
                submit=false;
                this.setState(prevState => ({
                    showLoader:false
                }));
            }

        }
        if (ax3File!==''){

            let updateCategories3 =  await UpdateCategories(catNameServer, "2", ax3File , Destinations[2]);
             if (updateCategories3!==200){
                submit=false;
                this.setState(prevState => ({
                    showLoader:false
                }));
            }

        }
        if (ax4File!=='') {

            let updateCategories4 = await UpdateCategories(catNameServer, "3", ax4File , Destinations[3]);;
            if (updateCategories4!==200){
                submit=false;
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
        }
          if (submit===true) {
            console.log(submit);
            success_Notification("دسته بندی با موفقیت به روز رسانی شد")

              let CategoriesList = await GetCategoriesAll();
            if (CategoriesList!==""){
                this.setState(prevState => ({
                    showLoader:false,CategoriesList
                }));
            }


        }else {
            console.log(submit)
        }
    }

    render() {

        let{ax1,ax2,ax3,ax4,type,CategoriesList,header,Edit,error,showLoader}=this.state;
        return (
            <div className='w-100 d-flex ' >
                <div className='col-6' dir="ltr">
                    {/***************AddCategories***********/}
                    <IsLoaderComponent isLoader={showLoader}>
                        <CategoriesHomePage Edit={this.state.Edit} header={header || 'دسته بندی'} ax1={ax1 || ax}
                                            ax2={ax2 || ax} ax3={ax3 || ax} ax4={ax4 || ax} error={error}
                                            ClickImg={this.GetImgType.bind(this)}
                                            GetCategoriesName={(CatName)=>{this.setState({CatName})}}/>
                        {/***************Actions***********/}


                        {Edit ?
                            <div className="w-100 d-flex  justify-content-start">
                                <button className='btn btn-primary br10px  ' onClick={this.handelEdit.bind(this)}>ویرایش</button>
                            </div>
                          :
                            <div className="w-100 d-flex  justify-content-start">
                                <button className='btn btn-primary br10px  ' onClick={this.HandelSubmit.bind(this)}>ارسال</button>
                            </div>
                        }
                    </IsLoaderComponent>

                    </div>

                <div className='col-4 offset-1 d-flex flex-column justify-content-end' dir="ltr">
                    {/***************preview categories list***********/}

                    {
                        CategoriesList.length > 0 ?
                            CategoriesList.map((cat, index) => <PreviewCategories index={index}
                                                                                  id={CategoriesList[index]._id}
                                                                                  key={index} header={cat.Name}
                                                                                  ax1={CategoriesList[index].Items[0].Image}
                                                                                  ax2={CategoriesList[index].Items[1].Image}
                                                                                  ax3={CategoriesList[index].Items[2].Image}
                                                                                  ax4={CategoriesList[index].Items[3].Image}
                                                                                  clickPreview={this.ClickEdit.bind(this)}
                                                                                  showLoader={this.state.showLoader}
                                                                                  EditName={this.state.EditName}
                                                                                  select={false}/>) : <Loader/>

                    }

                 </div>

                {/***************modal for select Img***********/}

                <ModalWithChild isOpen={this.state.modalLarge} toggle={this.toggleLarge} Header={"انتخاب عکس"}>
                    <div className='col-12 d-flex flex-column'>

                        {type==='1'?<ModalGetIdImgCategories label='عکس اول'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                        {type==='2'?<ModalGetIdImgCategories label='عکس دوم'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                        {type==='3'?<ModalGetIdImgCategories label='عکس سوم'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                        {type==='4'?<ModalGetIdImgCategories label='عکس چهارم'  GetImgFile={this.GetImgFile.bind(this)}/>:''}
                     </div>
                </ModalWithChild>


                {/***************go top when need update g***********/}
                <Link name="first" activeClass="active" className="first" to="addSlider" spy={true} smooth={true} duration={900} offset={-130}>
                    <button className='d-none' id='goTop'>go top</button>
                </Link>

            </div>
        );
    }
}

export default CategoriesAddHomePage;
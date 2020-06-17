import React, {Component} from 'react';
import CropImgCropper from "../CropImg/CropImgCropper";
import CategoriesHomePage from "../../Sub/ShowPreviewHomePage/Categories/CategoriesHomePage";
import ax from "../../../../assets/img/4th.jpg";
import {sendImg,GetCatNameFunction,UpdateCategories ,GetCategoriesAll ,GetCategorieyDetail} from './../../../../Component/functions/ServerConnection'


import AutoSuggestEdit from "../AutoSuggestEdit/AutoSuggestEdit";
import cakes from "../../../../data/cakes";
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import * as Const from "../../../../constants/ServerConst";
import PreviewCategories from "./PreviewCategories/PreviewCategories";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../Loader/Loader";
import PreviewHeaderSlider from "../HeaderSlider/Preview/PreviewHeaderSlider";
import {Link} from "react-scroll/modules";
import ModalGetIdImgCategories from "./Modal-get-id-img-category/ModalGetIDImgCategories";

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
            header:'',Edit:false,id:'',showLoader:false,EditName:'',error:{name :"", component:""}
        } ;
        this.GetCategoriesName=this.GetCategoriesName.bind(this);

    }
    async componentDidMount(){
        let CategoriesList = await GetCategoriesAll();
        console.log(CategoriesList);
        this.setState({
            CategoriesList
        });
        // console.log(CategoriesList[0].Items[0].Image);
    }

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    GetImgType(type){
        // console.log(type)
        this.setState({
            type
        });
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));

    }
    handelEdit(){
        console.log('edit version')
    }
    GetCategoriesName(CatName){
        // console.log(CatName);
        this.setState({
            CatName
        });
    }
    GetImgFile(file,Destination , label ,base64){
        // console.log(file);
        // console.log(Destination);
        // console.log(label);
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

        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));


    }


    async ClickEdit(value ,id) {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
            EditName:value
        }));

        console.log(value);
        let data= await GetCategorieyDetail(value);
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
    async HandelSubmit(){

        let {ax1File, ax2File, ax3File, ax4File, CatName, Destination1, Destination2, Destination3, Destination4} = this.state;
        let Destinations=[Destination1,Destination2,Destination3,Destination4];
        let validateSlider = true;
        if (ax1File.length<1 || ax2File.length<1 || ax3File.length<1 || ax4File.length<1){
            validateSlider = false;
            let {error} = this.state;
            error['component'] = "باید 4 عکس را انتخاب کنید";
            this.setState({
                error
            })
        }else {
            let {error} = this.state;
            error['component'] = "";
            this.setState({
                error
            })
        }
        if (CatName.length<1){
            validateSlider = false;
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
        if (validateSlider===true){

            this.setState(prevState => ({
                showLoader:!prevState.showLoader,
            }));
            let acceptCategoryName=false;
            let ctaImg=[ax1File, ax2File, ax3File, ax4File];
            let catNameServer = await GetCatNameFunction(CatName);
            if (catNameServer==='error') {
                NotificationManager.error(
                    "error",
                    "your category don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                this.setState(prevState => ({
                    showLoader:false
                }));
            }else {
                acceptCategoryName=true;
            }
            if (acceptCategoryName===true){
                var axandCategoryok=true;

                for (let i=0;i<ctaImg.length;i++) {
                    // let idax = await sendImg(ctaImg[i], 'Public');
                    let idax = true;
                     if (idax==='error'){
                        NotificationManager.error(
                            "error",
                            "your category don't accept",
                            3000,
                            null,
                            null,
                            "error"
                        );
                        this.setState(prevState => ({
                            showLoader:false
                        }));
                        axandCategoryok=false;
                        // return false
                        return axandCategoryok
                    }else {
                        // CatId,Position,Image,DestinationId
                        // let updateCategories1 = await UpdateCategories(catNameServer, i, idax , catNameServer);
                         let updateCategories1 = await UpdateCategories(catNameServer, i, ctaImg[i] ,Destinations[i] );
                         console.log("items");
                        console.log(catNameServer, i, ctaImg[i] ,Destinations[i]);
                        console.log(updateCategories1);
                        if (updateCategories1==='error'){
                           NotificationManager.error(
                               "error",
                               "your category don't accept",
                               3000,
                               null,
                               null,
                               "error"
                           );
                           this.setState(prevState => ({
                               showLoader:false
                           }));
                           axandCategoryok=false;
                           // return false
                           return axandCategoryok
                        }
                    }
                }
                if (axandCategoryok===true ) {
                    NotificationManager.success(
                            "congratulation",
                            "your category add",
                            3000,
                            null,
                            null,
                            "success"
                        );
                    let CategoriesList = await GetCategoriesAll();

                        this.setState(prevState => ({
                            showLoader:false,CategoriesList
                        }));
                }
            }



            //
            // let idax1 = await sendImg(ax1File, 'Public');
            // console.log(idax1);
            // let idax2 = await sendImg(ax2File, 'Public');
            // console.log(idax2);
            // let idax3 = await sendImg(ax3File, 'Public');
            // console.log(idax3);
            // let idax4 = await sendImg(ax4File, 'Public');
            // console.log(idax4);
            // let updateCategories1 = await UpdateCategories(catNameServer, "0", idax1 , catNameServer);
            // console.log(updateCategories1);
            // let updateCategories2 = await UpdateCategories(catNameServer, "1", idax2 , catNameServer);
            // console.log(updateCategories2);
            // let updateCategories3 = await UpdateCategories(catNameServer, "2", idax3 , catNameServer);
            // console.log(updateCategories3);
            // let updateCategories4 = await UpdateCategories(catNameServer, "3", idax4 , catNameServer);
            // console.log(updateCategories4);
            // if (catNameServer==='error' || idax1 === 'error' || idax2 === 'error' || idax3 === 'error' || idax4 === 'error' || updateCategories1 === 'error' || updateCategories2 === 'error' || updateCategories3 === 'error' || updateCategories4 === 'error' ) {
            //     NotificationManager.error(
            //         "error",
            //         "your category don't accept",
            //         3000,
            //         null,
            //         null,
            //         "error"
            //     );
            //     this.setState(prevState => ({
            //         showLoader:false
            //     }));
            // }else{
            //     NotificationManager.success(
            //         "congratulation",
            //         "your category add",
            //         3000,
            //         null,
            //         null,
            //         "success"
            //     );
            //     let CategoriesList = await GetCategoriesAll();
            //     this.setState({
            //         CategoriesList
            //     });
            //     this.setState(prevState => ({
            //         showLoader:false
            //     }));
            //
            // }


        }



    }
    async handelEdit(){
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
         }));
         let {ax1File, ax2File, ax3File, ax4File, CatName, Destination1, Destination2, Destination3, Destination4,id} = this.state;
        // let ctaImg=[ax1File, ax2File, ax3File, ax4File];

        let Destinations=[Destination1,Destination2,Destination3,Destination4];


        var catNameServer = id ;
         // if (CatName!==''){
         //     catNameServer = await GetCatNameFunction(CatName);
         //     console.log(catNameServer);
         //
         // }
        // console.log(id);
        // console.log(catNameServer);
        var submit=false;
        if (ax1File!==''){
            // let idax1 = await sendImg(ax1File, 'Public');

            // let updateCategories1 = await UpdateCategories(catNameServer, i, ctaImg[i] ,Destinations[0] );

            let updateCategories1 = await UpdateCategories(catNameServer, "0", ax1File , Destinations[0]);
            // if (idax1 === 'error' || updateCategories1 === 'error'){
            if (  updateCategories1 === 'error'){
                NotificationManager.error(
                    "error",
                    "your category don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
            console.log(updateCategories1);
            if (updateCategories1===200){
                submit=true;
            }
        }

        if (ax2File!==''){
            // let idax2 = await sendImg(ax2File, 'Public');
            let updateCategories2 = await UpdateCategories(catNameServer, "1", ax2File , Destinations[1]);
            // if (idax2 === 'error' || updateCategories2 === 'error'){
            if ( updateCategories2 === 'error'){
                NotificationManager.error(
                    "error",
                    "your category don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
            // console.log(updateCategories2);
            if (updateCategories2===200){
                submit=true;
            }
        }
        if (ax3File!==''){
            // let idax3 = await sendImg(ax3File, 'Public');
            // let updateCategories3 = await UpdateCategories(catNameServer, "2", idax3 , catNameServer);
            let updateCategories3 =  await UpdateCategories(catNameServer, "2", ax3File , Destinations[2]);
            // if (idax3 === 'error' || updateCategories3 === 'error'){
            if (  updateCategories3 === 'error'){
                NotificationManager.error(
                    "error",
                    "your category don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
            // console.log(updateCategories3);
            if (updateCategories3===200){
                submit=true;
            }
        }
        if (ax4File!=='') {
            // let idax4 = await sendImg(ax4File, 'Public');
            // let updateCategories4 = await UpdateCategories(catNameServer, "3", idax4, catNameServer);
            let updateCategories4 = await UpdateCategories(catNameServer, "3", ax4File , Destinations[3]);;
            // if (idax4 === 'error' || updateCategories4 === 'error'){
            if (  updateCategories4 === 'error'){
                NotificationManager.error(
                    "error",
                    "your category don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                this.setState(prevState => ({
                    showLoader:false
                }));
            }
            console.log(updateCategories4);
            if (updateCategories4===200){
                submit=true;
                // NotificationManager.success(
                //     "congratulation",
                //     "your category add",
                //     3000,
                //     null,
                //     null,
                //     "success"
                // );
            }
        }
          if (submit===true) {
            console.log(submit);
            await NotificationManager.success(
                "congratulation",
                "your categories edit",
                3000,
                null,
                null,
                "success"
            );
              let CategoriesList = await GetCategoriesAll();

              this.setState(prevState => ({
                  showLoader:false,CategoriesList
              }));
        }else {
            console.log(submit)
        }
    }

    render() {

        let{ax1,ax2,ax3,ax4,type,CategoriesList,header,Edit,error}=this.state;
        return (
            <div className='w-100 d-flex '>
                <div className='col-6'>
                    {
                        this.state.showLoader ?
                            <Loader/>
                            :
                            <CategoriesHomePage Edit={this.state.Edit} header={header || 'دسته بندی'} ax1={ax1 || ax}
                                                ax2={ax2 || ax} ax3={ax3 || ax} ax4={ax4 || ax} error={error}
                                                ClickImg={this.GetImgType.bind(this)}
                                                GetCategoriesName={this.GetCategoriesName}/>
                    }
                    {Edit? <button className='btn btn-primary' onClick={this.handelEdit.bind(this)}>ویرایش</button>:<button className='btn btn-primary' onClick={this.HandelSubmit.bind(this)}>ارسال</button>}
                    </div>

                <div className='col-4 offset-1 d-flex flex-column justify-content-end'>
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

                    {/*<PreviewCategories key={'key'} header={'name'} ax1={ax} ax2={ax} ax3={ax} ax4={ax} clickPreview={this.ClickEdit.bind(this)}/>*/}
                </div>
                <Modal
                    isOpen={this.state.modalLarge}
                    size="lg"
                    toggle={this.toggleLarge}
                >
                    <ModalHeader toggle={this.toggleLarge}>
                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex flex-column'>

                            {type==='1'?<ModalGetIdImgCategories label='عکس اول'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='2'?<ModalGetIdImgCategories label='عکس دوم'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='3'?<ModalGetIdImgCategories label='عکس سوم'   GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='4'?<ModalGetIdImgCategories label='عکس چهارم'  GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {/*{type==='4'?<CropImgCropper label='عکس چهارم' aspect={3/2} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
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

export default CategoriesAddHomePage;
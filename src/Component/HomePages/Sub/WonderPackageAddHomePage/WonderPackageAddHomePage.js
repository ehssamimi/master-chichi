import React, {Component} from 'react';
import WonderPackageHomePage from "../ShowPreviewHomePage/WonderPackageHomePage/WonderPackageHomePage";
import ax from "../../../../assets/img/4th.jpg";
import CropImgCropper from "../CropImg/CropImgCropper";
import CategoriesHomePage from "../ShowPreviewHomePage/Categories/CategoriesHomePage";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {
    allPackage,
    addPackage,
    GetPackageDetail,
    sendImg,
    UpdatePackage, GetCatNameFunction, UpdateCategories, GetCategoriesAll
} from "../../../functions/ServerConnection";
import PreviewCategories from "../CategoriesHomePage/PreviewCategories/PreviewCategories";
import PreviewPackages from "./subPackage/PreviewPackages";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import Loader from "../Loader/Loader";
import {Link} from "react-scroll/modules";

class WonderPackageAddHomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            ax1:'',
            ax2:'',
            ax3:'',
            ax4:'',
            ax5:'',
            ax1File:'',
            ax2File:'',
            ax3File:'',
            ax4File:'',
            ax5File:'',
            type:'1',
            CategoriesList:'',header:'',
            modalLarge:false,Edit:false,CatName:'',showLoader:false,EditName:'',error:{name :"", component:""}
        }
        this.GetCategoriesName=this.GetCategoriesName.bind(this);
    }

    async componentDidMount(){
        let CategoriesList = await allPackage();
        console.log(CategoriesList);
        this.setState({
            CategoriesList
        });
        // console.log(CategoriesList[0].Items[0].Image);
    }
    GetImgType(type){
        // console.log(type)
        this.setState({
            type
        });
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    }
    GetImgFile(file,Destination , label ,Base64){
        // console.log(file);
        // console.log(Base64);
        // console.log(label);
        switch(label) {
            case 'عکس اول':
                this.setState({
                    ax1:Base64, ax1File:file
                });
                break;
            case 'عکس دوم':
                this.setState({
                    ax2:Base64, ax2File:file
                });
                break;
            case 'عکس سوم':
                this.setState({
                    ax3:Base64, ax3File:file
                });
                break;
            case 'عکس چهارم':
                this.setState({
                    ax4:Base64, ax4File:file
                });
                break;
            case 'عکس پنجم':
                this.setState({
                    ax5:Base64, ax5File:file
                });
                // code block
                break;
            default:
                console.log("cant know why? but your sucks");

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
        let data= await GetPackageDetail(value);
        console.log(data);
        let header=data.Name;
        let ax1=data.Items[0].Image;
        let ax2=data.Items[1].Image;
        let ax3=data.Items[2].Image;
        let ax4=data.Items[3].Image;
        let ax5=data.Items[4].Image;
        let ax1File = '';
        let ax2File = '';
        let ax3File = '';
        let ax4File = '';
        let ax5File = '';
        this.setState({
            header,ax1,ax2,ax3,ax4,ax5,Edit:true,id,ax1File,ax2File,ax3File,ax4File,ax5File
        })
        this.setState(prevState => ({
            showLoader:!prevState.showLoader
        }));
        let goTop=document.getElementById('goTop');
        goTop.click();
    }

    toggleLarge = () => {
        this.setState(prevState => ({
            modalLarge: !prevState.modalLarge
        }));
    };

    async HandelSubmit(){

        let {ax1File, ax2File, ax3File, ax4File,ax5File, CatName, Destination1, Destination2, Destination3, Destination4} = this.state;
        let validateSlider = true;
        if (ax1File.length<1 || ax2File.length<1 || ax3File.length<1 || ax4File.length<1|| ax5File.length<1){
            validateSlider = false;
            let {error} = this.state;
            error['component'] = "باید 5 عکس را انتخاب کنید";
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
            let ctaImg=[ax1File, ax2File, ax3File, ax4File,ax5File];
            let catNameServer = await addPackage(CatName);
            if (catNameServer==='error') {
                NotificationManager.error(
                    "error",
                    "your package don't accept",
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
                    let idax = await sendImg(ctaImg[i], 'Public');
                    console.log(idax);
                    if (idax==='error'){
                        NotificationManager.error(
                            "error",
                            "your package don't accept",
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
                        let updateCategories1 = await UpdatePackage(catNameServer, i, idax , catNameServer);
                        console.log(updateCategories1)
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
                        "your package add",
                        3000,
                        null,
                        null,
                        "success"
                    );
                    let CategoriesList = await allPackage();

                    this.setState(prevState => ({
                        showLoader:false,CategoriesList
                    }));
                }
            }
        }



        // let catNameServer = await addPackage(CatName);
        //
        // let idax1 = await sendImg(ax1File, 'Public');
        // let idax2 = await sendImg(ax2File, 'Public');
        // let idax3 = await sendImg(ax3File, 'Public');
        // let idax4 = await sendImg(ax4File, 'Public');
        // let idax5 = await sendImg(ax5File, 'Public');
        // let updateCategories1 = await UpdatePackage(catNameServer, "0", idax1 , catNameServer);
        // let updateCategories2 = await UpdatePackage(catNameServer, "1", idax2 , catNameServer);
        // let updateCategories3 = await UpdatePackage(catNameServer, "2", idax3 , catNameServer);
        // let updateCategories4 = await UpdatePackage(catNameServer, "3", idax4 , catNameServer);
        // let updateCategories5 = await UpdatePackage(catNameServer, "4", idax5 , catNameServer);
        // console.log(updateCategories1);
        // console.log(updateCategories2);
        // console.log(updateCategories3);
        // console.log(updateCategories4);
        // console.log(updateCategories5);
    }
    async handelEdit(){

        let {ax1File, ax2File, ax3File, ax4File,ax5File, CatName, Destination1, Destination2, Destination3, Destination4,id} = this.state;
        var catNameServer = id ;
        // if (CatName!==''){
        //     catNameServer = await GetCatNameFunction(CatName);
        //     console.log(catNameServer);
        //
        // }
        // console.log(id);
        // console.log(catNameServer);
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
        }));
        console.log(catNameServer);
        var submit=false;
        if (ax1File!==''){
            let idax1 = await sendImg(ax1File, 'Public');
            let updateCategories1 = await UpdatePackage(catNameServer, "0", idax1 , catNameServer);
            if (idax1 === 'error' || updateCategories1 === 'error'){
                NotificationManager.error(
                    "error",
                    "your package don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                submit=false;
            }
            console.log(updateCategories1);
            if (updateCategories1===200){


                submit=true;
            }
        }


        // if (ax1File!==''){
        //     let idax1 = await sendImg(ax1File, 'Public');
        //     let updateCategories1 = await UpdatePackage(catNameServer, "0", idax1 , catNameServer);
        //     console.log(updateCategories1);
        //
        //     if (updateCategories1===200){
        //         submit=true;
        //     }
        // }

        if (ax2File!==''){
            let idax2 = await sendImg(ax2File, 'Public');
            let updateCategories2 = await UpdatePackage(catNameServer, "1", idax2 , catNameServer);
            // console.log(updateCategories2);
            if (idax2 === 'error' || updateCategories2 === 'error'){
                NotificationManager.error(
                    "error",
                    "your package don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                submit=false;

                // this.setState(prevState => ({
                //     showLoader:false
                // }));
            }
            console.log(updateCategories2);
            if (updateCategories2===200){
                submit=true;
            }
        }
        if (ax3File!==''){
            let idax3 = await sendImg(ax3File, 'Public');
            let updateCategories3 = await UpdatePackage(catNameServer, "2", idax3 , catNameServer);
            // console.log(updateCategories3);
            if (idax3 === 'error' || updateCategories3 === 'error'){
                NotificationManager.error(
                    "error",
                    "your package don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                submit=false;
                //
                // this.setState(prevState => ({
                //     showLoader:false
                // }));
            }
            console.log(updateCategories3);
            if (updateCategories3===200){
                submit=true;
            }
        }
        if (ax4File!=='') {
            let idax4 = await sendImg(ax4File, 'Public');
            let updateCategories4 = await UpdatePackage(catNameServer, "3", idax4, catNameServer);
            if (idax4 === 'error' || updateCategories4 === 'error'){
                NotificationManager.error(
                    "error",
                    "your package don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                submit=false;
                //
                // this.setState(prevState => ({
                //     showLoader:false
                // }));
            }
             console.log(updateCategories4);
            if (updateCategories4===200){
                submit=true;
            }
        }
        if (ax5File!=='') {
            let idax5 = await sendImg(ax5File, 'Public');
            let updateCategories5 = await UpdatePackage(catNameServer, "4", idax5, catNameServer);
            if (idax5 === 'error' || updateCategories5 === 'error'){
                NotificationManager.error(
                    "error",
                    "your package don't accept",
                    3000,
                    null,
                    null,
                    "error"
                );
                submit=false;

            }
            console.log(updateCategories5);
            if (updateCategories5===200){
                submit=true;
            }
        }
        if (submit===true) {
            console.log(submit);
            await NotificationManager.success(
                "congratulation",
                "your package  edit",
                3000,
                null,
                null,
                "success"
            );
            let CategoriesList = await allPackage();
            console.log(CategoriesList);

            this.setState(prevState => ({
                showLoader:false,CategoriesList
            }));

        }else {
            this.setState(prevState => ({
                showLoader:false
            }));

        }
    }
    GetCategoriesName(CatName){
        // console.log(CatName);
        this.setState({
            CatName
        });
    }

    render() {
        let{ax1,ax2,ax3,ax4,ax5,type,CategoriesList,modalLarge,header,Edit,error}=this.state;
        return (
            <div className='w-100 d-flex'>
                <div className='col-6'>
                    {
                        this.state.showLoader ?
                            <Loader/> :
                            <div className='w-100'>
                                <WonderPackageHomePage error={error} Edit={this.state.Edit} header={header || 'دسته بندی'}
                                                       ax1={ax1 || ax} ax2={ax2 || ax} ax3={ax3 || ax} ax4={ax4 || ax}
                                                       ax5={ax5 || ax} ClickImg={this.GetImgType.bind(this)}
                                                       GetCategoriesName={this.GetCategoriesName}/>
                                {Edit? <button className='btn btn-primary mt-2' onClick={this.handelEdit.bind(this)}>ویرایش</button>:<button className='btn btn-primary mt-2' onClick={this.HandelSubmit.bind(this)}>ارسال</button>}

                            </div>

                    }
                </div>

                <div className='col-4 offset-1 d-flex flex-column justify-content-between '>
                    {/*<div className='col-12 d-flex flex-column'>*/}
                        {/*{type==='1'?<CropImgCropper label='عکس اول' aspect={1.76/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
                        {/*{type==='2'?<CropImgCropper label='عکس دوم' aspect={1.08/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
                        {/*{type==='3'?<CropImgCropper label='
                        عکس سوم' aspect={3/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
                        {/*{type==='4'? <CropImgCropper label='عکس چهارم' aspect={1.08/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
                        {/*{type==='5'? <CropImgCropper label='عکس پنجم' aspect={1.76/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}*/}
                    {/*</div>*/}

                    {
                        CategoriesList.length>0?
                            CategoriesList.map((cat, index) => <PreviewPackages index={index}
                                                                                id={CategoriesList[index]._id}
                                                                                key={index} header={cat.Name}
                                                                                ax1={CategoriesList[index].Items[0].Image}
                                                                                ax2={CategoriesList[index].Items[1].Image}
                                                                                ax3={CategoriesList[index].Items[2].Image}
                                                                                ax4={CategoriesList[index].Items[3].Image}
                                                                                ax5={CategoriesList[index].Items[4].Image}
                                                                                clickPreview={this.ClickEdit.bind(this)}
                                                                                showLoader={this.state.showLoader}
                                                                                EditName={this.state.EditName}
                            />) :
                            <Loader/>
                    }
                </div>
                <Modal
                    isOpen={ modalLarge}
                    size="lg"
                    toggle={this.toggleLarge}
                >
                    <ModalHeader toggle={this.toggleLarge}>
                    </ModalHeader>
                    <ModalBody>
                        <div className='col-12 d-flex flex-column'>
                            {type==='1'?<CropImgCropper label='عکس اول' aspect={1.76/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='2'?<CropImgCropper label='عکس دوم' aspect={1.08/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='3'?<CropImgCropper label='عکس سوم' aspect={3/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='4'? <CropImgCropper label='عکس چهارم' aspect={1.08/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}
                            {type==='5'? <CropImgCropper label='عکس پنجم' aspect={1.76/1} GetImgFile={this.GetImgFile.bind(this)}/>:''}
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

export default WonderPackageAddHomePage;
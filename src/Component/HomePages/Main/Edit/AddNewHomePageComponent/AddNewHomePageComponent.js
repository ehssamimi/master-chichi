import React, {Component} from 'react';
import {ModalBody} from "reactstrap";
import PreviewCategories from "../../../Sub/CategoriesHomePage/PreviewCategories/PreviewCategories";
import {allPackage, GetAllItemList, GetBanners, GetCategoriesAll,allMainSlider,allHeaderSlider,
    GetPackageDetail,GetSliderDetail,GetBannersDetail,GetItemDetail,GetCategorieyDetail,GetHeaderSliderDetail
} from "../../../../functions/ServerConnection";
import PreviewItems from "../../../Sub/ItemList/PreviewItems/PreviewItems";
import PreviewPackages from "../../../Sub/WonderPackageAddHomePage/subPackage/PreviewPackages";
import PreviewHeaderSlider from "../../../Sub/HeaderSlider/Preview/PreviewHeaderSlider";
import PreViewBanner from "../../../Sub/Banner/PreViewBanner/PreViewBanner";
import PreviewMainSlider from "../../../Sub/SliderAddHomePage/PreviewSliderMAin/PreviewMainSlider";
import Loader from "../../../Sub/Loader/Loader";
import {error_Notification} from "../../../../functions/componentHelpFunction";
var classNames = require('classnames');

class AddNewHomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            listComponent:['ItemList','Category','Package','Slider','Banner','HeaderSlider'],active:'',name:'',ItemsList:[],showLoader:false
        }
    }

  async  handelClick(name) {
        this.setState({
            name,active:name,ItemsList:[]
        });
        var ItemsList='';
        switch (name) {
            case 'ItemList':
                //  ItemsList = await GetAllItemList();
                // // console.log(ItemsList);
                // this.setState({
                //     ItemsList
                // });

                let {state:state2,Description:itemsList } = await GetAllItemList( );
                console.log(itemsList);
                if (state2===200){
                    this.setState({
                        itemsList
                    })
                }else {
                    error_Notification(state2,itemsList)
                }

                break;
            case 'Category':
                  ItemsList = await GetCategoriesAll();
                // console.log(ItemsList);
                this.setState({
                    ItemsList
                });
                break;
            case 'Package':
                ItemsList = await allPackage();
                // console.log(ItemsList);
                this.setState({
                    ItemsList
                });
                break;
            case 'Slider':
                ItemsList = await allMainSlider();
                // console.log(ItemsList);
                this.setState({
                    ItemsList
                });
                break;
            case 'Banner':
                ItemsList = await GetBanners();
                // console.log(ItemsList);
                this.setState({
                    ItemsList
                });
                break;
            case 'HeaderSlider':
                ItemsList = await allHeaderSlider();
                // console.log('headerSlider');
                // console.log(ItemsList);
                this.setState({
                    ItemsList
                });
                break;
        }
    }
  async  ClickEdit(Name){
        // console.log(Name);
        let {name}=this.state;
        this.setState({
            showLoader:true
        });
        var Value='';
        switch (name) {
            case 'ItemList':
                Value = await GetItemDetail(Name);
                console.log(Value);
                break;
            case 'Category':
                Value = await GetCategorieyDetail(Name);
                break;
            case 'Package':
                Value = await GetPackageDetail(Name);
                break;
            case 'Slider':
                Value = await GetSliderDetail(Name);
                break;
            case 'Banner':
                Value = await GetBannersDetail(Name);
                break;
            case 'HeaderSlider':
                Value = await GetHeaderSliderDetail(Name);
                break;
        }
        this.props.addComPonent(Value,name);
      this.setState({
          showLoader:false
      })
    }
    render() {
        let{listComponent,ItemsList,name}=this.state;
        var deactive = classNames(
            'vh10',' d-flex' ,'justify-content-center', 'align-items-center', 'list-newComponent','cursor-pointer',
            {
        });
        var active = classNames(
            'vh10',' d-flex' ,'justify-content-center', 'align-items-center', 'list-newComponent','cursor-pointer','ListActiveHomePages'

             );
        // console.log(this.state.name);
        // console.log(this.state.ItemsList);
        return (
            <div className='col-12 d-flex flex-column ' >
                <div className='col-12 d-flex  justify-content-between listMenu align-items-center mb-3'>
                    {
                        listComponent.map((item,index)=>
                            <div className={this.state.active === item ? active : deactive} onClick={this.handelClick.bind(this,item)}  key={ item }  >
                                {/*<p className='text-right  mb-0 listMenuActive-Border '>{item}</p>*/}
                                {/*listMenuActive-Border*/}
                                <p className={['text-right','mb-0', this.state.active === item ?"listMenuActive-Border":''].join(' ')}>{item}</p>
                            </div>
                        )
                    }
                </div>
                <div className='col-12 d-flex flex-column justify-content-end'>
                    {
                        this.state.showLoader?<Loader/>:          <div className='w-100 d-flex flex-column justify-content-end'>

                            {
                                name==='Category'?
                                    ItemsList.length>0?
                                        ItemsList.map((cat ,index)=><PreviewCategories id={ItemsList[index]._id} key={index} header={cat.Name} ax1={ItemsList[index].Items[0].Image}
                                                                                       ax2={ItemsList[index].Items[1].Image} ax3={ItemsList[index].Items[2].Image} ax4={ItemsList[index].Items[3].Image}
                                                                                       clickPreview={this.ClickEdit.bind(this)} select={true} baner={true}/>  ):""

                                    :''
                            }

                            {
                                name==='ItemList'?
                                    ItemsList.length>0? ItemsList.map((cat ,index)=><PreviewItems Title={cat.Title} key={index} clickPreview={this.ClickEdit.bind(this)} select={true}/>):""
                                    :''
                            }
                            {
                                name==='Package'?
                                    ItemsList.length>0? ItemsList.map((cat ,index)=><PreviewPackages id={ItemsList[index]._id} key={index} header={cat.Name}
                                                                                                     ax1={ItemsList[index].Items[0].Image} ax2={ItemsList[index].Items[1].Image}
                                                                                                     ax3={ItemsList[index].Items[2].Image} ax4={ItemsList[index].Items[3].Image}
                                                                                                     ax5={ItemsList[index].Items[4].Image} clickPreview={this.ClickEdit.bind(this)}
                                                                                                     select={true} baner={true}/>  ):""
                                    :''
                            }
                            {
                                name==='HeaderSlider'?
                                    ItemsList.length > 0 ?
                                        ItemsList.map((slider, index) => <PreviewHeaderSlider id={slider._id} key={index} header={slider.Name} slider={slider} clickEdit={this.ClickEdit.bind(this)}
                                                                                              select={true} baner={true}/>) : ""
                                    :''
                            }
                            {
                                name==='Banner'?
                                    ItemsList.length > 0 ?
                                        ItemsList.map((cat ,index)=><PreViewBanner id={cat._id} key={index} header={cat.Name} ax ={cat.Image}   clickPreview={this.ClickEdit.bind(this)} select={true} baner={true}/>  ):""
                                    :''
                            }
                            {
                                name==='Slider'?
                                    ItemsList.length > 0 ?
                                        ItemsList.map((slider ,index)=><PreviewMainSlider id={slider._id} key={index} header={slider.Name} slider={slider} clickEdit={this.ClickEdit.bind(this)} select={true} baner={true}/>  ):""
                                    :''
                            }
                        </div>
                    }




                </div>
            </div>
        );
    }
}

export default AddNewHomePageComponent;
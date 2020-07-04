import React, {Component} from 'react';
import AddItemList from "./AddItems/AddItemList";
import {addItemList, GetAllItemList, GetItemDetail} from "../../../functions/ServerConnection";
import PreviewItems from "./PreviewItems/PreviewItems";
import HomePagePreview from "../../Main/Edit/HomePagePreview";
import PreviewPackages from "../WonderPackageAddHomePage/subPackage/PreviewPackages";
import Loader from "../Loader/Loader";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";
import IsLoaderComponent from "../../../Common/Loader/IsLoader/IsLoaderComponent";
import {error_Notification, HandelResponse} from "../../../functions/componentHelpFunction";


class MainItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemLists:[],showLoader:false,loader:true
        };


    }
    async componentDidMount(){
        await this.getAllItems()
    }

    async GetItemsValue(payload) {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
        }));

        console.log(payload.Title);
        console.log(payload.QueryKey);
        let {state,Description } = await addItemList(payload.Title, payload.QueryKey);
        HandelResponse(state,Description,"آیتم شما با موفقیت اضافه شد " );
        this.setState({
            showLoader:false,
        });
        if (state===200){
            this.setState({
                loader:true
            })
            await this.getAllItems()
        }

    }
    async  ClickEdit(Name){
       let  Value = await GetItemDetail(Name);
        console.log(Value);
    }

    async  getAllItems( ){
        let {state:state2,Description:itemLists } = await GetAllItemList( );
        console.log(itemLists);
        if (state2===200){
            this.setState({
                itemLists,loader:false
            })
        }else {
            error_Notification(state2,itemLists)
        }
    }


    render() {
        let {itemLists}=this.state;
        return (
            <div className='w-100'>

                        <div className='row m-0'>
                            <div className='col-sm-12 col-md-6'>
                                <IsLoaderComponent isLoader={this.state.showLoader}>
                                    <AddItemList GetItemsValue={this.GetItemsValue.bind(this)}/>
                                </IsLoaderComponent>

                                </div>
                            <div className='col-sm-12 col-md-6'>
                                <IsLoaderComponent isLoader={this.state.loader}>

                                </IsLoaderComponent>
                                {
                                    itemLists.length>0?
                                        itemLists.map((cat ,index)=><PreviewItems Title={cat.Title} key={index} {...this.props } clickPreview={this.ClickEdit.bind(this)} />):""
                                }
                            </div>
                        </div>

            </div>



        );
    }
}

export default MainItems;
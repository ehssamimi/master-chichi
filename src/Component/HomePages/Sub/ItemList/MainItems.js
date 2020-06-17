import React, {Component} from 'react';
import AddItemList from "./AddItems/AddItemList";
import {addItemList, GetAllItemList, GetItemDetail} from "../../../functions/ServerConnection";
import PreviewItems from "./PreviewItems/PreviewItems";
import HomePagePreview from "../../Main/Edit/HomePagePreview";
import PreviewPackages from "../WonderPackageAddHomePage/subPackage/PreviewPackages";
import Loader from "../Loader/Loader";
import NotificationManager from "../../../../components/common/react-notifications/NotificationManager";


class MainItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemLists:[],showLoader:false
        };


    }
    async componentDidMount(){
        let itemLists = await GetAllItemList( );
        console.log(itemLists);
        this.setState({
            itemLists
        })
    }

    async GetItemsValue(payload) {
        this.setState(prevState => ({
            showLoader:!prevState.showLoader,
        }));

        console.log(payload.Title);
        console.log(payload.QueryKey);
        let value = await addItemList(payload.Title, payload.QueryKey);
        console.log(value);
        if (value==='error'){
            this.setState(prevState => ({
                showLoader:false,
            }));
            NotificationManager.error(
                "error",
                "your Items can't add",
                3000,
                null,
                null,
                "error"
            );
        } else {
            this.setState(prevState => ({
                showLoader:false,
            }));
            NotificationManager.success(
                "congratulation",
                "your Items is add",
                3000,
                null,
                null,
                "success"
            );
            let itemLists = await GetAllItemList( );
            console.log(itemLists);
            this.setState({
                itemLists
            })
        }

    }
    async  ClickEdit(Name){
       let  Value = await GetItemDetail(Name);
        console.log(Value);
    }


    render() {
        let {itemLists}=this.state;
        return (
            <div className='w-100'>

                        <div className='d-flex'>
                            <div className='col-6'>
                                {
                                    this.state.showLoader ?
                                        <Loader/>
                                        :
                                        <AddItemList GetItemsValue={this.GetItemsValue.bind(this)}/>
                                }
                                </div>
                            <div className='col-6'>
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
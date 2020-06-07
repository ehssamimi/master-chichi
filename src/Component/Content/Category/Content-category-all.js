import React, {Component} from 'react';
import CategoryEachItems from "./SUb/CategoryEachItems/CategoryEachItems";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {
    Row,
} from "reactstrap";
import {getAllCategoriesList} from './../../functions/ServerConnection'
import Loader from "../../Common/Loader/Loader";
import NotificationManager from "../../../components/common/react-notifications/NotificationManager";

class ContentCategoryAll extends Component {
    constructor(props) {
        super(props);
        this.state={
            CatList:[]
        }
    }

    async componentDidMount(){
        // ********************get category list*********
        let CatList= await getAllCategoriesList();

        // ******checking for get true data******
        if (  Array.isArray(CatList)) {
            this.setState({
                CatList
            });
        }else {
            let{Description}=CatList;
            NotificationManager.error(
                "error",
                Description,
                3000,
                null,
                null,
                "error"
            );
        }
    }
    render() {
         let {CatList}=this.state;
        return (
                    <Row className='m-0'>
                  {/********************* map category list**********/}
                        {CatList.length > 0 ?
                            CatList.map((itemData,key) => <Colxx xxs="12" md="4" lg="3" key={key}  >
                                <CategoryEachItems data={itemData}/>
                            </Colxx>) :<div className=" col-6 offset-3" key={0}><Loader/></div>
                        }
                    </Row>
         );
    }
}

export default ContentCategoryAll;
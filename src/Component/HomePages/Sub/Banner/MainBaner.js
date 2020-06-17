import React, {Component} from 'react';
import PreViewBanner from "./PreViewBanner/PreViewBanner";
import AddBanerHomePage from "./AddBaner/AddBanerHomePage";
import {GetBanners, GetBanerDetail, GetDestination} from "../../../functions/ServerConnection";
import axis from './../../../../assets/img/4th.jpg'
import PreviewCategories from "../CategoriesHomePage/PreviewCategories/PreviewCategories";
import Loader from "../Loader/Loader";


class MainBaner extends Component {
    constructor(props) {
        super(props);
        this.state={
            AllBanners:[],Edit:false,ax:axis,name:'',Destination:"",showLoader:false
        }
    }

    async componentDidMount(){
        let AllBanners = await GetBanners();
        console.log(AllBanners);
        this.setState({
            AllBanners
        })
    }
    async updateListComponents(){
         let AllBanners = await GetBanners();
        console.log(AllBanners);
        this.setState({
            AllBanners
        })
    }
    async ClickEdit(value ,id) {
        console.log(value);
        let data= await GetBanerDetail(value);
        console.log(data);
        let header=data.Name;
        // let ax =data.Items[0].Image;
        let ax =data.Image;
        let name=data.Name;
        let Destination=data.Destination;
        console.log(ax);
        // console.log(name);

        this.setState({
            header ,ax ,Edit:true,id,name,Destination
        })
    }

    render() {
        let{AllBanners,Edit,ax}=this.state;
        return (
            <div className='w-100 d-flex'  >
                <div className='col-6'>
                            <AddBanerHomePage  id={1} header={'title'} ax={ax} name={this.state.name} Destination={this.state.Destination} updateListComponents={this.updateListComponents.bind(this)} />
                </div>
                <div className='col-6'>{
                    AllBanners.length>0?
                        // AllBanners.map((cat ,index)=><PreViewBanner id={CategoriesList[index]._id} key={index} header={cat.Name} ax1={CategoriesList[index].Items[0].Image}   clickPreview={this.ClickEdit.bind(this)}/>  ):""
                        AllBanners.map((cat, index) => <PreViewBanner id={cat._id} key={index} header={cat.Name}
                                                                      ax={cat.Image} index={index}
                                                                      clickPreview={this.ClickEdit.bind(this)}/>) :
                        <Loader/>
                        // AllBanners.map((cat ,index)=><PreViewBanner id={index} key={index}  ax1={ax}   clickPreview={this.ClickEdit.bind(this)} />  ):""
                }

                    {/*<PreViewBanner header={'heading'}/>*/}
                </div>

            </div>
        );
    }
}

export default MainBaner;
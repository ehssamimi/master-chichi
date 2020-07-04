import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import ax from '../../../../assets/img/2574.jpg';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    GetCategorieyDetail,
    GetPackageDetail,
    GetBannersDetail,
    GetHomePageTemp,GetHomePageLoad
} from '../../../functions/ServerConnection'
import SliderItems from "../../Sub/ItemList/PreviewItems/SliderItems/SliderItems";
import SLiderItemsHomePagePreview from "./PreviewHomePages/Components/SLiderItemsHomePagePreview";
import CategoriesPreviewHomePages from "./PreviewHomePages/Components/CategoriesPreviewHomePages";
import PackagePreviewHomePages from "./PreviewHomePages/Components/PackagePreviewHomePages";
import SliderHomePagesPreview from "./PreviewHomePages/Components/SliderHomePagesPreview";
import BannerHomePagePreview from "./PreviewHomePages/Components/BannerHomePagePreview";
import PreViewBanner from "../../Sub/Banner/PreViewBanner/PreViewBanner";
import AddNewHomePageComponent from "./AddNewHomePageComponent/AddNewHomePageComponent";

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    // height:200
    // width: 400
});

const newItems=[{'Position':1,'content':"ehsan"},{'Position':2,'content':"samimi"},{'Position':3,'content':"Rad"},{'Position':4,'content':"Amir"}];
class HomePagePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // items: getItems(10)
            items: newItems,NewItem:'',add:false,Lenght:newItems.length ,Data:[]

        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    // async  componentWillReceiveProps (nextProps, nextState){
    //     await this.setState({
    //         Data:nextProps.Data
    //     })
    // }
    // static getDerivedStateFromProps(props, state) {
    //     if (props.Data !== state.Data) {
    //         return {
    //             Data: props.Data,
    //         };
    //     }
    // }

    async componentDidMount() {
        let Data = await GetHomePageTemp();
        let loadPages = await GetHomePageLoad('ehsan');
        this.setState({
            Data
        });
        console.log(Data);
        console.log(loadPages);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const Data = reorder(
            this.state.Data,
            result.source.index,
            result.destination.index
        );

        this.setState({
            Data
        },()=>{
            console.log(this.state.Data)
        });

        //
        // const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );
        //
        // this.setState({
        //     items
        // },()=>{
        //     console.log(this.state.items)
        // });
    }

    onChangeInput(e){
        this.setState({
            NewItem:e.target.value
        });
    }

    SubmitInput(){

        this.setState(prev=>({
            items: [...prev.items, {'id':this.state.Lenght+1,'content':this.state.NewItem}],
            Lenght:prev.Lenght+1
            // items:prev.items
        }));
    }

    handelAddComponent(Name,Title) {
        console.log(Name);
        console.log(Title);
        this.toggleEdit();
        // this.setState(prev=>({
        //     items: [...prev.items, {'id':this.state.Lenght+1,'content':this.state.NewItem}],
        //     Lenght:prev.Lenght+1
        //     // items:prev.items
        // }));
    }

     async ChangeComponent(Name,Categories,Position){
         switch (Categories) {
             case 'Category':
                 let categorie = await GetCategorieyDetail(Name);
                 let {Items} = categorie;
                 console.log(categorie);
                 this.setState(state => {
                     let Data = state.Data;
                     console.log(Data[Position].Data.Data);
                     let i;
                     for (i = 0; i < Items.length; i++) {
                         Data[Position].Data.Data[i].Image = Items[i].Image;
                         Data[Position].Data.Data[i].DestinationId = Items[i].DestinationId;
                     }
                     return {
                         Data
                     }
                 });
                 break;
             case 'Package':
                 let packages = await GetPackageDetail(Name);
                 let PackageItems = packages.Items;
                 this.setState(state => {
                     let Data = state.Data;
                     Data[Position].Data.Data = PackageItems;
                     // for(i=0;i<(PackageItems.length-1);i++){
                     //     Data[Position].Data.Data[i].Image=PackageItems[i].Image;
                     //     Data[Position].Data.Data[i].DestinationId=PackageItems[i].DestinationId;
                     // }
                     return {
                         Data
                     }
                 });
                 break;
             case 'Banner':
                 let Banner = await GetBannersDetail(Name);
                 console.log('this is banner');
                 console.log(Banner);

                 // Type: {Name: "Package", DestinationId: "id"}
                 // let PackageItems=packages.Items;
                 this.setState(state => {
                     let Data = state.Data;
                     // let bannerData= Data[Position].Data.Data[0];
                     Data[Position].Data.Data[0].Image = Banner.Image;
                     Data[Position].Data.Data[0].Type.Name = Banner.Name;
                     Data[Position].Data.Data[0].Type.DestinationId = Banner.DestinationId;

                     // Data[Position].Data.Data[0].Image=Banner.Image;
                     // Data[Position].Data.Data[0].Type.Name=Banner.Name;
                     // Data[Position].Data.Data[0].Type.DestinationId=Banner.DestinationId;
                     // for(i=0;i<(PackageItems.length-1);i++){
                     //     Data[Position].Data.Data[i].Image=PackageItems[i].Image;
                     //     Data[Position].Data.Data[i].DestinationId=PackageItems[i].DestinationId;
                     // }
                     return {
                         Data
                     }
                 });
                 break;
             // case 'categorie':
             //     text = "Today is Sunday";
             //     break;
             default:
             // text = "Looking forward to the Weekend";
         }
    }
    HandelAdd(){
        this.setState({
            add:true
        });
    }
    toggleEdit = () => {
        this.setState(prevState => ({
            add: !prevState.add
        }));
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        let{add,NewItem}=this.state;
        // let {Data}=this.props;
        let {Data}=this.state;
        // console.log(this.props.Data);
        console.log(this.state.Data);

        return (
            <div className={this.props.Classs}>
                <DragDropContext onDragEnd={this.onDragEnd} >
                    <Droppable droppableId="droppable">

                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {Data.map((item, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Card>
                                                    {item.ObjectType==="ItemList"?<SLiderItemsHomePagePreview items={item.Data} position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)}/>:""}
                                                    {item.ObjectType==="Category"?<CategoriesPreviewHomePages  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)}/>:""}
                                                    {item.ObjectType==="Package"?<PackagePreviewHomePages  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)}/>:""}
                                                    {item.ObjectType==="Slider"?<SliderHomePagesPreview  items={item.Data}/>:""}
                                                    {item.ObjectType==="Banner"?<BannerHomePagePreview  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)}/>:""}
                                                    {/*<CardBody>*/}
                                                        {/*<CardTitle>{item.ObjectType}</CardTitle>*/}
                                                    {/*</CardBody>*/}
                                                </Card>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                                <button onClick={this.HandelAdd.bind(this)}>add</button>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button onClick={this.HandelAdd.bind(this)}>add</button>

                <Modal
                    isOpen={this.state.add}
                    size="lg"
                    toggle={this.toggleEdit}
                >
                    <ModalHeader toggle={this.toggleEdit}>
                        add new Component

                    </ModalHeader>
                    <ModalBody>
                        <AddNewHomePageComponent addComPonent={this.handelAddComponent.bind(this)}/>

                    </ModalBody>


                </Modal>

            </div>

        );
    }
}


export default HomePagePreview;
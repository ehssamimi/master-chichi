import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import SLiderItemsHomePagePreview from "../Edit/PreviewHomePages/Components/SLiderItemsHomePagePreview";
import CategoriesPreviewHomePages from "../Edit/PreviewHomePages/Components/CategoriesPreviewHomePages";
import PackagePreviewHomePages from "../Edit/PreviewHomePages/Components/PackagePreviewHomePages";
import SliderHomePagesPreview from "../Edit/PreviewHomePages/Components/SliderHomePagesPreview";
import BannerHomePagePreview from "../Edit/PreviewHomePages/Components/BannerHomePagePreview";
 import {
    GetBannersDetail,
    GetCategorieyDetail, GetHeaderSliderDetail,
    GetItemDetail,
    GetPackageDetail,
    GetSliderDetail
} from "../../../functions/ServerConnection";
import HeaderSliderPreview from "../Edit/PreviewHomePages/Components/HeaderSliderPreview";
import UndoComponents from "../Edit/PreviewHomePages/Components/UndoComponents";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? 'lightgreen'
        : 'white'};
`

export default class Task extends React.Component {


    async ChangeComponent(Name, Type, Position) {
        let Value;
        switch (Type) {
            case 'ItemList':
                Value = await GetItemDetail(Name);
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
        // console.log(Name);
        // console.log(Type);
        this.props.handelEditComponent(Value,this.props.task['id'],Type,Position)
    }
    deleteComponent(Name, Type, Position){
        // console.log(Name);
        // console.log(Type);
        // console.log(Position);

        // console.log(this.props.task.id);
        this.props.handelDeleteItems(this.props.task.id)
    }



  render() {
    // const isDragDisabled = this.props.task.id === 'task-1'
    //   let {task}=this.props;
      let item =this.props.task;
      // let item=task.content;
      // console.log(this.props.id);
      // console.log(this.props.task);
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragging={false}
        // isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            // isDragDisabled={isDragDisabled}
          >


              {item.ObjectType==="ItemList"?<SLiderItemsHomePagePreview items={item.Data} position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="Category"?<CategoriesPreviewHomePages  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} edit={false} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="Package"?<PackagePreviewHomePages  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} edit={false} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="Slider"?<SliderHomePagesPreview  items={item.Data} position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} edit={false} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="Banner"?<BannerHomePagePreview  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)}  edit={false} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="HeaderSlider"?<HeaderSliderPreview  items={item.Data}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} edit={false} deleteComponent={this.deleteComponent.bind(this)}/>:""}
              {item.ObjectType==="Deleted"?<UndoComponents  items={item.Data} id={this.props.task.id}  position={item.Position} ChangeComponent={this.ChangeComponent.bind(this)} edit={false} {...this.props}/>:""}

              {/*{this.props.item.content}*/}
          </Container>
        )}
      </Draggable>
    )
  }
}

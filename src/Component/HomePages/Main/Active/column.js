import React from 'react'
import styled from 'styled-components'
import Task from './task'
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import { FaPlusCircle } from "react-icons/fa";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 30%;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

export default class Column extends React.Component {
    HandelAdd(){
        let column=this.props.column['id'];
        this.props.HandelAdd(column);
    }
  render() {

    return (
      <Container>
          <div className='d-flex align-items-center h-7vh'>
              <Title>{this.props.column.title}</Title>
              <span className='fs-24vw color-theme-2 ml-auto btn d-flex align-items-center pr-0'  onClick={this.HandelAdd.bind(this)}><FaPlusCircle/></span>
          </div>


        <Droppable droppableId={this.props.column.id} type="TASK" >
          {(provided, snapshot) => (
            <TaskList
                ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}

            >
              {this.props.tasks.map((task, index) => (
                  this.props.tasks.length>0? <Task key={task.id} task={task} index={index} id={task.id} {...this.props}/> :''
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
          {/*<button className=' btn-primary' onClick={this.HandelAdd.bind(this)}>add</button>*/}

      </Container>
    )
  }
}

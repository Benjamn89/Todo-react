import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';

const AddTodoBtn = (props) => {
    console.log('ToggleBtn')
    let svgElement = useRef(null)
    useEffect(() => {
    if (props.addTodoState) {
      svgElement.current.classList.add('add-todo-arrow-down')
    } else {
      svgElement.current.classList.remove('add-todo-arrow-down')
      }
    })

      let hover = <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'D'</div>
      if (props.addTodoState) {
        hover = <div className='add-todo-btn-hover'>To close press Esc</div>
      }
    return  <div onClick={props.toggleTodo} className='todo-functions-inside add-todo-btn'>Add Todo
    <svg className='add-todo-arrow' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" ref={svgElement}>
     <circle cx="17.5" cy="17.5" r="16.25" stroke={props.addTodoState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
     <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
     </svg>
     {hover}
    </div>
}

const mapStateToProps = state => {
  return {
    addTodoState: state.addTodoReducer.addTodo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      toggleTodo: () => dispatch(addTodoActiontypes.toggleTodo())
   } 
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoBtn)
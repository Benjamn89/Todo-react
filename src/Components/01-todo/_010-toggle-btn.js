import React from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';

const OnHoverBtn = (props) => {
    console.log('ToggleBtn')
    const toggleTodo = () => {
        props.toggleTodo()
      }
      let hover = <div className='toggle-btn-hover'>Click to open or alternatively press 'A' + 'D'</div>
      if (props.addTodoState) {
        hover = <div className='toggle-btn-hover'>To close press Esc</div>
      }
    return  <div onClick={toggleTodo} className='todo-functions-inside toggle-btn'>Add Todo
    <svg className='add-todo-arrow' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="17.5" cy="17.5" r="16.25" stroke="white" strokeWidth="2.5"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnHoverBtn)
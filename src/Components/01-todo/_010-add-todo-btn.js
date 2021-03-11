import React, {Component} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
import changeDateAction from '../../Reducers/01.3-change-date-action';
class AddTodoBtn extends Component {
  shouldComponentUpdate(nProps) {
    return nProps.addTodoState !== this.props.addTodoState
  }
  toggleTodo = () => {
     if (this.props.changeDayState) {
       this.props.toggleChangeDay(false)
       this.props.toggleTodo(true)
     } else {this.props.toggleTodo(false)}
  }
  render() {
        console.log('ToggleBtn')
        let hover = <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'D'</div>
        if (this.props.addTodoState) {
          hover = <div className='add-todo-btn-hover'>To close press Esc</div>
        }
        return  <div className='todo-functions-inside add-todo-btn' onClick={this.toggleTodo}>Add Todo
        <svg className={this.props.addTodoState ? 'add-todo-arrow add-todo-arrow-down' : 'add-todo-arrow'} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/    2000/svg">
         <circle cx="17.5" cy="17.5" r="16.25" stroke={this.props.addTodoState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
         <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
         </svg>
         {hover}
        </div>
 }}
const mapStateToProps = state => {
  return {
    addTodoState: state.addTodoReducer.addTodo,
    changeDayState: state.changeDateReducer.changeDayState,     
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: (condition) => dispatch(addTodoActiontypes.toggleTodo(condition)),
    toggleChangeDay: (condition) => dispatch(changeDateAction.toggleChangeDay(condition))
   } 
  }
export default connect(mapStateToProps, mapDispatchToProps)(AddTodoBtn)
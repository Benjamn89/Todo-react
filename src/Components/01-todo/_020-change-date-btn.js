import React, {Component} from 'react';
import { connect } from 'react-redux';
import changeDateAction from '../../Reducers/01.3-change-date-action';
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
 class ChangeDateBtn extends Component {
   shouldComponentUpdate(nextProps) {
    return nextProps.changeDayState !== this.props.changeDayState
   }
   toggleChangeDay = () => {
     if (this.props.addTodoState) {
       this.props.toggleTodo()
       this.props.toggleChangeDay(true)
     } else {this.props.toggleChangeDay(false)}
   }
  render() {
     console.log('Change Date Btn')
      let hover = <div className='add-todo-btn-hover'>Click to open or alternatively press 'A' + 'C'</div>
      if (this.props.changeDayState) {
        hover = <div className='add-todo-btn-hover'>Esc to close or click the box</div>
      }
      return <div className='todo-functions-inside add-todo-btn'onClick={this.toggleChangeDay}>Change Day
    <svg className={this.props.changeDayState ? 'change-date-arrow change-date-arrow-down' : 'change-date-arrow'} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="17.5" cy="17.5" r="16.25" stroke={this.props.changeDayState ? '#00d2d3' : 'white'} strokeWidth="2.5"/>
     <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
     </svg>
     {hover}
     </div>
 }
}
 const mapStateToProps = state => {
    return {
      changeDayState: state.changeDateReducer.changeDayState,
      addTodoState: state.addTodoReducer.addTodo,
     }
    }    
  const mapDispatchToProps = dispatch => {
      return {
        toggleChangeDay: (condition) => dispatch(changeDateAction.toggleChangeDay(condition)),
        toggleTodo: () => dispatch(addTodoActiontypes.toggleTodo())
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ChangeDateBtn)
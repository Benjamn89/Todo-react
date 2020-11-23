import React, { useEffect } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import actionTypes from '../../Reducers/01-todo-actions'

const LoadTodos = (props) => {

  useEffect(() => {
    props.fetchTodos()
  })

   const spinner = <div className='todo-spinner'>
   <div className='todo-spinner-dot'></div>
   <div className='todo-spinner-line'></div>
   </div>

  const noTodos = <div className='todo-no-todos'>No todos lo Load.</div>
  const loadSuccess = <div>We actualy loading todo's</div> 

 if (props.loadState === 'nothing') {
  return noTodos
 } else if (props.loadState === 'loading') {
   return loadSuccess
 }


  return spinner
}


const mapDispatchToProps = dispatch => {
  return {
      fetchTodos: () => dispatch(actionTypes.fetchTodos()),
   } 
  }
const mapStateToProps = state => {
  return {
    loadState: state.todoReducer.loadState
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadTodos)
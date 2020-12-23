import React, { useEffect, useRef } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action';

const LoadTodos = (props) => {
  console.log('Inside todo box')
  const userName = useRef(JSON.parse(localStorage.getItem('todo')).userName)
  useEffect(() => {
   if (props.dateRef !== false) {
     return
   }
    console.log('Use effect to update the ref is running')
    const data = {
      user: userName.current,
      date: props.date
    }
    props.checkDate(data)
  })
   
  // useEffect(() => {
  //   if (props.addedTodo < 1) {
  //     return
  //   }
  //  console.log('Running when todo has added')
  // }, [props.addedTodo])

   const spinner = <div className='todo-spinner'>
   <div className='todo-spinner-dot'></div>
   <div className='todo-spinner-line'></div>
   </div>

  const noTodos = <div className='todo-no-todos'>No todos lo Load.</div>
  const loadSuccess = <div className='load-success-wrapper'>{props.todoArray.map(todo => {
    return <div className='load-success-div' key={todo}><p className='load-success-p'>{todo}</p></div>
  })}</div>

 if (props.loadState === 'nothing') {
  return noTodos
 } else if (props.loadState === 'founded') {
   return loadSuccess
 }


  return spinner
}


const mapDispatchToProps = dispatch => {
  return {
      fetchTodos: () => dispatch(loadTodoActionTypes.fetchTodos()),
      checkDate: (user) => dispatch(loadTodoActionTypes.checkDate(user))
   } 
  }
const mapStateToProps = state => {
  return {
    date: state.todoReducer.date,
    loadState: state.loadTodoReducer.loadState,
    dateRef: state.loadTodoReducer.ref,
    addedTodo: state.loadTodoReducer.addedTodo,
    todoArray: state.loadTodoReducer.todoArray,
    allowRender: state.loadTodoReducer.allowRender
  }
}


const myMemo = (prevProps, nextProps) => {
  if (prevProps.allowRender === nextProps.allowRender) {
    return true
  }
  return false
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LoadTodos, myMemo))
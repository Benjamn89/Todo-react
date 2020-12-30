import React, { useEffect, useRef } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action';
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';

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
   
   const toggleDone = (e) => {
     const deepClone = JSON.parse(JSON.stringify(props.todoArray))
     const indexArray = parseInt(e.target.getAttribute('keydom'))
     deepClone[indexArray].done = !deepClone[indexArray].done

     const data = {
       userName: JSON.parse(localStorage.getItem('todo')).userName,
       todoArray: deepClone,
       ref: props.dateRef,
       noRender: true
     }

     props.updateTodoArray(deepClone)
     props.updateArrayDb(data)
   }

   const spinner = <div className='todo-spinner'>
   <div className='todo-spinner-dot'></div>
   <div className='todo-spinner-line'></div>
   </div>

  const noTodos = <div className='todo-no-todos'>No todos lo Load.</div>
  const loadSuccess = <div className='load-success-wrapper'>{props.todoArray.map((todo, ind) => {
    return <div className={todo.done === false ? 'load-success-div' : 'load-success-div load-success-div-done'} key={ind + todo.text} keydom={ind} onClick={toggleDone}>
      <p className={todo.done === false ? 'load-success-p' : 'load-success-p load-success-p-done'}>{todo.text}</p>
    <svg className={todo.done === false ? 'load-todo-svg' : 'load-todo-svg load-todo-svg-on'} width="42" height="47" viewBox="0 0 42 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="27" r="19.5" fill="white" stroke="#00D2D3"/>
       <path d="M10 25L20.5 35.5L40 1" stroke="#00D2D3" strokeWidth="3"/>
       </svg>
       <div className='load-todo-delete'>
         <div className='load-todo-delete-inside'><div></div><div></div></div>
       </div> </div>
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
      checkDate: (user) => dispatch(loadTodoActionTypes.checkDate(user)),
      updateTodoArray: (todoArray) => dispatch(loadTodoActionTypes.updateTodoArray(todoArray)),
      updateArrayDb: (data) => dispatch(addTodoActiontypes.updateArrayDb(data))
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
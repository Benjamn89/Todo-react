import React, { useEffect, useRef } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action';
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
// Import functions
 import {caulcPages} from './10-functions';

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
     const displayArray = caulcPages(props.currentPage, deepClone)
     
     const data = {
       userName: JSON.parse(localStorage.getItem('todo')).userName,
       todoArray: deepClone,displayArray ,ref: props.dateRef,noRender: true,loadState: 'founded',pages: props.pages,currentPage: props.currentPage}

     props.updateTodoArray(data)
     props.updateArrayDb(data)
   }

   const deleteTodo = (e) => {
    const deepClone = JSON.parse(JSON.stringify(props.todoArray))
    const indexArray = parseInt(e.target.getAttribute('keydom'))
    deepClone.splice(indexArray, 1)
    let deepCloneCopy = JSON.parse(JSON.stringify(deepClone))
    let loadState = 'founded'
    let pages = 1
    let currentPage = 1
    if (deepClone.length > 6) {
      pages = 2
      currentPage = 2
      deepCloneCopy.splice(0, 6)
    }
    if (deepClone.length < 1) {
      loadState = 'nothing'
    }
    const data = {
      userName: JSON.parse(localStorage.getItem('todo')).userName,
      todoArray: deepClone,displayArray: deepCloneCopy,ref: props.dateRef,noRender: true,loadState,pages,currentPage}
     
     props.updateTodoArray(data)
     props.updateArrayDb(data)
   }

   const changePage = (caulc) => {
       const deepClone = JSON.parse(JSON.stringify(props.todoArray))
       let currentPage = props.currentPage + caulc
      const displayArray = caulcPages(currentPage, deepClone)
       const data = {
         displayArray,
         currentPage,
       }
       props.changePage(data)
   }
   
   let currentState = null
   const spinner = <div className='todo-spinner'><div className='todo-spinner-dot'></div><div className='todo-spinner-line'></div>
   </div>
   const noTodos = <div className='todo-no-todos'>No todos lo Load.</div>
   const loadSuccess =  <div className='load-success-wrapper'>{props.displayArray.map((todo, ind) => {
    return <div className='load-success-div' key={ind + todo.text}>
      <p className={todo.done === false ? 'load-success-p' : 'load-success-p load-success-p-done'}
       keydom={props.currentPage > 1 ? 6 + ind : ind} onClick={toggleDone}>{todo.text}</p>
    <svg className={todo.done === false ? 'load-todo-svg' : 'load-todo-svg load-todo-svg-on'}
     width="42" height="47"
     viewBox="0 0 42 47"
     fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="27" r="19.5" fill="white" stroke="#00D2D3"/>
    <path d="M10 25L20.5 35.5L40 1" stroke="#00D2D3" strokeWidth="3"/>
    </svg>
       <div className='load-todo-delete' keydom={props.pages > 1 ? 6 + ind : ind} onClick={deleteTodo}>
         <div className='load-todo-delete-inside'><div></div><div></div></div>
       </div>
         <div className='load-todo-delete-hover'>Delete</div>
        </div>
  })}</div>

 if (props.loadState === 'nothing') {
   currentState = noTodos
 } else if (props.loadState === 'founded') {
    currentState = loadSuccess
 } else {currentState = spinner}


  return <div className='todo-box-inside'>
          {currentState}
           <div className='todo-btn-page-wrapper'>
       <button className='todo-change-page' onClick={props.pages > 1 && props.currentPage > 1 ? () => changePage(-1) : null}>
         <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M0 16.5L30.75 0.478531V32.5215L0 16.5Z" fill="white" fillOpacity={props.pages > 1 && props.currentPage > 1 ? '1' : '0.2'}/></svg>
       </button>
       <button className='todo-change-page' onClick={props.pages > 1 && props.currentPage < props.pages ? () => changePage(+1) : null}>
         <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M31.14 16.5L0.390015 32.5215L0.390015 0.478531L31.14 16.5Z" fill="white" fillOpacity={props.currentPage < props.pages ? '1' : '0.2'}/>
         </svg></button>
       </div>
  </div>
}
const mapDispatchToProps = dispatch => {
  return {
      fetchTodos: () => dispatch(loadTodoActionTypes.fetchTodos()),
      checkDate: (user) => dispatch(loadTodoActionTypes.checkDate(user)),
      updateTodoArray: (data) => dispatch(loadTodoActionTypes.updateTodoArray(data)),
      changePage: (data) => dispatch(loadTodoActionTypes.changePage(data)),
      updateArrayDb: (data) => dispatch(addTodoActiontypes.updateArrayDb(data)),
   } 
  }
const mapStateToProps = state => {
  return {
    date: state.todoReducer.date,
    loadState: state.loadTodoReducer.loadState,
    dateRef: state.loadTodoReducer.ref,
    addedTodo: state.loadTodoReducer.addedTodo,
    todoArray: state.loadTodoReducer.todoArray,
    displayArray: state.loadTodoReducer.displayArray,
    allowRender: state.loadTodoReducer.allowRender,
    pages: state.loadTodoReducer.pages,
    currentPage: state.loadTodoReducer.currentPage
  }
}
const myMemo = (prevProps, nextProps) => {
  return prevProps.allowRender === nextProps.allowRender
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LoadTodos, myMemo))
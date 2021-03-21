import React, {useEffect, useRef} from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action'
const AddTodo = (props) => {
    console.log('Child Add Todo')
    let submitOn = useRef(false)
    let inputElement = useRef(null)   
    useEffect(() => {
  if (props.addTodoState && props.holdAfterSubmit.length > 2) {
    inputElement.current.blur()
  } else if (props.addTodoState) {
    inputElement.current.focus()
  } else {
      inputElement.current.blur()
  }
}, [props.addTodoState, props.holdAfterSubmit])
const typingTodo = (e) => {
  let data = {
    textValue: e.target.value,
    submitOn: submitOn.current,
  }
  if (e.target.value.length > 2) {
    data.submitOn = true
  }
  props.updateTextArea(data)
}
const keyPress = (e) => {
  if (e.key === 'Enter' && e.target.value.length > 2) {
    submitTodo()
  } else if (e.key === 'Escape') {
    props.closeTodo(false)
  }
}
const submitTodo = () => {
  const deepClone = JSON.parse(JSON.stringify(props.todoArray))
  const deepCloneGlobal = JSON.parse(JSON.stringify(props.globalTodos))
  let pages = 1
  let currentPage = 1
  const todoObj = {text: props.textArea, done: false, id: Math.floor(1000 + Math.random() * 9000), date: props.date}
  deepClone.push(todoObj)
  deepCloneGlobal.push(todoObj)
  let deepCloneCopy = JSON.parse(JSON.stringify(deepClone))
  if (deepClone.length > 6) {
    pages = 2
    currentPage = 2
    deepCloneCopy.splice(0, 6)
  }
  const data = {
    userName: JSON.parse(localStorage.getItem('todo')).userName, todoArray: deepClone, displayArray: deepCloneCopy,
    ref: props.myRef, loadState: 'founded', pages, currentPage, deepCloneGlobal, globalRef: props.globalRef }
  props.setHoldOnSubmit()
  props.updateTodoArray(data)
  props.updateArrayDb(data)
}
  return <div className={props.addTodoState ? `todo-add-todo todo-add-todo-on ${props.holdAfterSubmit}` : 'todo-add-todo'}
  tabIndex='0'>
  <div className='todo-add-wrapper'>
  <input onChange={typingTodo} onKeyDown={keyPress} value={props.textArea} ref={inputElement}
  placeholder='Type Here...' maxLength='30' type='text' className='add-todo-input' autoFocus/>
  <div className='add-todo-click add-todo-cancel' onClick={() => props.closeTodo(false)}>
    <div></div>
    <div></div>
  </div>
  <div className={props.submitOn ? 'add-todo-click add-todo-confirm add-todo-confirm-on' : 'add-todo-click add-todo-confirm'} onClick={submitTodo}>
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 10.5L5 14.5L12.5 1.5" stroke="#00D2D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  </div>
  </div>
</div>
}
const mapDispatchToProps = dispatch => {
    return {
      updateTextArea: (data) => dispatch(addTodoActiontypes.updateTextArea(data)),
      closeTodo: (val) => dispatch(addTodoActiontypes.closeTodo(val)),
      setHoldOnSubmit: () =>  dispatch(addTodoActiontypes.setHold()),
      updateArrayDb: (data) => dispatch(addTodoActiontypes.updateArrayDb(data)),
      updateTodoArray: (todoArray) => dispatch(loadTodoActionTypes.updateTodoArray(todoArray)),
     }
    }
const mapStateToProps = state => {
  return {
    textArea: state.addTodoReducer.textArea,
    submitOn: state.addTodoReducer.submitOn,
    holdAfterSubmit: state.addTodoReducer.holdAfterSubmit,
    addTodoRender: state.addTodoReducer.addTodoRender,
    addTodoState: state.addTodoReducer.addTodo,
    date: state.todoReducer.date,
    myRef: state.loadTodoReducer.ref,
    todoArray: state.loadTodoReducer.todoArray,
    globalTodos: state.loadTodoReducer.globalTodos,
    globalRef: state.loadTodoReducer.allTodosRef
  }
}
const myMemo = (prevProps, nextProps) => {
  return prevProps.addTodoRender === nextProps.addTodoRender
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddTodo, myMemo))
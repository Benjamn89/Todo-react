import React, {useEffect, useRef} from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
import loadTodoActionTypes from '../../Reducers/01.2-load-todo-action'


const AddTodo = (props) => {
    console.log('Child Add Todo')
    let counter =  useRef(true)
    let submitOn = useRef(false)

useEffect(() => {
  const arrow =  document.querySelector('.add-todo-arrow')
  if (counter.current === true) {
    arrow.classList.remove('add-todo-arrow-down')
     counter.current = false
  } else {
    arrow.classList.add('add-todo-arrow-down')
    counter.current = true
  }
}, [props.addTodoState])

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

const closeTodo = () => {
  props.closeTodo(false)
}

const keyPress = (e) => {
  if (e.key === 'Enter' && e.target.value.length > 2) {
    submitTodo()
  } else if (e.key === 'Escape') {
    closeTodo()
  }
}

const submitTodo = () => {
  const deepClone = JSON.parse(JSON.stringify(props.todoArray))
  let pages = 1
  let currentPage = 1
  const todoObj = {
    text: props.textArea,
    done: false
  }
  deepClone.push(todoObj)
  let deepCloneCopy = JSON.parse(JSON.stringify(deepClone))
  if (deepClone.length > 6) {
    pages = 2
    currentPage = 2
    deepCloneCopy.splice(0, 6)
  }
  const data = {
    userName: JSON.parse(localStorage.getItem('todo')).userName,
    todoArray: deepClone,
    displayArray: deepCloneCopy,
    ref: props.myRef,
    loadState: 'founded',
    pages,
    currentPage
  }
  props.setHoldOnSubmit()
  props.updateTodoArray(data)
  props.updateArrayDb(data)
}

  return <div className={props.addTodoState ? `todo-add-todo todo-add-todo-on ${props.holdAfterSubmit}` : 'todo-add-todo'}>
  <div className='todo-add-wrapper'>
  <input onChange={typingTodo} onKeyDown={keyPress} value={props.textArea}
  placeholder='Type Here...' maxLength='30' type='text' className='add-todo-input'/>
  <div className='add-todo-click add-todo-cancel' onClick={closeTodo}>
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
    todoArray: state.loadTodoReducer.todoArray
  }
}

const myMemo = (prevProps, nextProps) => {
  if (prevProps.addTodoRender === nextProps.addTodoRender) {
    return true
  }
  return false
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddTodo, myMemo))
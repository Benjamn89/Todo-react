import React, {useEffect, useRef} from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import todoActionTypes from '../../Reducers/01-todo-actions';


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
    submitOn: submitOn.current
  }
  if (e.target.value.length > 2) {
    data.submitOn = true
  }
  props.updateTextArea(data)
}

const closeTodo = () => {
  props.closeTodo(false)
}

const submitTodo = () => {
  const data = {
    userName: JSON.parse(localStorage.getItem('todo')).userName,
    text: props.textArea
  }
  props.submitTodo(data)
}

  return <div className={props.addTodoState ? 'todo-add-todo todo-add-todo-on' : 'todo-add-todo'}>
  <div className='todo-add-wrapper'>
  <textarea onChange={typingTodo} value={props.textArea}
  placeholder='Type Here...' maxLength='40' rows='3' wrap='hard' type='text' className='add-todo-input'/>
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
      updateTextArea: (data) => dispatch(todoActionTypes.updateTextArea(data)),
      closeTodo: (val) => dispatch(todoActionTypes.closeTodo(val)),
      submitTodo: (data) => dispatch(todoActionTypes.submitTodo(data))
     }
    }
const mapStateToProps = state => {
  return {
    addTodoState: state.todoReducer.addTodo,
    textArea: state.todoReducer.textArea,
    submitOn: state.todoReducer.submitOn
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
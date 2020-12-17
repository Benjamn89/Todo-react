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
      fetchTodos: () => dispatch(loadTodoActionTypes.fetchTodos()),
      checkDate: (user) => dispatch(loadTodoActionTypes.checkDate(user))
   } 
  }
const mapStateToProps = state => {
  return {
    loadState: state.loadTodoReducer.loadState,
    date: state.todoReducer.date,
    dateRef: state.loadTodoReducer.ref,
    loadTodoFromAddTodo: state.loadTodoReducer.renderLoadTodo
  }
}


const myMemo = (prevProps, nextProps) => {
  if (prevProps.loadState === nextProps.loadState &&
      prevProps.loadTodoFromAddTodo === nextProps.loadTodoFromAddTodo) {
    return true
  }
  return false
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LoadTodos, myMemo))
import React, { useEffect, useRef } from 'react'
// Import redux/ tools
import { connect } from "react-redux";
import actionTypes from '../../Reducers/01-todo-actions'

const LoadTodos = (props) => {
  console.log('Inside todo box')
  const userName = useRef(JSON.parse(localStorage.getItem('todo')).userName)

  useEffect(() => {
    props.fetchTodos()
  })

  useEffect(() => {
   if (props.dateRef !== false) {
     return
   }
    console.log('HAHAHAHAH')
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
      fetchTodos: () => dispatch(actionTypes.fetchTodos()),
      checkDate: (user) => dispatch(actionTypes.checkDate(user))
   } 
  }
const mapStateToProps = state => {
  return {
    loadState: state.todoReducer.loadState,
    todoWasAdded: state.todoReducer.todoWasAdded,
    date: state.todoReducer.date,
    dateRef: state.todoReducer.ref
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadTodos)
import React, {useCallback, useEffect} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';

const Helper = (props) => {
  let detectKeys = {}
  // TEST
const keyDown = useCallback((e) => {
  detectKeys[e.key] = e.type === 'keydown'
  if (detectKeys['a'] && detectKeys['d']) {
    detectKeys['a'] = false
    detectKeys['d'] = false
    e.preventDefault()
    props.toggleTodo()
  }
  // eslint-disable-next-line
}, [])
// TEST
  useEffect(() => {
      if (props.addTodoState) {
        document.body.removeEventListener('keydown', keyDown)
      } else {
        document.body.addEventListener('keydown', keyDown)
      }
    })
    console.log('Helper Component')
    return <div className='todo-helper'></div>
}

const mapStateToProps = state => {
  return {
    addTodoState: state.addTodoReducer.addTodo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      toggleTodo: () => dispatch(addTodoActiontypes.toggleTodo())
   } 
  }

export default connect(mapStateToProps, mapDispatchToProps)(Helper)
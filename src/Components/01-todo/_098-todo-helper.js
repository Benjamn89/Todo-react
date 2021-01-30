import React, {useCallback, useEffect} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
import changeDateAction from '../../Reducers/01.3-change-date-action';

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
  if (detectKeys['a'] && detectKeys['c']) {
    detectKeys['a'] = false
    detectKeys['c'] = false
    e.preventDefault()
    props.toggleChangeDay()
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
    }, [props.addTodoState, keyDown])
    useEffect(() => {
      if (props.changeDayState) {
        document.body.removeEventListener('keydown', keyDown)
      } else {
        document.body.addEventListener('keydown', keyDown)
      }
    }, [props.changeDayState, keyDown])
    console.log('Helper Component')
    return <div className='todo-helper'></div>
}

const mapStateToProps = state => {
  return {
    addTodoState: state.addTodoReducer.addTodo,
    changeDayState: state.changeDateReducer.changeDayState 
  }
}

const mapDispatchToProps = dispatch => {
  return {
      toggleTodo: () => dispatch(addTodoActiontypes.toggleTodo()),
      toggleChangeDay: () => dispatch(changeDateAction.toggleChangeDay())
   } 
  }

export default connect(mapStateToProps, mapDispatchToProps)(Helper)
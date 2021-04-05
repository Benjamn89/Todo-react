import React, {useCallback, useEffect} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';
import changeDateAction from '../../Reducers/01.3-change-date-action';
import searchTodoAction from '../../Reducers/01.4-search-todo-action';
import actionTypesLoadTodo from '../../Reducers/01.2-load-todo-action';
const LogOutBtn = (props) => {
  let detectKeys = {}
  // TEST
const keyDown = useCallback((e) => {
  if (e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'c') {
    detectKeys[e.key] = e.type === 'keydown'
    if (detectKeys['a'] && detectKeys['d']) {
      // eslint-disable-next-line
      detectKeys = {}
      e.preventDefault()
      props.toggleTodo()
    }
    if (detectKeys['a'] && detectKeys['c']) {
      detectKeys = {}
      e.preventDefault()
      props.toggleChangeDay()
    }
    if (detectKeys['a'] && detectKeys['s']) {
      detectKeys = {}
      e.preventDefault()
      props.toggleSearch()
    }
  } 
  // eslint-disable-next-line
}, [])
const keyUp = useCallback((e) => {
     if (e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'c') {
        detectKeys[e.key] = false
     }
    // eslint-disable-next-line
}, [])
// TEST
  useEffect(() => {
      if (props.addTodoState || props.changeDayState || props.searchTodoState) {
        document.body.removeEventListener('keydown', keyDown)
        document.body.removeEventListener('keyup', keyUp)
      } else {document.body.addEventListener('keydown', keyDown)
              document.body.addEventListener('keyup', keyUp)}
    }, [props, keyDown, keyUp])
    const logOutBtn = () => {
      if (!props.addTodoState && !props.changeDayState) {
        document.body.removeEventListener('keydown', keyDown)
        document.body.removeEventListener('keyup', keyUp)
         }
      localStorage.clear()
      props.logOutFromTodo()
  }
    console.log('LogOut Btn Component')
    // return <div className='todo-helper'></div>
    return <div className='todo-functions-inside todo-logout-btn' onClick={logOutBtn}>LogOut</div>
}
const mapStateToProps = state => {
  return {
    addTodoState: state.addTodoReducer.addTodo,
    changeDayState: state.changeDateReducer.changeDayState,
    searchTodoState: state.searchTodoReducer.searchTodoState
  }
}
const mapDispatchToProps = dispatch => {
  return {
      toggleTodo: () => dispatch(addTodoActiontypes.toggleTodo()),
      toggleChangeDay: () => dispatch(changeDateAction.toggleChangeDay()),
      toggleSearch: () => dispatch(searchTodoAction.toggleSearch()),
      logOutFromTodo: () => dispatch(actionTypesLoadTodo.logOut()),
   } 
  }
export default connect(mapStateToProps, mapDispatchToProps)(LogOutBtn)

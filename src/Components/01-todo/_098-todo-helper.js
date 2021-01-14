import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";
import addTodoActiontypes from '../../Reducers/01.1-add-todo-action';

const Helper = (props) => {
  let thisElement = useRef(null)
    useEffect(() => {
      thisElement.current.focus()
    })
    // Detecting pressed keys together for opening the "addtodo" from keyboard
    let detectKeys = {}
    const keyDown = (e) => {
        detectKeys[e.key] = e.type === 'keydown'
        if (detectKeys['a'] && detectKeys['d']) {
           props.toggleTodo()
        }
      }
      const keyUp = (e) => {
       detectKeys[e.key] = e.type === 'keydown'
      }

    console.log('Helper Component')
    return <div className='todo-helper'
     tabIndex='0'
      onKeyDown={props.addTodoState ? null : keyDown}
       onKeyUp={props.addTodoState ? null : keyUp}
       ref={thisElement}></div>
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

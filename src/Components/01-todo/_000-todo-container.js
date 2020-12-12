import React, {  } from 'react'
// Import react components
import LoadTodos from './_010-todo-load-todos';
import AddTodo from './_020-todo-add-todo';
// Import actionTypes
import actionTypes from '../../Reducers/00-login-action'
import actionTypesTodos from '../../Reducers/01-todo-actions';
import addTodoActiontypes2 from '../../Reducers/01.1-add-todo-action';
// Import Redux
import { connect } from "react-redux";


const TodoPage = (props) => {
    console.log('Todo-Container')
    const logOutBtn = () => {
        localStorage.clear()
        props.logOutFromLogin()
        props.logOutFromTodo()
    }
    const toggleTodo = () => {
      props.toggleTodo()
    }
    return (
        <div className='todo-container'>
        <div className='todo-logo'>
            <h1>Hello Binyamin</h1>
            <div className='todo-logo-line'></div>
            <svg className='todo-logo-svg' width="73" height="70" viewBox="0 0 73 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M73.461 -0.778708L73.1082 69.554L3.34024 -0.310779L73.461 -0.778708Z" fill="#00D2D3"/>
            </svg>
        </div>
        <div className='todo-box-wrapper'>
            <div className='todo-box'>
            <div className='todo-box-inside'>
              <LoadTodos />
                <div className='todo-btn-page-wrapper'>
                <button className='todo-change-page'><svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.5L30.75 0.478531V32.5215L0 16.5Z" fill="white" fillOpacity="0.2"/>
                </svg></button>
                <button className='todo-change-page'><svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.14 16.5L0.390015 32.5215L0.390015 0.478531L31.14 16.5Z" fill="white" fillOpacity="0.2"/>
                  </svg></button>
                </div>
            </div>
            <div className='todo-date'>
                <p>{props.date}</p>
              <svg className='todo-date-left' width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.5L30.75 0.478531V32.5215L0 16.5Z" fill="white" fillOpacity="0.2"/>
                </svg>
                <svg className='todo-date-right' width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.14 16.5L0.390015 32.5215L0.390015 0.478531L31.14 16.5Z" fill="white" fillOpacity="0.2"/>
                  </svg>
            </div>
            </div>
            <div className='todo-functions'>
             <AddTodo />
              <div onClick={toggleTodo} className='todo-functions-inside'>Add Todo
              <svg className='add-todo-arrow' width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="17.5" cy="17.5" r="16.25" stroke="white" strokeWidth="2.5"/>
               <path d="M12.471 20.25L17.5 13.2816L22.529 20.25H12.471Z" stroke="white" strokeWidth="1.5"/>
               </svg>
              </div>
              <div className='todo-functions-inside'>Change Day</div>
              <div className='todo-functions-inside'>Search Todo</div>
              <div className='todo-functions-inside todo-logout-btn' onClick={logOutBtn}>LogOut</div>
            </div>
        </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logOutFromLogin: () => dispatch(actionTypes.logOut()),
        logOutFromTodo: () => dispatch(actionTypesTodos.logOut()),
        toggleTodo: () => dispatch(addTodoActiontypes2.toggleTodo())
     } 
    }

const mapStateToProps = state => {
    return {
      userAuth: state.loginReducer.userAuth,
      date: state.todoReducer.date
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage)

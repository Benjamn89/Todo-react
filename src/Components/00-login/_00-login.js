import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import actionTypes from '../../Reducers/00-login-action'
// Images
import UserIcon from '../../Media/login/user.png'
import PassIcon from '../../Media/login/pass.png'
// Public variables
let inputs;

const Login = (props) => {
  console.log('Login-child')
  useEffect(() => {
   inputs = document.querySelectorAll('.login-form img')
  }, [])
  useEffect(() => {
   inputs[0].classList.remove('login-input-active')
   inputs[1].classList.remove('login-input-active')
  }, [props.loginReducer.successReg])

  const [errMsg, changeErrMsg] = useState('')
  const [showErr, changeShowErr] = useState(false)
  const [inputErr, changeInpErr] = useState(false)
  const [inputErr2, changeInpErr2] = useState(false)

  // Functions out of state
  const checkInputSpelling = (email, pass) => {
    if (email.length <= 4) {
      changeErrMsg('User must contains at least 5 letters')
      changeShowErr(true)
      changeInpErr(true)
      return 'err1'
    }
    if (pass.length < 6) {
      changeErrMsg('Pass must contains at least 6 letters')
      changeShowErr(true)
      changeInpErr2(true)
      return 'err2'
    }
    return false
  }

  const logIn = (e) => {
    e.preventDefault()
    const obj = {
      email: props.loginReducer.emailInput.toLowerCase(),
      pass: props.loginReducer.passInput
    }
    if (checkInputSpelling(obj.email, obj.pass) === 'err1' || checkInputSpelling(obj.email, obj.pass) === 'err2') {
      return
     }
     props.showSpinner()
    props.tryLogTheUser(obj)
}
const register = (e) => {
    e.preventDefault()
    const obj = {
      email: props.loginReducer.emailInput.toLowerCase(),
      pass: props.loginReducer.passInput,
      displayName: props.loginReducer.emailInput
    }
    if (checkInputSpelling(obj.email, obj.pass) === 'err1' || checkInputSpelling(obj.email, obj.pass) === 'err2') {
     return
    }
    props.showSpinner()
    props.userExists(obj)
}
    const userTyping = (e) => {
     if (showErr) {
      changeShowErr(false)
      changeInpErr(false)
      changeInpErr2(false)
      } else {
        e.target.type === 'email'? props.typeEmail(e.target.value) : props.typePass(e.target.value)
      }
    }

    const focusIn = (e) => {
     if (e.target.name === 'email') {
      inputs[0].classList.add('login-input-active')
     } else {
       inputs[1].classList.add('login-input-active')
     }
    }

    const focusOut = (e) => {
      if (e.target.name === 'email') {
        if (props.loginReducer.emailInput.length < 1){inputs[0].classList.remove('login-input-active')}
      } else {if (props.loginReducer.passInput.length < 1){inputs[1].classList.remove('login-input-active')}}
    }

  return (
      <div className='login-box'>
        <h1>{props.loginReducer.loginBox}</h1>
        <form autoComplete='on' className='login-form'>
          <img src={UserIcon} alt='binyamintal' />
          <img src={PassIcon} alt='binyamintal'/>
          <input className={inputErr === false ? '' : 'login-input-err'}
           type='email' placeholder='E-mail/ Username' name='email' 
           onChange={userTyping} onFocus={focusIn} onBlur={focusOut}
           value={props.loginReducer.emailInput} />
          <input className={inputErr2 === false ? '' : 'login-input-err'} 
          type='password' placeholder='Password'
          onFocus={focusIn} onBlur={focusOut} onChange={userTyping}
          value={props.loginReducer.passInput} />
          <button className='login-btn' onClick={props.loginReducer.loginBox === 'Login' ? logIn : register}>OK</button>
        </form>
        <span className={showErr ? 'login-box-warning login-box-warning-on' : 'login-box-warning'}>
          {errMsg}
        </span>
        <span className={props.loginReducer.userExists ? 'login-box-warning login-box-warning-on' : 'login-box-warning'}>
           {props.loginReducer.afterFetchErr}
        </span>
        <span className={props.loginReducer.successReg ? 'login-box-success login-box-warning-on' : 'login-box-success'}
        onClick={props.moveToLogin}>Account created, Press here to log in</span>
        <div className={props.loginReducer.showSpinner ? 'login-spinner login-spinner-on' : 'login-spinner'}></div>
      </div>
  )
}

const mapStateToProps = state => {
  return {
      loginReducer: state.loginReducer,
      loginState: state.loginReducer.loginBox
  }
}

const mapDispatchToProps = dispatch => {
  return {
      tryLogTheUser: (obj) => dispatch(actionTypes.tryLogTheUser(obj)),
      userExists: (data) => dispatch(actionTypes.userExists(data)),
      removeErr: () => dispatch(actionTypes.removeErr()),
      showSpinner: () => dispatch(actionTypes.showSpinner()),
      typeEmail: (val) =>  dispatch(actionTypes.typeEmail(val)),
      typePass: (val) => dispatch(actionTypes.typePass(val))
   } 
  }



export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React, { Component } from 'react'
import {connect} from 'react-redux'
import actionTypes from '../../Reducers/00-login-action'
// import './01-login-container.scss';
import Login from './_00-login'

let headers;

class LoginContainer extends Component {

componentDidMount() {
 headers = document.querySelectorAll('.login-headers h3')
}

    changeLoginState = (index) => {
        document.querySelector('.login-header-active').classList.remove('login-header-active')
        headers[index].classList.add('login-header-active')
        const stateName = headers[index].innerHTML
        this.props.changeLoginBox(stateName)
    }
render() {
    console.log('Login-Container')
    return (
        <section id='login'>
         <div className='login-headers'>
         <h3 onClick={() => this.changeLoginState(0)} className='login-header-active'>Login</h3>
         <h3 onClick={() => this.changeLoginState(1)}>Register</h3>
         </div>
         <Login title={this.props.userAuth.loginBox} moveToLogin={() => this.changeLoginState(0)}
          />
     </section>
    )
 }
}

const mapStateToProps = state => {
    return {
        userAuth: state.loginReducer.userAuth,
    }
}
const mapDispatchToProps = dispatch => {
return {
    changeLoginBox: (stateName) => dispatch(actionTypes.changeLoginBox(stateName)),
 } 
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
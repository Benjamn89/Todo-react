import React, {Component, Suspense} from 'react';
import './Styles/main.scss';
import LoginContainer from './Components/00-login/_01-login-container'
import { connect } from "react-redux";
const Todo = React.lazy(() =>  import('./Components/01-todo/_000-todo-container'))


class App extends Component {

  render() {
    console.log('APP')
    const myLocalStorage = JSON.parse(localStorage.getItem('todo'))
    const now = new Date()
    const timeNow = now.getTime()
    let page =  <LoginContainer />;
    if (myLocalStorage && myLocalStorage.expiry > timeNow) {
      page = <Suspense fallback={<div>Loading...</div>}> <Todo /> </Suspense>
    }
    return <div className='entire-page'>
      {page}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state.loginReducer.userAuth
  }
}

export default connect(mapStateToProps, null)(App);

const initialState = {
    loginBox: 'Login',
    userAuth: false,
    userExists: false,
    showSpinner: false,
    successReg: false,
    emailInput: '',
    passInput: ''
}

const reducer = (state = initialState, action) => {
    if (action.type === 'changeState') {
        return {
          ...state,
          loginBox: action.stateName,
          emailInput: '',
          passInput: '',
          userExists: false,
        }
    } else if (action.type === 'loginSuccess') {
        return {
            ...state,
            showSpinner: false,
            userAuth: !state.userAuth,
            emailInput: '',
            passInput: ''
        }
    }
        else if (action.type === 'log-out') {
           return {
               ...state,
               userAuth: !state.userAuth
           } 
        }
       else if (action.type === 'regFailed') {
        return {
            ...state,
            userExists: true,
            afterFetchErr: 'User already exists',
            showSpinner: false
        }
    } else if (action.type === 'removeErr') {
        return {
            ...state,
            userExists: false,
            successReg: false
        }
    } else if (action.type === 'spinnerOn') {
        return {
            ...state,
            showSpinner: true
           }
        } else if (action.type === 'regSuccess') {
            return {
                ...state,
                showSpinner: false,
                successReg: true,
                emailInput: '',
                passInput: ''
            }
        } else if (action.type === 'typeEmail') {
            return {
                ...state,
                emailInput: action.val,
                successReg: false,
                userExists: false
            }
        } else if (action.type === 'typePass') {
            return {
                ...state,
                passInput: action.val,
                successReg: false,
                userExists: false
            }
        } else if (action.type === 'loginFailed') {
            return {
                ...state,
                userExists: true,
                afterFetchErr: 'Login Failed, Please try again',
                showSpinner: false,
                passInput: ''
            }
        }
    return state
}

export default reducer
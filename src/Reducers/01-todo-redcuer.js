import {todoMethods} from '../Components/01-todo/10-functions'

const date = () => {
    let today = new Date()
    let year = today.getFullYear().toString()
    let month = (today.getMonth() + 1).toString()
    let day = today.getDate().toString()
    month = todoMethods.dayMonth(month)
    day = todoMethods.dayMonth(day)
    const displayDate = `${day}.${month}.${year}`
    return displayDate
  }


const initialState = {
    loadState: 'spinner',
    addTodo: false,
    submitOn: false,
    textArea: '',
    holdAfterSubmit: '',
    ref: false,
    date: date(),
    actualTodos: []
}

const redurcer = (state = initialState, action) => {
    if (action.type === 'spinner') {
        return initialState
    } else if (action.type === 'nothing') {
        return {
            ...state,
            loadState: 'nothing'
        }
    } else if (action.type === 'success') {
        return {
            ...state,
            loadState: 'loading'
        }
    } else if (action.type === 'toggle-todo') {
        return {
            ...state,
            addTodo: !state.addTodo
        }
    } else if (action.type === 'updateTextArea') {
        return {
            ...state,
            textArea: action.textValue,
            submitOn: action.submitOn
        }
    } else if (action.type === 'close-todo') {
        return {
            ...state,
            addTodo: action.val
        }
    } else if (action.type === 'submit-todo') {
        return {
            ...state,
            textArea: '',
            holdAfterSubmit: '',
            submitOn: false,
            addTodo: false,
            loadState: 'spinner'
        }
    } else if (action.type === 'set-hold') {
      return {
          ...state,
          holdAfterSubmit: 'todo-hold-submit'
      }
    } else if (action.type === 'set-ref') {
        return {
            ...state,
            ref: action.ref
        }
    } else if (action.type === 'log-out') {
        return {
            ...state,
            loadState: 'spinner'
        }
    }
    return state
}


export default redurcer
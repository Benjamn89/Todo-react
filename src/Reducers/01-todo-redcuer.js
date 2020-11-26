const initialState = {
    loadState: 'spinner',
    addTodo: false,
    submitOn: false,
    textArea: '',
<<<<<<< HEAD
    holdAfterSubmit: '',
    todoWasAdded: 1
=======
    holdAfterSubmit: ''
>>>>>>> db131f236c54c5e597f08a5da8be01d5391b76f1
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
<<<<<<< HEAD
            holdAfterSubmit: '',
            submitOn: false,
            addTodo: false,
            todoWasAdded: state.todoWasAdded + 1
=======
            holdAfterSubmit: ''
>>>>>>> db131f236c54c5e597f08a5da8be01d5391b76f1
        }
    } else if (action.type === 'set-hold') {
      return {
          ...state,
          holdAfterSubmit: 'todo-hold-submit'
      }
    }
    return state
}


export default redurcer
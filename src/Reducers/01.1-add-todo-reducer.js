const initialState = {
    textArea: '',
    submitOn: false,
    holdAfterSubmit: '',
    addTodoRender: false,
    addTodo: false,
}

const reducer = (state = initialState, action) => {
    if (action.type === 'updateTextArea') {
        return {
            ...state,
            textArea: action.textValue,
            submitOn: action.submitOn,
            addTodoRender: !state.addTodoRender
        }
    } else if (action.type === 'close-todo') {
        return {
            ...state,
            addTodo: action.val,
            addTodoRender: !state.addTodoRender
        }
    } else if (action.type === 'submit-todo') {
        return {
            ...state,
            textArea: '',
            holdAfterSubmit: '',
            submitOn: false,
            addTodo: false,
            loadState: 'spinner',
            addTodoRender: !state.addTodoRender
        }
    } else if (action.type === 'set-hold') {
        return {
            ...state,
            holdAfterSubmit: 'todo-hold-submit',
            addTodoRender: !state.addTodoRender
        }
      } else if (action.type === 'toggle-todo') {
        return {
            ...state,
            addTodo: !state.addTodo,
            addTodoRender: !state.addTodoRender
        }
    } 
      return state
}

export default reducer
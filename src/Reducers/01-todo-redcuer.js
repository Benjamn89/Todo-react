const initialState = {
    loadState: 'spinner',
    addTodo: false,
    submitOn: false,
    textArea: ''
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
        }
    }
    return state
}


export default redurcer
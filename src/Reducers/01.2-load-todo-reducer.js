const initialState = {
    loadState: 'spinner',
    ref: false,
    todoArray: []
}

const reducer = (state = initialState, action) => {
    if (action.type === 'nothing') {
        return {
            ...state,
            loadState: 'nothing'
        }
    } else if (action.type === 'success') {
        return {
            ...state,
            loadState: 'loading'
        }
    } else if (action.type === 'no-results') {
        return {
            ...state,
            loadState: 'nothing'
        }
     } else if (action.type === 'no-results') {
        return {
            ...state,
            loadState: 'nothing'
        }
     } else if (action.type === 'find-todos') {
        return {
            ...state,
            loadState: 'nothing',
            todoArray: action.todo
        }
  }  else if (action.type === 'update-todo-array'){
    return {
        ...state,
        todoArray: action.todoArray
    }
}  else if (action.type === 'set-ref') {
    return {
        ...state,
        ref: action.ref,
        actualTodos: action.todo,
        loadState: 'nothing'
    }
}  else if (action.type === 'set-only-ref') {
    return {
        ...state,
        ref: action.ref
    }      
}

    return state
}

export default reducer
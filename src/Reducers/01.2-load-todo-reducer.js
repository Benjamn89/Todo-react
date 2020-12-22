const initialState = {
    loadState: 'spinner',
    ref: false,
    todoArray: [],
    addedTodo: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'no-results') {
        return {
            ...state,
            loadState: 'nothing'
        }
     } else if (action.type === 'find-todos') {
        return {
            ...state,
            loadState: 'founded',
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
} else if (action.type === 'submit-done') {
   return {
       ...state,
       loadState: 'spinner',
       addedTodo: state.addedTodo + 1
   }
} else if (action.type === 'log-out') {
    return {
        ...state,
        ref: false,
        loadState: 'spinner',
        addedTodo: 0
    }
}
    return state
}

export default reducer
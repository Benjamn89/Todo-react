const initialState = {
    loadState: 'spinner',
    ref: false,
    todoArray: [],
    displayArray: [],
    addedTodo: 0,
    allowRender: false,
    pages: 1,
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    if (action.type === 'no-results') {
        return {
            ...state,
            loadState: 'nothing',
            allowRender: !state.allowRender,
        }
     } else if (action.type === 'new-date-created'){
             return {
                 ...state,
                 allowRender: !state.allowRender,
                 loadState: 'nothing',
                 ref: true
             }
     } else if (action.type === 'update-todo-array'){
    return {
        ...state,
        todoArray: action.todoArray,
        displayArray: action.displayArray,
        loadState: action.loadState,
        pages: action.pages,
        currentPage: action.currentPage,
        allowRender: !state.allowRender
    }
}  else if (action.type === 'set-ref') {
    return {
        ...state,
        ref: action.ref,
    }
}  else if (action.type === 'submit-done') {
   return {
       ...state,
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
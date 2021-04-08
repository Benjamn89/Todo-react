const initialState = {
    loadState: 'spinner',
    ref: false,
    allTodosRef: false,
    todoArray: [],
    displayArray: [],
    globalTodos: [],
    addedTodo: 0,
    allowRender: false,
    pages: 1,
    currentPage: 1
}
const reducer = (state = initialState, action) => {
          if (action.type === 'no-results') {
    return { ...state, loadState: 'nothing', allowRender: !state.allowRender, globalTodos: action.globalTodos,
             todoArray: [], displayArray: [], pages: 1, currentPage: 1}
   } else if (action.type === 'new-date-created'){
    return { ...state, allowRender: !state.allowRender, loadState: 'nothing', ref: true }
   } else if (action.type === 'update-todo-array'){
    return { ...state, todoArray: action.data.todoArray, displayArray: action.data.displayArray,
         globalTodos: action.data.deepCloneGlobal || state.globalTodos, loadState: action.data.loadState,
          pages: action.data.pages, currentPage: action.data.currentPage, allowRender: !state.allowRender}
   } else if (action.type === 'change-page') {
    return { ...state, displayArray: action.data.displayArray, currentPage: action.data.currentPage,
                 allowRender: !state.allowRender }
   } else if (action.type === 'set-ref') {
    return {...state, ref: action.data.dateRef, allTodosRef: action.data.allTodosRef, globalTodos: action.data.globalTodos,
         todoArray: [], displayArray: [], pages: 1, currentPage: 1}
   } else if (action.type === 'submit-done') {
    return {...state, addedTodo: state.addedTodo + 1}
   } else if (action.type === 'log-out') {
    return {...state, ref: false, allTodosRef: false, loadState: 'spinner', addedTodo: 0 }
   } else if (action.type === 'set-to-spinner') {
    return { ...state, loadState: 'spinner', allowRender: !state.allowRender }
    }
    return state
}
export default reducer
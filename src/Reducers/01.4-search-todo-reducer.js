const initialState = {
    searchTodoState: false,
    serachInput: '',
}
const reducer = (state = initialState, action) => {
    if (action.type === 'toggle-search') {
        return {
            ...state,
            searchTodoState: !state.searchTodoState
        }
    } else if (action.type === 'update-search-input') {
        return {
            ...state,
            serachInput: action.val
        }
    }
    return state
}
export default reducer
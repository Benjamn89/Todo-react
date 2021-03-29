const initialState = {
    searchTodoState: false
}
const reducer = (state = initialState, action) => {
    if (action.type === 'toggle-search') {
        return {
            ...state,
            searchTodoState: !state.searchTodoState
        }
    }
    return state
}
export default reducer
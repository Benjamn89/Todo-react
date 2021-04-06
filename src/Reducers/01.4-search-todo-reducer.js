const initialState = {
    allowRender: false,
    searchTodoState: false,
    serachInput: '',
}
const reducer = (state = initialState, action) => {
    if (action.type === 'toggle-search') {
        return {
            ...state,
            searchTodoState: !state.searchTodoState,
            allowRender: !state.allowRender
        }
    } else if (action.type === 'update-search-input') {
        return {
            ...state,
            serachInput: action.val,
            allowRender: !state.allowRender
        }
    }
    return state
}
export default reducer
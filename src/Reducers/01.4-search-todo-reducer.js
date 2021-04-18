const initialState = {
    allowRender: false,
    searchTodoState: false,
    serachInput: '',
    viBtn: false,
}
const reducer = (state = initialState, action) => {
           if (action.type === 'toggle-search') {
        return {...state, searchTodoState: !state.searchTodoState, allowRender: !state.allowRender}
    } else if (action.type === 'update-search-input') {
        return {...state, serachInput: action.data.val, viBtn: action.data.viBtn,
            allowRender: !state.allowRender}
    }
    return state
}
export default reducer
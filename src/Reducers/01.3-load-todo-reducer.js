const initialState = {
  changeDayState: false
}

const reducer = (state = initialState, action) => {
    if (action.type === 'toggle-change-day') {
        return {
            ...state,
            changeDayState: !state.changeDayState
        }
    }
    return state
}

export default reducer
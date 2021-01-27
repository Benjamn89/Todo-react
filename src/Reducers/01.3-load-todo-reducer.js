const initialState = {
  changeDayState: false,
  dayInput: 0,
  monthInput: 0,
  yearInput: 0
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
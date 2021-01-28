const initialState = {
  changeDayState: false,
  dayInput: '00',
  monthInput: '00',
  yearInput: '00'
}

const reducer = (state = initialState, action) => {
    if (action.type === 'toggle-change-day') {
        return {
            changeDayState: !state.changeDayState,
            dayInput: '00',
            monthInput: '00',
            yearInput: '00'
        }
    } else if (action.type === 'change-day-update') {
        return {
            ...state,
            dayInput: action.data,
        }
    } else if (action.type === 'change-month-update') {
        return {
            ...state,
            monthInput: action.data
        }
    } else if (action.type === 'change-year-update') {
        return {
            ...state,
            yearInput: action.data
        }
    }
    return state
}

export default reducer
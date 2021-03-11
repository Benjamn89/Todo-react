const initialState = {
    changeDayState: false,
    dayInput: '00',
    monthInput: '00',
    yearInput: '21',
    dayCount: 0,
    monthCount: 0,
    yearCount: 1,
  }
  
  const reducer = (state = initialState, action) => {
      if (action.type === 'toggle-change-day') {
          return {
              ...state,
              changeDayState: !state.changeDayState,
              dayInput: '00',
              monthInput: '00',
              yearInput: '21',
              dayCount: 0,
              monthCount: 0,
              yearCount: 1
          }
      } else if (action.type === 'change-day-update') {
          return {
              ...state,
              dayInput: action.data.value,
              dayCount: action.data.count
          }
      } else if (action.type === 'change-month-update') {
          return {
              ...state,
              monthInput: action.data.value,
              monthCount: action.data.count,
          }
      } else if (action.type === 'change-year-update') {
          return {
              ...state,
              yearInput: action.data.value,
              yearCount: action.data.count,
          }
      }
      return state
  }
  
  export default reducer
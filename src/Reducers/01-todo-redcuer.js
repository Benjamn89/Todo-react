import {todoMethods} from '../Components/01-todo/10-functions'

const date = () => {
    let today = new Date()
    let year = today.getFullYear().toString()
    let month = (today.getMonth() + 1).toString()
    let day = today.getDate().toString()
    month = todoMethods.dayMonth(month)
    day = todoMethods.dayMonth(day)
    const displayDate = `${day}.${month}.${year}`
    return displayDate
  }


const initialState = {
    date: date(),
}

const redurcer = (state = initialState, action) => {
    return state
}


export default redurcer
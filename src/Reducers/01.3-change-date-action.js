// // FaunaDB keys
// import {keys} from '../Config/config'
// import faunadb from 'faunadb'
// const q = faunadb.query;
// const client = new faunadb.Client({
//     secret: keys.fauna
//   })

  const actionTypes = {
    toggleChangeDay: () => {
        return {
          type: 'toggle-change-day'
        }
    },
    changeDayUpdate: (data) => {
      return {
        type: 'change-day-update',
        data
      }
    },
    changeMonthUpdate: (data) => {
      return {
        type: 'change-month-update',
        data
      }
    },
    changeYearUpdate: (data) => {
      return {
        type: 'change-year-update',
        data
      }
    }
  }

  export default actionTypes
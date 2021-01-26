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
    }
  }

  export default actionTypes
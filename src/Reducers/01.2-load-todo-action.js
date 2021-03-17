// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

  const actionTypes = {
        checkDate: (user) => {
            return dispatch => {
                Promise.all([
                    client.query(q.Get(q.Match(q.Index(user.user), user.date))),
                    client.query(q.Get(q.Match(q.Index(user.user),'1.1'))),
                  ])
                .then((ret) => {
                    console.log('Date was founded, Save the ref and retriving the data')
                    const dataRef = {dateRef: ret[0].ref.value.id, allTodosRef: ret[1].ref.value.id, globalTodos: ret[1].data.todo}
                    dispatch(actionTypes.setRef(dataRef))
                      if (ret[0].data.todo.length < 1) {
                          console.log('No results has founded')
                          dispatch(actionTypes.noResults(ret[1].data.todo))
                      } else {
                        let pages = 1
                        let currentPage = 1
                        let deepCopyArray = JSON.parse(JSON.stringify(ret[0].data.todo))
                          if (ret[0].data.todo.length / 6 > 1) {
                              deepCopyArray.splice(0, 6)
                              pages = 2
                              currentPage = 2
                          }
                          const data = {type: 'update-todo-array', todoArray: ret[0].data.todo, displayArray: deepCopyArray, loadState: 'founded', pages, currentPage}
                          dispatch(actionTypes.updateTodoArray(data))}
                }).catch(() => {
                    console.log('New date has been created')
                    dispatch(actionTypes.newDateCreated())
                    Promise.all([client.query(q.Create(q.Collection(user.user),{ data: { date: user.date, todo: [] } },)),
                    client.query(q.Get(q.Match(q.Index(user.user),'1.1')))])
                    .then((ret) => {
                        const ref = {dateRef: ret[0].ref.value.id, allTodosRef: ret[1].ref.value.id}
                        dispatch(actionTypes.setRef(ref))
                    }).catch(() => {console.log('not founding the 1.1 with index')})
                })
            }
          },
      setToSpinner: () => {
       return {type: 'set-to-spinner'}
      },
      newDateCreated: () => {
          return {type: 'new-date-created'}
      }
      ,
      setRef: (data) => {
        return {type: 'set-ref', data}
    },
      noResults: (globalTodos) => {
        return {type: 'no-results', globalTodos}
    },
    updateTodoArray: (data) => {
        return {type: 'update-todo-array', data}
    },
    changePage: (data) => {
        return {type: 'change-page', data }
    },
    logOut: () => {
        return {type: 'log-out'}
    }
  }
  export default actionTypes
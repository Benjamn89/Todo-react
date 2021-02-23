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
                client.query(q.Get(q.Match(q.Index(user.user),user.date))),
                client.query(q.Get(q.Match(q.Index(user.user),'11'))),
              ])
            .then((ret) => {
                console.log('Date was founded, Save the ref and retriving the data')
                const ref = {dateRef: ret[0].ref.value.id, allTodosRef: ret[1].ref.value.id}
                dispatch(actionTypes.setRef(ref))
                client.query(q.Get(q.Ref(q.Collection(user.user), ret[0].ref.value.id)))
                .then((ret) => {
                  if (ret.data.todo.length < 1) {
                      console.log('No results has founded')
                      dispatch(actionTypes.noResults())
                  } else {
                    let pages = 1
                    let currentPage = 1
                    let deepCopyArray = JSON.parse(JSON.stringify(ret.data.todo))
                      if (ret.data.todo.length / 6 > 1) {
                           deepCopyArray.splice(0, 6)
                          pages = 2
                          currentPage = 2
                      }
                      const data = {
                          type: 'update-todo-array', todoArray: ret.data.todo, displayArray: deepCopyArray, loadState: 'founded', pages, currentPage
                      }
                      dispatch(actionTypes.updateTodoArray(data))}
                })
                
            }).catch(() => {
                console.log('New date has been created')
                dispatch(actionTypes.newDateCreated())
                Promise.all([client.query(q.Create(q.Collection(user.user),{ data: { date: user.date, todo: [] } },)),
                             client.query(q.Create(q.Collection(user.user),{ data: { date: '11', todo: [] } },))])
                .then((ret) => {
                    const ref = {dateRef: ret[0].ref.value.id, allTodosRef: ret[1].ref.value.id}
                    dispatch(actionTypes.setRef(ref))
                }).catch((err) => {console.log(err)})
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
      setRef: (ref) => {
        return {type: 'set-ref', ref}
    },
      noResults: () => {
        return {type: 'no-results'}
    },
    updateTodoArray: (data) => {
        return {type: 'update-todo-array', todoArray: data.todoArray, displayArray: data.displayArray,
             loadState: data.loadState, pages: data.pages, currentPage: data.currentPage }
    },
    changePage: (data) => {
        return {type: 'change-page', data }
    },
    logOut: () => {
        return {type: 'log-out'}
    }
  }
  export default actionTypes
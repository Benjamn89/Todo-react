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
            client.query(
                q.Get(
                    q.Match(
                        q.Index(user.user),
                        user.date
                    )
                )
            ).then((ret) => {
                console.log('Date was founded, Save the ref and retriving the data')
                dispatch(actionTypes.setOnlyRef(ret.ref.value.id))
                client.query(
                  q.Get(q.Ref(q.Collection(user.user), ret.ref.value.id))
                )
                .then((ret) => {
                  if (ret.data.todo.length < 1) {
                      console.log('No results has founded')
                      dispatch(actionTypes.noResults())
                  } else {
                      // Results has been founded
                      console.log(ret.data.todo)
                      dispatch(actionTypes.foundTodos(ret.data.todo))}
                })
                
            }).catch(() => {
                console.log('New date has been created')
                client.query(
                  q.Create(
                    q.Collection(user.user),
                    { data: { date: user.date, todo: [] } },
                  )
                ).then((ret) => {
                    const data = {
                        ref: ret.ref.value.id,
                        todo: ret.data.todo
                    }
                    dispatch(actionTypes.setRef(data))
                }).catch((err) => {
                    console.log(err)
                })
            })
        }
      },
      setRef: (data) => {
        return {
            type: 'set-ref',
            ref: data.ref,
            todo: data.todo 
        }
    },
    setOnlyRef: (ref) => {
        return {
            type:'set-only-ref',
            ref
        }  
      },
      noResults: () => {
        return {
            type: 'no-results'
        }
    },
    foundTodos: (todo) => {
        return {
            type: 'find-todos',
            todo
        }
    },
    updateTodoArray: (todoArray) => {
        return {
            type: 'update-todo-array',
            todoArray
        }
    }
  }

  export default actionTypes
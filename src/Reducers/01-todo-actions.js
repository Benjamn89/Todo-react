// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

  const actionTypes = {
    fetchTodos: () => {
        return dispatch => {
            setTimeout(() => {
                dispatch(actionTypes.fetchingResult('nothing'))
            }, 500)
        }
    },
    fetchingResult: (res) => {
        return {
            type: res
        }
    },
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
              console.log('Date was founded, Retriving the data')
              client.query(
                q.Get(q.Ref(q.Collection(user.user), ret.ref.value.id))
              )
              .then((ret) => {
                console.log(ret)
                dispatch(actionTypes.setRef(ret.ref.value.id))
              })
              
          }).catch(() => {
              console.log('New date has been created')
              client.query(
                q.Create(
                  q.Collection(user.user),
                  { data: { date: user.date } },
                )
              ).then((ret) => {
                  dispatch(actionTypes.setRef(ret.ref.value.id))
              }).catch((err) => {
                  console.log(err)
              })
          })
      }
    },
    setRef: (ref) => {
        return {
            type: 'set-ref',
            ref
        }
    },
    toggleTodo: () => {
        return {
            type: 'toggle-todo'
        }
    },
    updateTextArea: (data) => {
        return {
            type: 'updateTextArea',
            textValue: data.textValue,
            submitOn: data.submitOn
        }
    },
    closeTodo: (val) => {
        return {
            type: 'close-todo',
            val
        }
    },
    submitTodo: (data) => {
        return dispatch => {
            client.query(
                q.Create(
                  q.Collection(data.userName),
                  { data: { date: data.date } },
                )
              )
              .then(() => {
                  dispatch(actionTypes.submitDone())
              })
        }
    },
    submitDone: () => {
        return {
            type: 'submit-todo'
        }
    },
    setHold: () => {
        return {
            type: 'set-hold'
        }
    },
    logOut: () => {
        return {
            type: 'log-out'
        }
    }
  }

  export default actionTypes